import { prisma } from "@/prisma/client"
import { TApiSingleAppointmentReq } from "@/types"
import { NextRequest, NextResponse } from "next/server"

// GET all appointments 
export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { startTime: 'asc' },
      where: { startTime: { gte: new Date() } }
    })
    return NextResponse.json({ appointments })
  } catch (error) {
    return new Response('Something went wrong in GET!', { status: 500 })
  }
}

// Create a new appointment and POST
export async function POST(request:NextRequest) {
  try {
    const data = await request.json() as TApiSingleAppointmentReq
    data.startTime = new Date(data.startTime)
    data.endTime = new Date(data.endTime)
  
    // Validate data against ACCEPTED appointments
    const availability = await prisma.availability.findUnique({ 
      where: { id: data.availId }, 
      select: {
        id: true,
        startTime: true,
        endTime: true,
        appointments: {
          where: { status: 'accepted' },
          orderBy: { startTime: 'desc' },
          select: {
            startTime: true,
            endTime: true,
          }
        }
      }
    })

    // Check valid availability id
    if (availability == null) {
      return new Response('Invalid availId', { status: 400 })
    }
    // Check if appointment is within availability
    if (data.startTime.getTime() < availability.startTime.getTime() || data.endTime.getTime() > availability.endTime.getTime()) {
      return new Response('Start/end times not within availability.', { status: 400 })
    }
    // Check for appointment conflict
    const noOverlap = availability.appointments.every(appointment => {
      if ((data.startTime.getTime() > appointment.startTime.getTime() && data.startTime.getTime() < appointment.endTime.getTime()) ||
          (data.endTime.getTime() > appointment.startTime.getTime() && data.endTime.getTime() < appointment.endTime.getTime()) || 
          (data.startTime.getTime() == appointment.startTime.getTime() || data.endTime.getTime() == appointment.endTime.getTime())) {
        return false
      }
      return true
    })
    if (!noOverlap) {
      return new Response('Appointment overlap conflict.', { status: 400 })
    }
  
    const createAppointment = await prisma.appointment.create({data: data})
    return new Response('POSTED', { status: 200 })
  } catch (error) {
    return new Response('Something went wrong in POST!', { status: 500 })
  }
}
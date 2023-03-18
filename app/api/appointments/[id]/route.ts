import { prisma } from "@/prisma/client"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { TApiSingleAppointmentReq } from "@/types"

// GET specific appointment with ID
export async function GET(request:NextRequest, {params}:any) {
  try {
    const id = params.id as string
    const appointment = await prisma.appointment.findUnique({ where: { id: id } })
    return NextResponse.json({ appointment })
  } catch (error) {
    return new Response('Something went wrong in GET!', { status:500 })
  }
}

// PUT update specific appointment with ID
export async function PUT(request:NextRequest, {params}:any) {
  try {
    const id = params.id as string
    const data = await request.json() as TApiSingleAppointmentReq
    data.startTime = new Date(data.startTime)
    data.endTime = new Date(data.endTime)
  
    // Validate data against ACCEPTED appointments
    const availability = await prisma.availability.findUnique({
      where: { id: data.availId },
      select: {
        startTime: true,
        endTime: true,
        appointments: {
          where: { 
            status: 'accepted',
            NOT: {
              id: id
            }
          },
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
  
    const updateAppointment = await prisma.appointment.update({
      where: { id: id },
      data: data,
    })
    return new Response(`Updated appointment with id: ${id}`, { status: 200 })
  } catch (error) {
    return new Response('Something went wrong in PUT!', { status: 500 })
  }
}


// DELETE specific appointment with ID
export async function DELETE(request:NextRequest, {params}:any) {
  try {
    const id = params.id as string
    const deleteAppointment = await prisma.appointment.delete({ where: { id: id } }) 
  } catch (error) {
    return new Response('Something went wrong in DELETE!', { status: 500 })
  }
}
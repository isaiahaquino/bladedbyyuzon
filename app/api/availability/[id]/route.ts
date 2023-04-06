import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(request:NextRequest, {params}:any) {
  try {
    const id = params.id as string
    const availability = await prisma.availability.findUnique({
      where: { id: id },
      select: {
        id: true,
        date: true,
        startTime: true,
        endTime: true,
        appointments: {
          orderBy: { startTime: 'asc' }
        }
      }
    })
    return NextResponse.json({ availability })
  } catch (error) {
    return new Response('Something went wrong in GET!', { status: 500 })
  }
}

export async function PUT(request: NextRequest, {params}:any) {
  try {
    const id = params.id as string
    const lastAppointment = await prisma.appointment.findFirst({
      where: { 
        availId: id,
        status: "accepted"
      },
      orderBy: { startTime: 'desc' },
      select: { 
        startTime: true,
        endTime: true 
      }
    })
    const firstAppointment = await prisma.appointment.findFirst({
      where: { 
        availId: id,
        status: "accepted"
      },
      orderBy: { startTime: 'asc' },
      select: { 
        startTime: true,
        endTime: true 
      }
    })
    // Updates current availability
    const data = await request.json()
    const availability = {
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
    }
    if (availability.endTime <= availability.startTime) {
      return new Response('Error with start/end times.', { status: 400 })
    }
    if (lastAppointment !== null && firstAppointment !== null) {
      if (availability.endTime < lastAppointment.endTime) {
        return new Response('Error with end time.', { status: 400 })
      } else if (availability.startTime > firstAppointment.startTime) {
        return new Response('Error with start time.', { status: 400 })
      }
    }
    const updateAvailability = await prisma.availability.update({
      where: { id: id },
      data: {
        startTime: availability.startTime,
        endTime: availability.endTime
      }
    })
    return new Response('Updated!', { status: 200 })
  } catch (error) {
    return new Response('Something went wrong in POST!', { status: 500 })
  }
}

export async function DELETE(request:NextRequest, {params}:any) {
  try {
    const id = params.id as string
    const deleteAvailability = await prisma.availability.delete({ where: { id: id } })
    return new Response(`Deleted availability with id: ${id}`, { status: 200 })
  } catch (error) {
    return new Response('Something went wrong in DELETE!', { status: 500 })
  }
}
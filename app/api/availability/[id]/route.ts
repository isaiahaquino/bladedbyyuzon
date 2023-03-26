import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(request:NextRequest, {params}:any) {
  try {
    const id = params.id as string
    const availability = await prisma.availability.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        date: true,
        startTime: true,
        endTime: true,
        appointments: {
          orderBy: {
            startTime: 'desc'
          },
          select: {
            id: true,
            createdAt: true,
            startTime: true,
            endTime: true,
            status: true,
            firstName: true,
            lastName: true,
            phoneNum: true,
          }
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
    // Updates current availability
    const data = await request.json()
    const availability = {
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
    }
    if (availability.endTime <= availability.startTime) {
      return new Response('Error with start/end times.', { status: 400 })
    }
    const updateAvailability = await prisma.availability.update({
      where: {
        id: id,
      },
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
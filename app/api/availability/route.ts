import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { TApiSingleAvailabilityReq } from "@/types";

// GET all availabilites
export async function GET() {
  try {
    const availabilities = await prisma.availability.findMany({
      where: {
        date: {
          gte: new Date()
        }
      },
      orderBy: {
        date: 'asc'
      },
      select: {
        id: true,
        date: true,
        startTime: true,
        endTime: true,
        appointments: {
          orderBy: {
            startTime: 'asc'
          }
        }
      }
    }) 
    return NextResponse.json({ availabilities });
  } catch (error) {
    return new Response('Something went wrong in GET!', { status: 500 })
  }
}

// Create a new availability and POST
export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as TApiSingleAvailabilityReq

    const availability:TApiSingleAvailabilityReq = {
      date: new Date(data.date),
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
    }

    if (availability.endTime <= availability.startTime) {
      return new Response('Error with start/end times.', { status: 400 })
    }
    if (availability.date <= new Date()) {
      return new Response('Error with availability date.', { status: 400 })
    }

    // Check if date already set
    const availabilitys = await prisma.availability.findMany({
      where: { date: { gte: new Date() } },
      select: { date: true } 
    })    
    for (const avail of availabilitys) {
      if (availability.date.getTime() == new Date(avail.date).getTime()) {
        return new Response('Availability date already exists.', { status: 400 })
      }
    }
   
    const createAvailability = await prisma.availability.create({data: availability})
    return new Response('POSTED', { status: 200 })
  } catch (error) {
    return new Response('Something went wrong in POST!', { status: 500 })
  }
}

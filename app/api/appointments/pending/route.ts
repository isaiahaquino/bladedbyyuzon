import { NextResponse } from "next/server"
import { prisma } from "@/prisma/client"

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        status: 'pending',
        startTime: {
          gte: new Date()
        }
      },
      orderBy: {
        startTime: 'asc'
      },
    })
    return NextResponse.json({appointments})
  } catch (error) {
    return new Response('Something went wrong in GET!', {status:500})
  }
}
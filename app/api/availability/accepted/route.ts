import { NextResponse } from "next/server";

export async function GET() {
  try {
    const availabilities = await prisma.availability.findMany({
      where: {
        date: { gte: new Date() }
      },
      orderBy: { date: 'asc' },
      select: {
        id: true,
        date: true,
        startTime: true,
        endTime: true,
        appointments: {
          where: { status: "accepted" }, 
          orderBy: { startTime: 'asc' }
        }
      }
    }) 
    return NextResponse.json({ availabilities });
  } catch (error) {
    return new Response('Something went wrong in GET!', { status: 500 })
  }
}
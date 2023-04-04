import { prisma } from "@/prisma/client"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const appointment = await prisma.appointment.findFirst({
      orderBy: {
        createdAt: "desc"
      }
    })
    return NextResponse.json({ appointment })
  } catch (error) {
    return new Response('Something went wrong in GET!', { status: 500 })
  }
}
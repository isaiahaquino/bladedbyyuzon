import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { prisma } from "@/prisma/client"

export async function GET(request:NextRequest, {params}:any) {
  try {
    const id = params.id as string
    const availability = await prisma.availability.findUnique({
      where: { id: id },
      select: {
        appointments: {
          orderBy: { startTime: 'asc' },
          where: { status: "accepted" }
        }
      }
    })
    return NextResponse.json({ availability })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ msg: 'Something went wrong in GET!', err: error }, { status: 500 })
  }
}
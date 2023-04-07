import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

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
    return NextResponse.json({ msg: 'Something went wrong in GET!' }, { status: 500 })
  }
}
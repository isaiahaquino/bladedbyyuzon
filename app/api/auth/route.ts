import { getServerSession } from 'next-auth/next'
import { NextResponse, NextRequest } from 'next/server'
import { authOptions } from './[...nextauth]/route'

export async function GET(request:NextRequest, response:NextResponse) {
  const session = await getServerSession(authOptions)
  console.log(session)

  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
      status: 401
    })
  }
  return NextResponse.json({ authenticated: !!session })
}
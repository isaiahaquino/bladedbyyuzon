"use client"

import Link from 'next/link'
import { useEffect } from 'react'

export default function Home() {

  useEffect(() => {
    window.document.documentElement.style.colorScheme = "dark"
  }, [])

  return (
    <main className='px-4 pt-10 min-h-screen w-screen'>
      <Link href='/book' className='p-2 border-[2px] border-black rounded-sm'>
        Book an Appointment
      </Link>
    </main>
  )
}

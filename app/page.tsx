"use client"

import { useEffect } from 'react'

export default function Home() {

  useEffect(() => {
    window.document.documentElement.style.colorScheme = "dark"
  }, [])

  return (
    <main className='px-4 pt-10 min-h-screen w-screen'>

    </main>
  )
}

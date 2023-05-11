"use client"

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {

  useEffect(() => {
    window.document.documentElement.style.colorScheme = "dark"
  }, [])

  return (
    <main className='w-screen'>
      <section className='relative'>
        <Image className='absolute' src="/home/yuzon_home.jpg" fill alt="" />
        <div className='relative top-0 flex flex-col items-center justify-center gap-6 h-[calc(100vh-4rem)]'>
          <h1 className='font-gloock text-5xl text-yellow font-semibold'>BladedByYuzon</h1>
          <Link href='/book' className='py-3 px-8 bg-white text-black text-sm font-serif'>
                Book Now &#8605;
          </Link>
        </div>
        
      </section>
    </main>
  )
}

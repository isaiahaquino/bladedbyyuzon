'use client'

import Link from 'next/link'
import { BiMenu, BiX } from 'react-icons/bi'
import { useState } from 'react'

export default function Navbar() {

  const [menu, setMenu] = useState(false)

  return (
    <nav className='w-screen shadow-lg'>
      <div className='w-full px-4 py-4 flex flex-row justify-between items-center'>
        <Link href='/' className='font-gloock text-2xl text-grey'>BladedByYuzon</Link>

        <button type='button' onClick={() => setMenu(true)}>
          <BiMenu size={30} color="#cfdbd5" />
        </button>
      </div>
      
      <div className={`w-screen h-screen top-0 -left-10 z-20 flex flex-col px-4 py-4 bg-white transition duration-500 ease-in-out ${menu ? 'absolute opacity-100 translate-x-10' : 'hidden opacity-0'}`}>
        <button type='button' className='self-end' onClick={() => setMenu(false)}>
          <BiX size={30} />
        </button>

        <ul className='font-serif flex flex-col gap-2 ml-2'>
          <li>
            <Link href='/' onClick={() => setMenu(false)}>Home</Link>
          </li>
          <li>
            <Link href='/about' onClick={() => setMenu(false)}>About Me</Link>
          </li>
          <li>
            <Link href='/contact' onClick={() => setMenu(false)}>Contact</Link>
          </li>
          <li className='mt-2'>
            <Link href='/book' className='p-2 border-[2px] border-black rounded-sm' onClick={() => setMenu(false)}>
              Book an Appointment
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
'use client'

import Link from 'next/link'
import { BiMenu, BiX } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import { LoginButton, LogoutButton } from './Auth'

export default function Navbar() {

  const [menu, setMenu] = useState(false)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const getAuth = async () => {
      const res = await fetch('/api/auth', { method: "GET" })
      if (res.ok) {
        setIsAuth(true)
      }
      return 
    } 
    getAuth()
  }, [menu])

  return (
    <nav className='w-screen shadow-lg relative'>
      <div className='w-full px-4 py-4 flex flex-row justify-between items-center'>
        <Link href='/' className='font-gloock text-2xl text-grey'>BladedByYuzon</Link>

        <button type='button' onClick={() => setMenu(true)}>
          <BiMenu size={30} color="#cfdbd5" />
        </button>
      </div>
      
      <div className={`absolute w-full h-screen top-0 -right-10 z-20 flex flex-col px-4 py-4 bg-grey-dark transition duration-300 ease-in-out ${menu ? 'visible opacity-100 -translate-x-10' : 'invisible opacity-0'}`}>
        <button type='button' className='self-end' onClick={() => setMenu(false)}>
          <BiX size={30} color="#cfdbd5" />
        </button>

        <ul className='font-serif flex flex-col gap-2 ml-2 text-grey'>
          <li>
            <Link href='/' onClick={() => setMenu(false)}>Home</Link>
          </li>
          <li>
            <Link href='/about' onClick={() => setMenu(false)}>About Me</Link>
          </li>
          <li>
            <Link href='/contact' onClick={() => setMenu(false)}>Contact</Link>
          </li>
          <li className='my-2'>
            <Link href='/book' className='p-2 border-[2px] border-grey rounded-sm' onClick={() => setMenu(false)}>
              Book an Appointment
            </Link>
          </li>
          <li className='text-yellow'>
            {isAuth ? <Link href='/admin' onClick={() => setMenu(false)}>Admin Dashboard</Link> : null}
          </li>
        </ul>

        <div className='mt-auto self-center font-serif'>
          {isAuth ? <LogoutButton /> : <LoginButton />}
        </div>
      </div>
    </nav>
  )
}
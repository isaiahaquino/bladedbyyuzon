'use client'

import Link from 'next/link'
import { BiMenu, BiX } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import { LoginButton, LogoutButton } from './Auth'

export default function Navbar() {

  const [menu, setMenu] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [oldTop, setOldTop] = useState(0)
  const [nav, setNav] = useState('fixed')


  useEffect(() => {
    const handleScroll = (event: Event) => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (oldTop >= scrollTop) {
      // scrolling up
      setNav('opacity-100 translate-y-4')
    } else {
      // scrolling down
      setNav('opacity-0 z-[-1]')
    }
    setOldTop(scrollTop)
  }, [scrollTop])

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
    <nav className={`w-screen shadow-lg fixed top-[-1rem] z-20 ${nav} transition-all duration-300 ease-in-out`}>
      <div className='absolute w-full z-20 px-4 py-3 flex flex-row justify-between items-center'>
        <Link href='/' className='font-gloock text-2xl text-black'>BladedByYuzon</Link>
        
        <div className={`relative ${menu ? 'invisible' : ''}`}>  
          <button type='button' className='relative p-[.1rem] bg-yellow z-10' onClick={() => setMenu(true)}>
            <BiMenu size={30} color="#242423" />
          </button> 
          <div className='absolute h-[2.1rem] w-[2.1rem] top-[.3rem] left-[.2rem] bg-black z-0'></div>
        </div>
      </div>
      
      <div className={`absolute w-[250px] top-[0.5rem] right-[1rem] z-30  transition duration-300 ease-in-out ${menu ? 'visible opacity-100 translate-y-4' : 'invisible opacity-0'}`}>
        <div className='relative z-30 bg-yellow border-2 border-black flex flex-col px-4 py-4'>
          <button type='button' className='self-end' onClick={() => setMenu(false)}>
            <BiX size={30} color="#242423" />
          </button> 

          <ul className='font-serif flex flex-col gap-1 mr-1 mt-4 text-black text-right'>
            <li className='my-2'>
              {isAuth ? <Link href='/admin' onClick={() => setMenu(false)}>ADMIN</Link> : null}
            </li>
            <li>
              {isAuth ? <LogoutButton /> : <LoginButton />}
            </li>
            <li className='my-2'>
              <Link href='/book' onClick={() => setMenu(false)}>
                BOOK
              </Link>
            </li>
          </ul>
        </div>
        
        <div className='absolute h-full w-full bg-black top-3 left-1 z-20'>
        </div>
      </div>
    </nav>
  )
}
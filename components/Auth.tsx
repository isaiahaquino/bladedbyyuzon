"use client"

import { signIn, signOut } from "next-auth/react"

export function LoginButton() {
  return (
    <button className='tracking-widest hover:text-yellow' onClick={() => signIn()}>SIGN IN</button>
  )
}

export function LogoutButton() {
  return (
    <button className='tracking-widest hover:text-yellow' onClick={() => signOut()}>SIGN OUT</button>
  )
}
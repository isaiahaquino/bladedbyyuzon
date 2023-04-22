"use client"

import { signIn, signOut } from "next-auth/react"

export function LoginButton() {
  return (
    <button className="text-grey" onClick={() => signIn()}>Sign In</button>
  )
}

export function LogoutButton() {
  return (
    <button className="text-grey" onClick={() => signOut()}>Sign Out</button>
  )
}
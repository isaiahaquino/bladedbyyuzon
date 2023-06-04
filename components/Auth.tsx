"use client"

import { signIn, signOut } from "next-auth/react"

export function LoginButton() {
  return (
    <button onClick={() => signIn()}>SIGN IN</button>
  )
}

export function LogoutButton() {
  return (
    <button onClick={() => signOut()}>SIGN OUT</button>
  )
}
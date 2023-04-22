 "use client" 

import { SessionProvider } from "next-auth/react"

interface IProvidersProps {
  children?: React.ReactNode;
}

export const Providers = ({ children }: IProvidersProps) => {
  return (
    <>
      <SessionProvider>
        {children}
      </SessionProvider>
    </>
  )
}


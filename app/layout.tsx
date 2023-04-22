import Navbar from '@/components/Navbar'
import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Bladed By Yuzon',
  description: '',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'use-credentials'} />
        <link href="https://fonts.googleapis.com/css2?family=Gloock&display=swap" rel="stylesheet" />
      </head>
      <body className='bg-black h-[100vh]'>
        <Providers>
          <Navbar />
 
          {children}
        </Providers>
      </body>
    </html>
  )
}

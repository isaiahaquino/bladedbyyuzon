import Link from 'next/link'

export default function Home() {
  return (
    <main className='px-4 pt-10 min-h-screen w-screen'>
      <Link href='/book' className='p-2 border-[2px] border-black rounded-sm'>
        Book an Appointment
      </Link>
    </main>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import Carousel from '@/components/Carousel'

export default function Home() {

  return (
    <main className='w-screen text-black'>
      <section className='relative'>
        <Image className='absolute' src="/home/yuzon_home.jpg" fill alt="" />
        <div className='relative top-0 flex flex-col items-center justify-center gap-4 h-[calc(100vh-3rem)]'>
          <h1 className='font-gloock text-[2.5rem] text-yellow font-bold'>BladedByYuzon</h1>
          <Link href='/book' className='py-3 px-8 bg-white text-sm font-serif'>
                Book Now &#8605;
          </Link>
        </div>
      </section>

      <section className='px-6 pt-8 pb-10 bg-grey-light'>
        <p className='font-serif tracking-wide text-xl leading-10'>Hey! I'm Joseph! I'm a barber in the Chula Vista and Clairmonte neighborhoods of San Diego, CA. I offer traditional services and do them right.</p>
      </section>

      <section className='px-6 pt-8 pb-10 bg-white font-serif flex flex-col gap-6 text-sm'>
        <h1 className='text-xl font-semibold self-center'>SERVICES</h1>
        <h2 className='font-semibold'>HAIRCUT</h2>
        <p>Tailored haircut with optional hot lather and straight razor neck shave.</p>
        <h2 className='font-semibold'>SKIN FADE</h2>
        <p>Faded haircut from the skin of the scalp to desired length on top with hot lather and neck shave.</p>
        <h2 className='font-semibold'>LONG CUT</h2>
        <p>Haircut starting below the base of the neck or chin, whether it is staying long or is being cut to a shorter length, and any transformational haircut.</p>
        <h2 className='font-semibold'>BEARD TRIM</h2>
        <p>Beard trim with scissor or clipper to shape and line up beard.</p>
        <Link href='/book' className='mt-4 border-2 px-8 py-6 self-center text-lg rounded'>
          Book Your Appointment
        </Link>
      </section>

      <section>
        <Carousel 
          imgs={['/gallery/1.jpg', '/gallery/2.jpg', '/gallery/3.jpg', '/gallery/4.jpg', '/gallery/5.jpg']}
          height={500}
        />
      </section>

    </main>
  )
}

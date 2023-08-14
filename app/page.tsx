import Link from 'next/link'
import Image from 'next/image'
import Carousel from '@/components/Carousel'

export default function Home() {

  return (
    <main className='w-screen text-black'>
      <section className='relative'>
        <div className='absolute h-full w-full flex'>
          <div className='relative lg:w-1/2 w-full h-full'>
            <Image className='relative' src="/home/DSC02337.jpg" fill style={{objectFit: "cover"}} alt="" />
          </div>
          <div className='relative w-1/2 h-full lg:block hidden'>
            <div className='absolute top-[35%] left-1/3 w-1/3 h-1/3'>
              <Image className='relative' src="/home/yuzon_home.jpg" fill style={{objectFit: "cover"}} alt="" />
            </div>
          </div>
        </div>
        <div className='relative top-0 flex flex-col items-center justify-center gap-4 h-[100vh]'>
          <div className='relative'>
            <h1 className='font-gloock text-[7vw] md:text-[8vw] lg:text-[8vw] text-yellow font-bold z-10 relative'>BladedByYuzon</h1>
            <h1 className='font-gloock text-[7vw] md:text-[8vw] lg:text-[8vw] text-black font-bold absolute top-[2px] left-[1px]'>BladedByYuzon</h1>
          </div>
          <Link href='/book' className='md:hidden py-3 px-8 bg-white text-sm font-serif'>
                Book Now &#8605;
          </Link>
        </div>
      </section>

      <section className='px-6 py-10 lg:px-14 lg:py-20 bg-grey-light'>
        <p className='font-serif tracking-wide text-[1.5rem] md:text-[3rem] leading-[2.75rem] md:leading-[5rem] max-w-[900px] mx-auto'>Hey! I&apos;m Joseph! I&apos;m a barber in the Chula Vista and Clairmonte neighborhoods of San Diego, CA. I offer traditional services and do them right.</p>
      </section>

      <section className='px-6 pt-8 pb-10 bg-white font-serif flex flex-col gap-10 text-md'>
        <h1 className='text-2xl md:text-3xl font-semibold self-center mt-8'>SERVICES</h1>
        <div className='flex flex-col gap-7 gap-x-20 md:grid grid-rows-2 grid-cols-2 grid-flow-row max-w-[900px] mx-auto'>
          <div className='flex flex-col gap-8'>
            <h2 className='font-semibold md:text-xl'>HAIRCUT</h2>
            <p>Tailored haircut with optional hot lather and straight razor neck shave.</p>
          </div>
          <div className='flex flex-col gap-8'>
            <h2 className='font-semibold md:text-xl'>SKIN FADE</h2>
            <p>Faded haircut from the skin of the scalp to desired length on top with hot lather and neck shave.</p>
          </div>
          <div className='flex flex-col gap-8'>
            <h2 className='font-semibold md:text-xl'>LONG CUT</h2>
            <p>Haircut starting below the base of the neck or chin, whether it is staying long or is being cut to a shorter length, and any transformational haircut.</p>
          </div>
          <div className='flex flex-col gap-8'>
            <h2 className='font-semibold md:text-xl'>BEARD TRIM</h2>
            <p>Beard trim with scissor or clipper to shape and line up beard.</p>
          </div>
        </div>
        
        <Link href='/book' className='mt-4 border-2 px-8 py-6 self-center text-lg rounded hover:bg-yellow hover:shadow-md transition-all ease-in-out duration-300'>
          Book Your Appointment
        </Link>
      </section>

      <section>
        <Carousel 
          imgs={['/gallery/1.jpg', '/gallery/2.jpg', '/gallery/3.jpg', '/gallery/4.jpg', '/gallery/5.jpg']}
          height={600}
        />
      </section>

    </main>
  )
}

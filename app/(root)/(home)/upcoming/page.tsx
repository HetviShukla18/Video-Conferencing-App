import { CallList } from '@/components/CallList'
import Image from 'next/image'
import React from 'react'

const Upcoming = () => {
  return (
<<<<<<< HEAD
    <section className='flex 
    size-full flex-col gap-10 
    text-white'>
    <h1 className='text-3xl 
    font-bold'>
      Upcoming
    </h1>
    <CallList type=' upcoming' />
   </section>
=======
    <section className="flex size-full flex-col gap-8 text-white">
      <header className="flex items-center gap-4">
        <Image src="/icons/upcoming.svg" alt="Upcoming" width={36} height={36} />
        <div>
          <h1 className="text-3xl font-bold leading-tight">Upcoming</h1>
          <p className="text-sm text-gray-300">Your scheduled meetings and events</p>
        </div>
      </header>

      <CallList type="upcoming" />
    </section>
>>>>>>> 0ca0798 (.)
  )
}

export default Upcoming
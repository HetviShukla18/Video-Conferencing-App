<<<<<<< HEAD
import CallList from '@/components/CallList'

const Previous = () => {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
    <h1 className='text-3xl font-bold'>
      Previous
    </h1>
    <CallList type='ended' />
   </section>
=======
import React from 'react'
import Image from 'next/image'
import { CallList } from '@/components/CallList'

const Previous = () => {
  return (
    <section className="flex size-full flex-col gap-8 text-white">
      <header className="flex items-center gap-4">
        <Image src="/icons/previous.svg" alt="Previous" width={36} height={36} />
        <div>
          <h1 className="text-3xl font-bold leading-tight">Previous</h1>
          <p className="text-sm text-gray-300">Your recently ended meetings</p>
        </div>
      </header>

      <CallList type="ended" />
    </section>
>>>>>>> 0ca0798 (.)
  )
}

export default  Previous
import React, { ReactNode } from 'react'
import StreamVideoProvider from '@/providers/StreamClientProvider'
import AuthGuard from '@/components/AuthGuard'
import Navabar from '@/components/Navabar'
import Slider from '@/components/Slider'

const HomeLayout = ({children}: {children: ReactNode}) => {
  return (
    <AuthGuard>
      <div>
        <main className='relative'>
          <Navabar/>
          <div className='flex'>
            <Slider/>
            <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-20 max-md:pb 14 sm:px-14'>
              <div className='w-full'>
                <StreamVideoProvider>
                  {children}
                </StreamVideoProvider>
              </div>
            </section>
          </div> 
        </main>
      </div>
    </AuthGuard>
  )
}

export default HomeLayout 
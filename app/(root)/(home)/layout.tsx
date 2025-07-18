import Navabar from '@/components/Navabar'
import Slider from '@/components/Slider'
import React, { Children, ReactNode } from 'react'


const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className='relative'>
            <Navabar/>

            <div className='flex'>
                <Slider/>

                <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-20 max-md:pb 14 sm:px-14'>
                    <div className='w-full'>
                        {children}
                    </div>
                </section>
            </div> 

        </main>
    )
}


export default HomeLayout


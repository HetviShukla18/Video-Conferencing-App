'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { sliderLinks } from '@/app/constants'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image';

const Slider = () => {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 flex h-screen w-64 flex-col items-center justify-between 
      bg-dark1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
        {sliderLinks.map((link) => {
          const isActive = pathname === link.route || pathname.startsWith(link.route);

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                'flex gap-4 items-center p-4 rounded-lg justify-start',
                { 'bg-blue1': isActive }
              )}
            >
              <Image src={link.imgUrl} alt={link.label} width={24} height={24} />
              <p className='text-sm font-semibold max-lg:hidden'>{link.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Slider;

'use client'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

export default function WelcomeBanner() {
    const {user} = useUser();
  return (
    <div className='p-5 bg-blue-950 border border-card-foreground text-primary-foreground rounded-lg flex items-center gap-10'>
        <Image src={'/laptop.png'} alt='laptop' width={100} height={100} />
        <div className='flex flex-col gap-2'>
            <h2 className='text-xl font-bold'>
                Welcome back, <span className="text-yellow-300">{user?.fullName}</span>
            </h2>
            <h2 className='text-md font-semibold'>
                We're excited to have you at PrepStudio AI
            </h2>
            <p className='text-xs opacity-70'>
                Begin your journey toward mastering AI skills and unlock your full potential today.
            </p>
        </div>
    </div>
  )
}

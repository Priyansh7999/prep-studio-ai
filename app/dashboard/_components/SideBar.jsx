'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { MenuList } from '@/constant/data'
import { usePathname } from 'next/navigation'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
export default function SideBar() {

    const path = usePathname();
    return (
        <div className='h-screen shadow-md p-5'>
            <div className='flex items-center gap-2'>
                <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
                <h2 className='font-bold text-2xl'>PrepStudio AI</h2>
            </div>
            <div className='mt-10'>
                <Button className='w-full'>Create New</Button>
                <div className='mt-10 flex flex-col gap-5'>
                    {
                        MenuList.map((item, index) => (
                            <div
                                key={index}
                                className={`flex gap-5 p-2 item-center hover:bg-slate-200 rounded-lg cursor-pointer ${path == item.path && 'bg-slate-200'}`}>
                                <item.icon />
                                <h2 className=''>{item.name}</h2>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className=' border p-2 bg-slate-100 rounded-lg absolute bottom-5 w-[87%]'>
                <h2 className='mb-2 text-lg'>Available Credits : 5</h2>
                <Progress value={30} />
                <h2 className='text-sm'>1 out of 5 Credits Used</h2>
                <Link href={'/dashboard/upgrade'} className='text-blue-600 text-xs mt-3'>Upgrade to create more</Link>
            </div>
        </div>
    )
}

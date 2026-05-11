'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { MenuList } from '@/constant/data'
import { usePathname, useRouter } from 'next/navigation'
export default function SideBar() {

    const path = usePathname();
    const router = useRouter();
    return (
        <div className='h-screen shadow-md p-5'>
            <div className='flex items-center gap-2'>
                <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
                <h2 className='font-bold text-2xl'>PrepStudio AI</h2>
            </div>
            <div className='mt-10'>
                <Button
                onClick={()=>router.push('/create')}
                 className='w-full cursor-pointer'>Create New</Button>
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
        </div>
    )
}

"use client"
import React, { useContext } from 'react'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { CourseCountContext } from '@/app/_context/CourseCountContext';
export default function CreditScore() {
    const {totalCourse} = useContext(CourseCountContext);
    return (
        <div className=' border p-2 bg-slate-100 rounded-lg absolute bottom-5 w-[87%]'>
            <h2 className='mb-2 text-lg'>Available Credits : {5 - totalCourse} </h2>
            <Progress value={(totalCourse/5)*100} />
            <h2 className='text-sm'>{totalCourse} out of 5 Credits Used</h2>
            <Link href={'/dashboard/upgrade'} className='text-blue-600 text-xs mt-3'>Upgrade to create more</Link>
        </div>
    )
}

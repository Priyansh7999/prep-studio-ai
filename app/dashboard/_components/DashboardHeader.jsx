import { UserButton } from '@clerk/nextjs'
import React from 'react'

export default function DashboardHeader() {
  return (
    <div className='p-5 rounded-2xl m-3 shadow-lg border-b-2 border-slate-200 flex justify-end'>
        <UserButton />
    </div>
  )
}

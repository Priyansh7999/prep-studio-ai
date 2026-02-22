'use client'
import { Options } from '@/constant/data'
import Image from 'next/image'
import React, { useState } from 'react'

export default function SelectOption({selectedStudyType}) {
    const [selectedOption, setSelectedOption] = useState(null)

  return (
    <div className=''>
        <h2 className='text-center mb-2 text-lg'>Choose the type of content you want to create for you</h2>
        <div className='grid grid-cols-2 mt-5 md:grid-cols-3 lg:grid-cols-5 gap-5'>
            {
                Options.map((option) => (
                    <div 
                        className={`p-4 flex flex-col items-center justify-center gap-2 border 
                            shadow-sm rounded-md cursor-pointer hover:bg-secondary hover:border-blue-500 
                            ${selectedOption === option && 'bg-secondary border-blue-500'}`} 
                        key={option.name}
                        onClick={() => {
                            setSelectedOption(option)
                            selectedStudyType(option.name)
                        }}
                    >
                        <Image src={option.icon} alt={option.name} width={50} height={50}/>
                        <h2 className='text-center text-sm'>{option.name}</h2>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

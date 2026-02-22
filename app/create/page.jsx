'use client'
import React, { useState } from 'react'
import SelectOption from './_components/SelectOption'
import { Button } from '@/components/ui/button'
import TopicInput from './_components/TopicInput'
export default function Create() {
    const [step, setStep] = useState(0)
    const [formData,setFormData] = useState([]);
    const handleUserInput=(fieldName, fieldValue)=>{
        setFormData({
            ...formData,
            [fieldName]:fieldValue
        })
        console.log(formData)
    }
    return (
        <div className='flex flex-col gap-y-4 items-center p-5 md:px-24 lg:px-36 mt-20'>
            <h2 className='font-bold text-4xl text-primary'>Start Building Your Personal Study Material</h2>
            <p className='text-muted-foreground text-lg'>Fill All deatils in order to generate study material for you</p>
            <section className='mt-10'>
                {step === 0 ? 
                    <SelectOption selectedStudyType={(value)=>handleUserInput('studyType',value)} /> : 
                    <TopicInput setTopic={(value)=>handleUserInput('topic',value)} 
                                setDifficulty={(value)=>handleUserInput('difficulty',value)} />}
            </section>

            <div className='flex gap-x-2 justify-between mt-5'>
                {
                    step != 0 ? 
                        <Button
                            variant='outline'
                            onClick={() => setStep(step - 1)}
                        >
                            Previous
                        </Button> 
                        : null
                }
                {
                    step == 0 ? 
                        <Button
                            className='bg-blue-600 hover:bg-blue-700'
                            onClick={() => setStep(step + 1)}
                        >
                            Next
                        </Button> 
                        : <Button
                            // variant='default'
                            className='bg-blue-600 hover:bg-blue-700'
                            onClick={() => setStep(step + 1)}
                        >
                            Generate
                        </Button>
                }
            </div>
        </div>
    )
}

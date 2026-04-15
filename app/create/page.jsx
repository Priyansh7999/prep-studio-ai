'use client'
import React, { useState } from 'react'
import SelectOption from './_components/SelectOption'
import { Button } from '@/components/ui/button'
import TopicInput from './_components/TopicInput'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function Create() {
    const [step, setStep] = useState(0)
    const [formData, setFormData] = useState({});
    const {user} = useUser();
    const [loading,setLoading] = useState(false);
    const router = useRouter();
    const handleUserInput = (fieldName, fieldValue) => {
        setFormData({
            ...formData,
            [fieldName]: fieldValue
        })
        console.log(formData)
    }

    // used to save user input and generate ai course layout
    const GenerateCourseOutline = async () => {
        const courseId = uuidv4();
        setLoading(true);
        try {
            const result = await axios.post("/api/generate-course-outline", {
                courseId: courseId,
                ...formData,
                createdBy: user?.primaryEmailAddress?.emailAddress,
            });
            toast.success("Pls wait your course is generating!");
            setLoading(false);
            router.replace('/dashboard');
            toast("Your course content is generating, Click on Refresh Button");
        } catch (error) {
            console.error("Generation Error:", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className='flex flex-col gap-y-4 items-center p-5 md:px-24 lg:px-36 mt-20'>
            <h2 className='font-bold text-4xl text-primary'>Start Building Your Personal Study Material</h2>
            <p className='text-muted-foreground text-lg'>Fill All deatils in order to generate study material for you</p>
            <section className='mt-10'>
                {step === 0 ?
                    <SelectOption selectedStudyType={(value) => handleUserInput('studyType', value)} /> :
                    <TopicInput setTopic={(value) => handleUserInput('topic', value)}
                        setDifficulty={(value) => handleUserInput('difficulty', value)} />}
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
                            onClick={GenerateCourseOutline}
                            disabled={loading}
                        >
                            {loading?<Loader2 className='animate-spin'  /> : 'Generate'}
                        </Button>
                }
            </div>
        </div>
    )
}

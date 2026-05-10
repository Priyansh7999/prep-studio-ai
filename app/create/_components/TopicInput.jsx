'use client'
import React, { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
export default function TopicInput({setTopic,setDifficulty}) {
    return (
        <div className='mt-5'>
            <div className='flex flex-col gap-3'>
                <h2 className='text-center mb-2 text-lg'>Enter Topic for which you want to generate study material</h2>
                <Textarea className={"w-150"} placeholder='Start writing here...' onChange={(e) => setTopic(e.target.value)} />
            </div>
            <div className='flex flex-col gap-3 mt-10'>
                <h2 className='text-center mb-2 text-lg'>Select the difficulty level</h2>
                <Select onValueChange={(value) => setDifficulty(value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a difficulty level" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Difficulty Level</SelectLabel>
                            <SelectItem value="Easy">Easy</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Hard">Hard</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

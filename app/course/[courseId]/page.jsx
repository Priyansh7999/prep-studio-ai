"use client";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import DashboardHeader from "@/app/dashboard/_components/DashboardHeader";
import CourseIntroCard from "./_component/CourseIntroCard";
import axios from 'axios';
import StudyMaterialSection from './_component/StudyMaterialSection';
import ChapterList from './_component/ChapterList';
import Link from 'next/link';
import { ArrowBigLeft, ArrowLeft } from 'lucide-react';
import Loading from '@/app/_components/Loading';
function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    GetCourse();
  }, []);
  const GetCourse = async () => {
    try {
      setLoading(true);
      const result = await axios.get("/api/courses?courseId=" + courseId);
      setCourse(result.data.result);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  if(loading){
    return <Loading />
  }
  return (
    <div>
      <div>
        <CourseIntroCard course={course} />
        <StudyMaterialSection courseId={courseId} course={course} />
        <ChapterList course={course} />
      </div>
    </div>
  )
}

export default Course
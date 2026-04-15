"use client";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import DashboardHeader from "@/app/dashboard/_components/DashboardHeader";
import CourseIntroCard from "./_component/CourseIntroCard";
import axios from 'axios';
import StudyMaterialSection from './_component/StudyMaterialSection';
import ChapterList from './_component/ChapterList';
function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState();
  useEffect(() => {
    GetCourse();
  }, []);
  const GetCourse = async () => {
    const result = await axios.get("/api/courses?courseId=" + courseId);
    setCourse(result.data.result);
  };
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
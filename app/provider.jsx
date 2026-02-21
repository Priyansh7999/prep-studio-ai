'use client'
import { useUser } from '@clerk/nextjs'
import axios from 'axios';
import React, { useEffect } from 'react'

export default function Provider({ children }) {

  const { user } = useUser();

  useEffect(() => {
    user && checkIsNewUser();
  }, [user])

 const checkIsNewUser = async () => {
  if (!user) return;

  const response = await axios.post('/api/create-user', {
    user: {
      fullName: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
    }
  });

  console.log(response.data);
}
  return <>
    {children}
  </>
}

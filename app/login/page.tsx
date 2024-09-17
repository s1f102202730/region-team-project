"use client"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import FormWrapper from './components/loginpage'

export default function Home() {
  const router= useRouter()
  return (
    <>
      <FormWrapper/>
    </>
  );
}

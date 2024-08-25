"use client"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Top from './component/user/top'

export default function Home() {
  const router= useRouter()
  return (
    <>
      <Top/>
    </>
  );
}

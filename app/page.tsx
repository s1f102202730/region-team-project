"use client"
import { useRouter } from 'next/navigation'
import { ChakraProvider } from '@chakra-ui/react'
import Link from 'next/link'
import Top from './components/top'

export default function Home() {
  const router= useRouter()
  return (
    <>
      <Top/>
    </>
  );
}

'use client'
import { useRouter } from 'next/navigation'
import { Button } from './Button'
import Link from 'next/link'

export default function LoginButton() {
  const router = useRouter()

  return (
    <Button 
      onClick={() => router.push('/login?signup=true')}
      className="w-full bg-gray-600 hover:bg-gray-500 text-white rounded-md font-medium transition-colors"
    >
      Sign Up
    </Button>
  )
} 
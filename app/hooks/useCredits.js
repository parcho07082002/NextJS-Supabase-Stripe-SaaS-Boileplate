'use client'
import { useState } from 'react'

export const useCredits = () => {
  const [credits, setCredits] = useState(0)

  const addCredits = (amount) => {
    setCredits(prevCredits => prevCredits + amount)
  }

  const useCredit = () => {
    if (credits > 0) {
      setCredits(prevCredits => prevCredits - 1)
      return true
    }
    return false
  }

  const isPro = false

  return {
    credits,
    addCredits,
    useCredit,
    isPro
  }
} 
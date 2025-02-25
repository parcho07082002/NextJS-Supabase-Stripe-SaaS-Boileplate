'use client'
import { useState, useEffect } from 'react'

export default function BlurHeader() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const s = window.scrollY
      const calculatedFilter = Math.min(s / 20, 15)
      setScrollProgress(calculatedFilter)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-32 pointer-events-none z-40 transition-all duration-300"
      style={{
        background: `linear-gradient(to bottom, 
          rgba(17, 24, 39, ${0.95 * (scrollProgress / 15)}) 0%, 
          rgba(17, 24, 39, ${0.8 * (scrollProgress / 15)}) 50%, 
          rgba(17, 24, 39, 0) 100%)`,
        filter: `blur(${scrollProgress}px)`,
        WebkitFilter: `blur(${scrollProgress}px)`,
        transition: 'filter 0.1s ease-out',
      }}
    />
  )
} 
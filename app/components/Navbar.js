'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from './Button'
import { useRouter } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const router = useRouter()
  const { currentUser, logout, userDataObj } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error('Failed to logout:', error)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-12 z-50 w-full bg-transparent">
      <div className="max-w-[1440px] w-full mx-auto px-12 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="bg-gray-800 rounded-lg shadow-xl">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <span className=" text-lg sm:text-xl font-bold text-gray-100">AcatAI</span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-8">
              <div className="border-l border-transparent h-6 mx-4" />
              <Link href="/collection" className="px-6 py-2 text-sm lg:text-base text-gray-300 hover:text-white">
                MY COLLECTION
              </Link>
              <Link href="/trending" className="px-6 py-2 text-sm lg:text-base text-gray-300 hover:text-white">
                TRENDING TATTOOS
              </Link>
              <Link href="/styles" className="px-6 py-2 text-sm lg:text-base text-gray-300 hover:text-white">
                TATTOO STYLES
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 justify-center px-4 lg:px-6 max-w-2xl">
              <div className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full h-10 bg-gray-700 text-gray-200 rounded-md pl-10 pr-4 
                             focus:outline-none focus:ring-2 focus:ring-gray-600"
                    placeholder="Search Tattoo Ideas"
                  />
                  <div className="absolute left-3 top-3">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Auth/Cart */}
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <div className="relative" ref={dropdownRef}>
                  <Button
                    variant="ghost"
                    className="w-full bg-gray-600 hover:bg-gray-500 text-white rounded-md font-medium transition-colors"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Account</span>
                  </Button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 border border-gray-700">
                      {/* Credits Display */}
                      <div className="px-4 py-2 text-sm text-gray-400 border-b border-gray-700">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{userDataObj?.credits || 0} Credits</span>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <Link href="/collection" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                        My Collection
                      </Link>
                      <Link href="/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button 
                  onClick={() => router.push('/login?signup=true')}
                  className="w-full bg-gray-600 hover:bg-gray-500 text-white rounded-md font-medium transition-colors"
                >
                  Sign Up
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-300 hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 
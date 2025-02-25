'use client'
import { useState } from 'react'
import TattooCard3D from '../components/TattooCard3D'
import Navbar from '../components/Navbar'
import BlurHeader from '../components/BlurHeader'
import Link from 'next/link'
import { tattooStyles } from '../config/tattooModifiers'

export default function TattooStyles() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <BlurHeader />
      <Navbar />
      
      <main className="flex-1 py-12 mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-8">
            Tattoo Styles
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tattooStyles.map((style) => (
              <Link 
                key={style.id}
                href={`/styles/${style.id}`}
                className="block bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="aspect-square relative">
                  <img
                    src={style.imageUrl}
                    alt={style.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-100 mb-2">
                    {style.name}
                  </h2>
                  <p className="text-gray-100 text-sm">
                    {style.description || style.promptModifier.replace('in ', '').replace(' style', '')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
} 
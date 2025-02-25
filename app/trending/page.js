'use client'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useHasMounted } from '../hooks/useEffect'
import BlurHeader from '../components/BlurHeader'
import TattooCard3D from '../components/TattooCard3D'

export default function Trending() {
  const hasMounted = useHasMounted()
  
  // Example trending tattoos data with titles added
  const [trendingTattoos, setTrendingTattoos] = useState([
    {
      id: 1,
      title: "Mountain Range",
      imageUrl: '/images/tattoos/trending/1.jpg',
      prompt: 'Minimalist mountain range tattoo',
      style: { name: 'Minimalist' },
      likes: 234,
      isFavorite: false
    },
    {
      id: 2,
      title: "Rose & Dagger",
      imageUrl: '/images/tattoos/trending/2.jpg',
      prompt: 'Traditional rose with dagger',
      style: { name: 'Traditional' },
      likes: 189,
      isFavorite: false
    },
    {
      id: 3,
      title: "Geometric Wolf",
      imageUrl: '/images/tattoos/trending/3.jpg',
      prompt: 'Geometric wolf design',
      style: { name: 'Geometric' },
      likes: 167,
      isFavorite: false
    },
    {
      id: 4,
      title: "Koi Fish",
      imageUrl: '/images/tattoos/trending/4.jpg',
      prompt: 'Japanese koi fish',
      style: { name: 'Japanese' },
      likes: 145,
      isFavorite: false
    },
    {
      id: 5,
      title: "Watercolor Butterfly",
      imageUrl: '/images/tattoos/trending/5.jpg',
      prompt: 'Watercolor butterfly',
      style: { name: 'Watercolor' },
      likes: 132,
      isFavorite: false
    },
    {
      id: 6,
      title: "Celtic Armband",
      imageUrl: '/images/tattoos/trending/6.jpg',
      prompt: 'Celtic knot armband',
      style: { name: 'Celtic' },
      likes: 121,
      isFavorite: false
    },
    {
      id: 7,
      title: "Lion Portrait",
      imageUrl: '/images/tattoos/trending/7.jpg',
      prompt: 'Realistic lion portrait',
      style: { name: 'Realistic' },
      likes: 118,
      isFavorite: false
    },
    {
      id: 8,
      title: "Mandala",
      imageUrl: '/images/tattoos/trending/8.jpg',
      prompt: 'Dotwork mandala',
      style: { name: 'Dotwork' },
      likes: 98,
      isFavorite: false
    }
  ])

  // Add useEffect to load favorites from localStorage on mount
  useEffect(() => {
    if (hasMounted) {
      const favoriteTattoos = JSON.parse(localStorage.getItem('favoriteTattoos') || '[]')
      // Update the trending tattoos with their favorite status
      setTrendingTattoos(prevTattoos => 
        prevTattoos.map(tattoo => ({
          ...tattoo,
          isFavorite: favoriteTattoos.some(fav => fav.id === tattoo.id)
        }))
      )
    }
  }, [hasMounted])

  const handleFavoriteToggle = (tattooId) => {
    // Update UI state
    setTrendingTattoos((prevTattoos) =>
      prevTattoos.map((tattoo) =>
        tattoo.id === tattooId
          ? { ...tattoo, isFavorite: !tattoo.isFavorite }
          : tattoo
      )
    );

    // Get the tattoo that was favorited
    const tattoo = trendingTattoos.find(t => t.id === tattooId)
    if (!tattoo) return

    // Update localStorage
    const favorites = JSON.parse(localStorage.getItem('favoriteTattoos') || '[]')
    const existingIndex = favorites.findIndex(f => f.id === tattooId)
    
    if (existingIndex >= 0) {
      // Remove from favorites
      favorites.splice(existingIndex, 1)
    } else {
      // Add to favorites
      favorites.push({
        ...tattoo,
        favoritedAt: new Date().toISOString()
      })
    }
    
    localStorage.setItem('favoriteTattoos', JSON.stringify(favorites))
  }

  if (!hasMounted) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <BlurHeader />
      <Navbar />
      
      <main className="flex-1 py-12 mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-8">
            Trending Tattoos
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingTattoos.length === 0 ? (
              <div className="col-span-full flex justify-center items-center py-12">
                <p className="text-gray-400">No trending tattoos yet.</p>
              </div>
            ) : (
              trendingTattoos.map((tattoo) => (
                <TattooCard3D
                  key={tattoo.id} 
                  tattoo={tattoo}
                  onFavoriteToggle={() => handleFavoriteToggle(tattoo.id)}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
} 
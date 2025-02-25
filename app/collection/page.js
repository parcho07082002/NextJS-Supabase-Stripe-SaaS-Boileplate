'use client'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Button } from '../components/Button'
import { useHasMounted } from '../hooks/useEffect'
import BlurHeader from '../components/BlurHeader'
import TattooCard3D from '../components/TattooCard3D'
export default function Collection() {
  const hasMounted = useHasMounted()
  const [favorites, setFavorites] = useState([])
  const [savedTattoos, setSavedTattoos] = useState([])
  const [activeTab, setActiveTab] = useState('favorites')

  // Function to get the current tattoos based on active tab
  const getCurrentTattoos = () => {
    return activeTab === 'favorites' ? favorites : savedTattoos
  }

  // Function to get the empty state message based on active tab
  const getEmptyStateMessage = () => {
    return activeTab === 'favorites' 
      ? "Nothing in your favorites." 
      : "No saved tattoos yet."
  }

  useEffect(() => {
    if (hasMounted) {
      // Load saved tattoos from localStorage (or your backend)
      const savedTattoos = JSON.parse(localStorage.getItem('savedTattoos') || '[]')
      const favoriteTattoos = JSON.parse(localStorage.getItem('favoriteTattoos') || '[]')
      
      // Set isFavorite to true for all favorites since they're in the favorites list
      const favoritesWithState = favoriteTattoos.map(tattoo => ({
        ...tattoo,
        isFavorite: true
      }))
      
      setSavedTattoos(savedTattoos)
      setFavorites(favoritesWithState)
    }
  }, [hasMounted])

  const handleFavoriteToggle = (tattooId) => {
    // Update UI state - just toggle the isFavorite property
    setFavorites(prevFavorites => 
      prevFavorites.map(tattoo => 
        tattoo.id === tattooId 
          ? { ...tattoo, isFavorite: !tattoo.isFavorite }
          : tattoo
      )
    )

    if (hasMounted) {
      // Update localStorage
      const favoritesList = JSON.parse(localStorage.getItem('favoriteTattoos') || '[]')
      const tattoo = favorites.find(t => t.id === tattooId)
      
      if (!tattoo) return

      const existingIndex = favoritesList.findIndex(f => f.id === tattooId)
      
      if (existingIndex >= 0) {
        // Remove from localStorage but keep in state
        favoritesList.splice(existingIndex, 1)
      } else {
        // Add back to localStorage
        favoritesList.push({
          ...tattoo,
          isFavorite: true,
          favoritedAt: new Date().toISOString()
        })
      }
      
      localStorage.setItem('favoriteTattoos', JSON.stringify(favoritesList))
    }
  }

  if (!hasMounted) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <BlurHeader />
      <Navbar />
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 mt-32">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium text-gray-100">My Collection</h1>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setActiveTab('favorites')}
              className={`w-full text-left p-2 rounded-md hover:bg-gray-700 flex items-center space-x-2 ${
                activeTab === 'favorites' ? 'bg-gray-700' : 'bg-gray-800'
              }`}
            >
              <span className="text-gray-100 text-xs">
                FAVORITES {favorites.filter(t => t.isFavorite).length > 0 && 
                  `(${favorites.filter(t => t.isFavorite).length})`}
              </span>
            </Button>
            <Button
              onClick={() => setActiveTab('saved')}
              className={`w-full text-left p-2 rounded-md hover:bg-gray-700 flex items-center space-x-2 ${
                activeTab === 'saved' ? 'bg-gray-700' : 'bg-gray-800'
              }`}
            >
              <span className="text-gray-100 text-xs">
                SAVED TATTOOS {savedTattoos.length > 0 && `(${savedTattoos.length})`}
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        {getCurrentTattoos().length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-6 py-20">
            <h2 className="text-xl font-medium text-gray-100">{getEmptyStateMessage()}</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getCurrentTattoos().map((tattoo) => (
              <TattooCard3D
                key={tattoo.id || tattoo.imageUrl} 
                tattoo={tattoo} 
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 
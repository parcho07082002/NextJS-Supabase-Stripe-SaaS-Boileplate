'use client'
import { useState, useEffect } from 'react'
import { use } from 'react'
import TattooCard3D from '../../components/TattooCard3D'
import Navbar from '../../components/Navbar'
import { tattooStyles } from '../../config/tattooModifiers'
import BlurHeader from '../../components/BlurHeader'

export default function StyleDetails({ params }) {
  const [style, setStyle] = useState(null)
  const [tattoos, setTattoos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Unwrap params using React.use()
  const unwrappedParams = use(params)
  const styleId = unwrappedParams?.style

  // Example tattoos for each style - in production this would come from your database
  const exampleTattoos = {
    'traditional': [
      { 
        id: 'trad-1', 
        title: "Eagle and Snake", 
        prompt: "Traditional eagle fighting snake tattoo", 
        imageUrl: "/images/traditional/eagle-snake.jpg",
        style: { name: "Traditional" }
      },
      { 
        id: 'trad-2', 
        title: "Rose and Dagger", 
        prompt: "Traditional rose with dagger tattoo", 
        imageUrl: "/images/traditional/rose-dagger.jpg",
        style: { name: "Traditional" }
      },
      { 
        id: 'trad-3', 
        title: "Sailor Jerry Heart", 
        prompt: "Traditional Sailor Jerry style heart tattoo", 
        imageUrl: "/images/traditional/heart.jpg",
        style: { name: "Traditional" }
      },
    ],
    'neo-traditional': [
      { 
        id: 'neo-1', 
        title: "Fox Portrait", 
        prompt: "Neo-traditional fox head portrait", 
        imageUrl: "/images/neo-traditional/fox.jpg",
        style: { name: "Neo-Traditional" }
      },
      { 
        id: 'neo-2', 
        title: "Floral Skull", 
        prompt: "Neo-traditional skull with flowers", 
        imageUrl: "/images/neo-traditional/skull.jpg",
        style: { name: "Neo-Traditional" }
      },
      { 
        id: 'neo-3', 
        title: "Butterfly with Flowers", 
        prompt: "Neo-traditional butterfly and floral design", 
        imageUrl: "/images/neo-traditional/butterfly.jpg",
        style: { name: "Neo-Traditional" }
      },
    ],
    'japanese': [
      { 
        id: 'jap-1', 
        title: "Dragon", 
        prompt: "Japanese style dragon tattoo", 
        imageUrl: "/images/japanese/dragon.jpg",
        style: { name: "Japanese" }
      },
      { 
        id: 'jap-2', 
        title: "Koi Fish", 
        prompt: "Japanese koi fish with waves", 
        imageUrl: "/images/japanese/koi.jpg",
        style: { name: "Japanese" }
      },
      { 
        id: 'jap-3', 
        title: "Cherry Blossoms", 
        prompt: "Japanese cherry blossom branch", 
        imageUrl: "/images/japanese/sakura.jpg",
        style: { name: "Japanese" }
      },
    ],
    'blackwork': [
      { 
        id: 'bw-1', 
        title: "Geometric Pattern", 
        prompt: "Blackwork geometric mandala pattern", 
        imageUrl: "/images/blackwork/geometric.jpg",
        style: { name: "Blackwork" }
      },
      { 
        id: 'bw-2', 
        title: "Dark Forest", 
        prompt: "Blackwork forest silhouette", 
        imageUrl: "/images/blackwork/forest.jpg",
        style: { name: "Blackwork" }
      },
      { 
        id: 'bw-3', 
        title: "Abstract Lines", 
        prompt: "Abstract blackwork line art", 
        imageUrl: "/images/blackwork/abstract.jpg",
        style: { name: "Blackwork" }
      },
    ],
    // Add more styles as needed...
  }

  useEffect(() => {
    setIsLoading(true)
    
    if (!styleId) {
      console.error('No style ID provided')
      setIsLoading(false)
      return
    }

    try {
      const decodedStyleId = decodeURIComponent(styleId)
      const currentStyle = tattooStyles.find(s => s.id === decodedStyleId)
      
      if (currentStyle) {
        setStyle(currentStyle)
        const favoriteTattoos = JSON.parse(localStorage.getItem('favoriteTattoos') || '[]')
        const tattoosWithFavoriteState = (exampleTattoos[currentStyle.id] || []).map(tattoo => ({
          ...tattoo,
          isFavorite: favoriteTattoos.some(fav => fav.imageUrl === tattoo.imageUrl)
        }))
        setTattoos(tattoosWithFavoriteState)
      }
    } catch (error) {
      console.error('Error processing style:', error)
    }
    
    setIsLoading(false)
  }, [styleId])

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="w-full aspect-square bg-gray-700 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!style) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24">
          <h1 className="text-3xl font-bold text-gray-100 mb-8">
            Style not found
          </h1>
        </div>
      </div>
    )
  }

  const handleFavoriteToggle = async (tattooId) => {
    // Update UI state
    setTattoos(prevTattoos => 
      prevTattoos.map(tattoo => 
        tattoo.id === tattooId 
          ? { ...tattoo, isFavorite: !tattoo.isFavorite }
          : tattoo
      )
    )

    // Get the tattoo that was favorited
    const tattoo = tattoos.find(t => t.id === tattooId)
    if (!tattoo) return

    // Update localStorage
    const favorites = JSON.parse(localStorage.getItem('favoriteTattoos') || '[]')
    const existingIndex = favorites.findIndex(f => f.imageUrl === tattoo.imageUrl)
    
    if (existingIndex >= 0) {
      // Remove from favorites
      favorites.splice(existingIndex, 1)
    } else {
      // Add to favorites
      favorites.push({
        ...tattoo,
        style: style,
        favoritedAt: new Date().toISOString()
      })
    }
    
    localStorage.setItem('favoriteTattoos', JSON.stringify(favorites))
  }




  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <BlurHeader />
      <Navbar />
      
      <main className="flex-1 py-12 mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-8">
            {style.name} Style Tattoos
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tattoos.length === 0 ? (
              <div className="col-span-full flex justify-center items-center py-12">
                <p className="text-gray-400">No tattoos yet.</p>
              </div>
            ) : (
              tattoos.map((tattoo) => (
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
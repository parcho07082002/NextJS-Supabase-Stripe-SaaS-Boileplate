'use client'
import { useState } from 'react'

export default function GeneratedTattoo({ generatedImage, onSave, onFavorite }) {
  const [isSaved, setIsSaved] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  if (!generatedImage) return null

  const imageUrl = typeof generatedImage === 'string' ? generatedImage : generatedImage.imageUrl
  const metadata = typeof generatedImage === 'object' ? generatedImage : null

  const handleSave = async () => {
    try {
      await onSave(generatedImage)
      setIsSaved(true)
    } catch (error) {
      console.error('Error saving tattoo:', error)
    }
  }

  const handleFavorite = async () => {
    try {
      await onFavorite(generatedImage)
      setIsFavorite(!isFavorite)
    } catch (error) {
      console.error('Error favoriting tattoo:', error)
    }
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-lg font-semibold text-white mb-4">Your Generated Tattoo</h2>
      <img
        src={imageUrl}
        alt="Generated tattoo"
        className="w-full h-auto rounded-lg border border-gray-600"
      />
      {metadata && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">Style: {metadata.style.name}</div>
            <div className="text-sm text-gray-400">Size: {metadata.size.name}</div>
          </div>
          {metadata.placement && (
            <div className="text-sm text-gray-400">
              Placement: {metadata.placement.name}
            </div>
          )}
        </div>
      )}

      <div className="mt-4 flex justify-end space-x-4">
        <button
          onClick={handleFavorite}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
            isFavorite 
              ? 'text-red-400 bg-gray-700 hover:bg-gray-600' 
              : 'text-gray-400 hover:bg-gray-700'
          }`}
        >
          <svg className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
          <span>Favorite</span>
        </button>
        <button
          onClick={handleSave}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
            isSaved 
              ? 'text-green-400 bg-gray-700 hover:bg-gray-600' 
              : 'text-gray-400 hover:bg-gray-700'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          <span>{isSaved ? 'Saved' : 'Save'}</span>
        </button>
      </div>
    </div>
  )
}

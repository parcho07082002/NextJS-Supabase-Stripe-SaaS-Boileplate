'use client'
import { useState, useEffect, useRef, useContext } from 'react'
import { useRouter } from 'next/navigation'
import StyleSelector from './StyleSelector'
import SizePlacementSelector from './SizePlacementSelector'
import { usePromptBuilder } from '../hooks/usePromptBuilder'
import { Textarea } from "./textarea"
import { useCredits } from '../hooks/useCredits'
import { Button } from './Button'
import { useAuth } from '../contexts/AuthContext'
import { AuthContext } from '../contexts/AuthContext'
import { Switch } from "./switch"



export default function TattooConfigurator({
  prompt,
  setPrompt,
  selectedStyle,
  setSelectedStyle,
  selectedSize,
  setSelectedSize,
  selectedPlacement,
  setSelectedPlacement,
  selectedIdea,
  onGenerate,
  showOnBody,
  setShowOnBody
}) {
  const [openSelector, setOpenSelector] = useState(null)
  const configuratorRef = useRef(null)
  const router = useRouter()
  const { credits, isPro, useCredit, upgradeToPro, userDataObj } = useCredits()
  const { currentUser, deleteUserAccount } = useAuth()
  
  const { promptParts, finalPrompt, isPromptReady } = usePromptBuilder({
    prompt,
    selectedStyle,
    selectedSize,
    selectedPlacement,
    showOnBody,
  })

  // Handle click outside to close selectors
  useEffect(() => {
    function handleClickOutside(event) {
      if (!configuratorRef.current?.contains(event.target)) {
        setOpenSelector(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Update prompt when selectedIdea changes
  useEffect(() => {
    if (selectedIdea) {
      setPrompt(selectedIdea);
    }
  }, [selectedIdea, setPrompt]);

  // Handler to toggle selectors
  const handleSelectorToggle = (clickedSelector) => {
    setOpenSelector(current => current === clickedSelector ? null : clickedSelector)
  }

  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount();
      router.push('/');
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  return (
    <div ref={configuratorRef} className="space-y-4">
      {/* Credits Display */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {isPro ? (
            <span className="flex items-center text-primary">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Pro Account
            </span>
          ) : (
            <span>{userDataObj?.credits || 0} Credits Left</span>
          )}
        </div>
        {!isPro && (
          <Button
            onClick={() => currentUser ? router.push('/settings?tab=billing') : router.push('/login?signup=true')}
            variant="outline"
            className="text-gray-100 bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-gray-600 text-xs"
            size="sm"
          >
            Upgrade to Pro
          </Button>
        )}
      </div>

      {/* Tattoo Idea Input */}
      <label className="block text-sm font-medium text-gray-300">
        Tattoo Idea
      </label>
      <div className="flex space-x-2">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your tattoo idea..."
          className="block text-sm bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500"
        />
      </div>
      
      {/* Style Selection */}
      <StyleSelector
        selectedStyle={selectedStyle}
        onStyleSelect={(style) => {
          setSelectedStyle(style)
          setOpenSelector(null)
        }}
        isOpen={openSelector === 'style'}
        onToggle={() => handleSelectorToggle('style')}
      />

      {/* Size and Placement Selection */}
      <SizePlacementSelector
        selectedSize={selectedSize}
        onSizeSelect={(size) => {
          setSelectedSize(size);
        }}
        selectedPlacement={selectedPlacement}
        onPlacementSelect={(placement) => {
          setSelectedPlacement(placement);
        }}
        isOpen={openSelector === 'sizePlacement'}
        onToggle={() => handleSelectorToggle('sizePlacement')}
      />

      {/* Add the switch before the Final Prompt Preview */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">
          Show on Body
        </label>
        <Switch
          checked={showOnBody}
          onCheckedChange={setShowOnBody}
          className="ml-4"
        />
      </div>

      {/* Final Prompt Preview */}
      <div className="w-full space-y-4">
        <div className="font-medium text-sm text-gray-100 mb-2">Final Prompt</div>
        <div className="flex-1 p-2 border border-gray-700 rounded-md bg-gray-800 text-gray-200">
          <p className="text-sm whitespace-pre-wrap">
            {finalPrompt || 'Complete all selections to build the prompt...'}
          </p>
        </div>
      </div>

      {/* Generate Button */}
      <Button
        onClick={onGenerate}
        disabled={!isPromptReady || !credits}
        className={`w-full py-2 px-4 bg-gray-800 text-gray-100 rounded-md 
          hover:bg-gray-700 font-medium transition-colors
          ${(!isPromptReady || !credits) ? 'bg-gray-800/50 cursor-not-allowed' : ''}`}
      >
        {isPromptReady ? 'Generate Tattoo' : 'Complete all selections...'}
      </Button>
    </div>
  )
}

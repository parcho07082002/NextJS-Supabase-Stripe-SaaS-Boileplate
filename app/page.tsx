'use client'
import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import TattooConfigurator from './components/TattooConfigurator'
import GeneratedTattoo from './components/GeneratedTattoo'
import TattooIdeaGenerator from './components/TattooIdeaGenerator'
import { tattooStyles, tattooSizes } from './config/tattooModifiers'
import { Textarea } from "./components/textarea"
import { useHasMounted } from './hooks/useEffect'
import { Button } from './components/Button'
import LoginButton from './components/LoginButton'
import { useCredits } from './hooks/useCredits'
import { useRouter } from 'next/navigation'
import BlurHeader from './components/BlurHeader'
import TattooCard3D from './components/TattooCard3D'
import { AnimatedCircularProgressBar } from './components/ProgressBar'
import Navigation from "./components/Navigation"
import Link from "next/link"
import AnnouncementBanner from "./components/AnnouncementBanner"
import * as SwitchPrimitives from "@radix-ui/react-switch"

type TattooStyle = {
  name: string;
  promptModifier: string;
}

type TattooSize = {
  name: string;
  promptModifier: string;
}

type TattooPlacement = {
  name: string;
  promptModifier: string;
}

type GeneratedImage = {
  imageUrl: string;
  prompt: string;
  style: TattooStyle;
  size: TattooSize;
  placement: TattooPlacement | null;
}

type TrendingTattoo = {
  id: number;
  title?: string;
  imageUrl: string;
  prompt: string;
  style: { name: string };
  isFavorite: boolean;
}

export default function Home() {
  const hasMounted = useHasMounted()
  const router = useRouter()
  const { credits, isPro, useCredit, addCredits } = useCredits()
  const [activeTab, setActiveTab] = useState('configurator')
  const [selectedIdea, setSelectedIdea] = useState('')
  const [prompt, setPrompt] = useState('')
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState(tattooStyles[0])
  const [selectedSize, setSelectedSize] = useState(tattooSizes[1])
  const [selectedPlacement, setSelectedPlacement] = useState<TattooPlacement | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [showChat, setShowChat] = useState(false)
  const [showOnBody, setShowOnBody] = useState(true)
  const [trendingTattoos, setTrendingTattoos] = useState<TrendingTattoo[]>([
    {
      id: 1,
      title: "Mountain Range",
      imageUrl: '/images/tattoos/trending/1.jpg',
      prompt: 'Minimalist mountain range tattoo',
      style: { name: 'Minimalist' },
      isFavorite: false
    },
    {
      id: 2,
      title: "Rose & Dagger",
      imageUrl: '/images/tattoos/trending/2.jpg',
      prompt: 'Traditional rose with dagger',
      style: { name: 'Traditional' },
      isFavorite: false
    },
    {
      id: 3,
      title: "Geometric Wolf",
      imageUrl: '/images/tattoos/trending/3.jpg',
      prompt: 'Geometric wolf design',
      style: { name: 'Geometric' },
      isFavorite: false
    },
    {
      id: 4,
      title: "Koi Fish",
      imageUrl: '/images/tattoos/trending/4.jpg',
      prompt: 'Japanese koi fish',
      style: { name: 'Japanese' },
      isFavorite: false
    },
    {
      id: 5,
      imageUrl: '/images/tattoos/trending/5.jpg',
      prompt: 'Watercolor butterfly',
      style: { name: 'Watercolor' },
      isFavorite: false
    },
    {
      id: 6,
      imageUrl: '/images/tattoos/trending/6.jpg',
      prompt: 'Celtic knot armband',
      style: { name: 'Celtic' },
      isFavorite: false
    },
    {
      id: 7,
      imageUrl: '/images/tattoos/trending/7.jpg',
      prompt: 'Realistic lion portrait',
      style: { name: 'Realistic' },
      isFavorite: false
    },
    {
      id: 8,
      imageUrl: '/images/tattoos/trending/8.jpg',
      prompt: 'Dotwork mandala',
      style: { name: 'Dotwork' },
      isFavorite: false
    }
  ])

  const handleGenerate = async () => {
    if (!prompt) return;

    setIsGenerating(true);
    setError(null);
    setProgress(0);

    try {
      const fullPrompt = `${prompt} ${selectedStyle.promptModifier} ${selectedSize.promptModifier} ${selectedPlacement?.promptModifier || ''} ${
        showOnBody ? 'realistically placed on skin with natural lighting and skin texture' : 'on pure white background'
      }`;
      
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: fullPrompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate tattoo');
      }

      const data = await response.json();
      
      clearInterval(progressInterval);
      setProgress(100);
      
      setGeneratedImage({
        imageUrl: data.imageUrl || data.url || data,
        prompt: fullPrompt,
        style: selectedStyle,
        size: selectedSize,
        placement: selectedPlacement
      });

    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsGenerating(false);
      setTimeout(() => setProgress(0), 500);
    }
  };

  const generateTattoo = () => {
    handleGenerate();
  };

  const handleSelectIdea = (idea: string) => {
    setSelectedIdea(idea);
    setActiveTab('configurator');
  };

  useEffect(() => {
    if (hasMounted) {
      const favoriteTattoos = JSON.parse(localStorage.getItem('favoriteTattoos') || '[]');
      setTrendingTattoos(prevTattoos => 
        prevTattoos.map(tattoo => ({
          ...tattoo,
          isFavorite: favoriteTattoos.some((fav: TrendingTattoo) => fav.id === tattoo.id)
        }))
      );
    }
  }, [hasMounted]);

  const handleFavoriteToggle = (tattooId: number) => {
    setTrendingTattoos((prevTattoos) =>
      prevTattoos.map((tattoo) =>
        tattoo.id === tattooId
          ? { ...tattoo, isFavorite: !tattoo.isFavorite }
          : tattoo
      )
    );

    const tattoo = trendingTattoos.find(t => t.id === tattooId);
    if (!tattoo) return;

    const favorites = JSON.parse(localStorage.getItem('favoriteTattoos') || '[]');
    const existingIndex = favorites.findIndex((f: TrendingTattoo) => f.id === tattooId);
    
    if (existingIndex >= 0) {
      favorites.splice(existingIndex, 1);
    } else {
      favorites.push({
        ...tattoo,
        favoritedAt: new Date().toISOString()
      });
    }
    
    localStorage.setItem('favoriteTattoos', JSON.stringify(favorites));
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <BlurHeader />
      <Navbar />
      
      <div className="flex-1 container mx-auto px-0 py-0 mt-32">
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="flex w-full border-b border-gray-700">
            <button
              onClick={() => setActiveTab('configurator')}
              className={`flex-1 px-6 py-3 text-sm font-medium ${
                activeTab === 'configurator'
                  ? 'text-white border-b-2 border-gray-300'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Tattoo Generator
            </button>
            <button
              onClick={() => setActiveTab('generator')}
              className={`flex-1 px-6 py-3 text-sm font-medium ${
                activeTab === 'generator'
                  ? 'text-white border-b-2 border-gray-300'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Idea Generator
            </button>
          </div>

          <div className="p-6">
            <div className={`${activeTab === 'configurator' ? 'block' : 'hidden'}`}>
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-[40%] space-y-6">
                  <div className="space-y-4">
                    <TattooConfigurator
                      prompt={prompt}
                      setPrompt={setPrompt}
                      selectedStyle={selectedStyle}
                      setSelectedStyle={setSelectedStyle}
                      selectedSize={selectedSize}
                      setSelectedSize={setSelectedSize}
                      selectedPlacement={selectedPlacement}
                      setSelectedPlacement={setSelectedPlacement}
                      selectedIdea={selectedIdea}
                      onGenerate={handleGenerate}
                      showOnBody={showOnBody}
                      setShowOnBody={setShowOnBody}
                    />

                    {error && (
                      <div className="text-red-400 text-sm">
                        {error}
                      </div>
                    )}

                    <Button
                      type="button"
                      onClick={generateTattoo}
                      disabled={isGenerating || !prompt}
                      className={`w-full mt-6 px-4 py-3 rounded-md font-medium text-white ${
                        isGenerating || !prompt
                          ? 'bg-gray-700 cursor-not-allowed'
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    >
                      {isGenerating ? (
                        <div className="flex items-center justify-center space-x-2">
                          <AnimatedCircularProgressBar
                            max={100}
                            min={0}
                            value={progress}
                            gaugePrimaryColor="#10B981"
                            gaugeSecondaryColor="#1F2937"
                            className="mx-auto mb-4"
                          />
                          <span>Generating...</span>
                        </div>
                      ) : 'Generate Tattoo'}
                    </Button>
                  </div>
                </div>

                <div className="flex-1 bg-gray-800 flex flex-col items-center justify-center">
                  <div className="relative w-full aspect-square bg-gray-800 rounded-lg overflow-hidden">
                    {isGenerating ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
                        <div className="text-center">
                          <AnimatedCircularProgressBar
                            max={100}
                            min={0}
                            value={progress}
                            gaugePrimaryColor="#10B981"
                            gaugeSecondaryColor="#1F2937"
                            className="mx-auto mb-4"
                          />
                          <p className="text-gray-400 text-sm">Generating your tattoo...</p>
                        </div>
                      </div>
                    ) : generatedImage ? (
                      <img
                        src={generatedImage.imageUrl}
                        alt={generatedImage.prompt}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-gray-400">Your generated tattoo will appear here</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`${activeTab === 'generator' ? 'block' : 'hidden'} relative w-full`}>
              <TattooIdeaGenerator 
                onSelectIdea={handleSelectIdea}
                onSwitchTab={setActiveTab}
              />
            </div>

            <div className="mt-12 border-t border-gray-700 pt-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-100">
                  Trending Tattoos
                </h2>
                <Link 
                  href="/trending"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  View All →
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {trendingTattoos.map((tattoo) => (
                  <TattooCard3D
                    key={tattoo.id} 
                    tattoo={tattoo}
                    onFavoriteToggle={() => handleFavoriteToggle(tattoo.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-8 px-4 text-center text-gray-400">
        <div className="h-px w-full max-w-xl mx-auto mb-8 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
        © {new Date().getFullYear()} AcatAI. All rights reserved.
      </footer>
    </div>
  );
} 
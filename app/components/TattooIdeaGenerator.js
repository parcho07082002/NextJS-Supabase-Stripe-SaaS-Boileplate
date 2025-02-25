'use client'
import React, { useState } from 'react';
import { Textarea } from "./textarea"
import { useHasMounted } from '../hooks/useEffect'
import { Button } from './Button'

const TattooIdeaGenerator = ({ onSelectIdea, onSwitchTab }) => {
  const hasMounted = useHasMounted()
  const [prompt, setPrompt] = useState('');
  const [ideas, setIdeas] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const job = document.getElementById('job').value;
    const interests = document.getElementById('interests').value;
    const favorites = document.getElementById('favorites').value;

    try {
      const response = await fetch('/api/generateideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          job,
          interests,
          favorites,
        }),
      });

      const contentType = response.headers.get("content-type");
      let data;
      
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Invalid response format: ${text.substring(0, 100)}...`);
      }
      
      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to generate ideas');
      }

      setIdeas(data.idea);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateClick = (idea) => {
    onSelectIdea(idea);
    onSwitchTab('configurator');
  };

  if (!hasMounted) {
    return null; // or a loading spinner
  }

  if (error) {
    return (
      <div className="p-4 bg-red-900/20 text-red-400 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="relative bg-gray-800">
      <div className="max-w-5xl mx-auto p-6 text-gray-100">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6">Generate Tattoo Ideas</h2>
        
        <form onSubmit={handleSubmit} className="relative space-y-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="job" className="block text-sm font-medium text-gray-100 mb-2">
                Job/Occupation 
              </label>
              <Textarea 
                id="job" 
                placeholder="e.g. student, barista, engineer, veteran, teacher, etc." 
                required
                className="w-full min-h-[80px] bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>

            <div>
              <label htmlFor="interests" className="block text-sm font-medium text-gray-100 mb-2">
                Interests/Passions/Hobbies
              </label>
              <Textarea 
                id="interests" 
                placeholder="e.g. music, hiking, coffee, etc." 
                required
                className="w-full min-h-[80px] bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>

            <div>
              <label htmlFor="favorites" className="block text-sm font-medium text-gray-100 mb-2">
                Favorite Things
              </label>
              <Textarea 
                id="favorites" 
                placeholder="e.g. animals, objects, places, etc." 
                required
                className="w-full min-h-[80px] bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className={`w-full mt-6 px-4 py-3 rounded-md font-medium text-white ${
              isLoading 
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Generating...</span>
              </div>
            ) : (
              'Generate Ideas'
            )}
          </Button>
        </form>

        {ideas && (
          <div className="mt-8 space-y-6">
            <div className="grid grid-rows-2 grid-flow-col gap-4 md:grid-cols-3">
              {ideas.split('\n').map((idea, index) => (
                idea.trim() && (
                  <div 
                    key={index} 
                    className="p-4 bg-gray-800 rounded-lg shadow-sm border border-gray-700"
                  >
                    <p className="text-sm text-gray-100 mb-4">
                      {idea.replace(/^\d+\.\s*/, '')}
                    </p>
                    <Button 
                      className="w-full py-2 px-4 bg-gray-700 text-gray-100 rounded-md 
                        hover:bg-gray-600 font-medium text-sm transition-colors"
                      onClick={() => handleGenerateClick(idea.replace(/^\d+\.\s*/, ''))}
                    >
                      Generate
                    </Button>
                  </div>
                )
              ))}
            </div>
            <Button 
              className={`w-full mt-6 px-4 py-3 rounded-md font-medium text-white 
                bg-gray-600 hover:bg-gray-500`}
              onClick={handleSubmit}
            >
              Try Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TattooIdeaGenerator;

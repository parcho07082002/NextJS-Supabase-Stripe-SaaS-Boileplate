"use client";
import React, { createContext, useState, useContext, useRef, useEffect } from "react";
import { cn } from "../lib/utils";

const MouseEnterContext = createContext(undefined);

const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};

export default function TattooCard3D({ tattoo, onFavoriteToggle }) {
  const containerRef = useRef(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20;
    const y = (e.clientY - top - height / 2) / 20;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className="w-full aspect-[1/1.4] flex items-center justify-center"
        style={{
          perspective: "800px",
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full h-full bg-gray-800 rounded-lg shadow-sm border border-gray-700 overflow-hidden transition-all duration-200 ease-linear"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <div className="relative w-full aspect-square [transform-style:preserve-3d]">
            <img
              src={tattoo.imageUrl}
              alt={tattoo.title || tattoo.prompt}
              className="w-full h-full object-cover"
              style={{
                transform: isMouseEntered 
                  ? 'translateZ(25px)'
                  : 'translateZ(0px)',
                transition: 'transform 200ms ease-linear'
              }}
            />
            <button
              onClick={() => onFavoriteToggle(tattoo.id)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-900/80 hover:bg-gray-900 transition-colors"
              style={{
                transform: isMouseEntered 
                  ? 'translateZ(48px)'
                  : 'translateZ(0px)',
                transition: 'transform 200ms ease-linear'
              }}
            >
              <svg 
                className={`w-5 h-5 ${tattoo.isFavorite ? 'text-red-500' : 'text-gray-300'}`}
                fill={tattoo.isFavorite ? "currentColor" : "none"}
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
            </button>
          </div>
          <div 
            className="p-4"
            style={{
              transform: isMouseEntered 
                ? 'translateZ(40px)'
                : 'translateZ(0px)',
              transition: 'transform 200ms ease-linear'
            }}
          >
            <h3 className="text-lg font-medium text-gray-100 text-center">{tattoo.title}</h3>
          </div>
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
} 
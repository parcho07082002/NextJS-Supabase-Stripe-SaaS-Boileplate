'use client'
import { useEffect, useRef } from 'react';
import { tattooSizes, tattooPlacement } from '../config/tattooModifiers';
import { Button } from './Button';


export default function SizePlacementSelector({ 
  selectedSize,
  onSizeSelect,
  selectedPlacement,
  onPlacementSelect,
  isOpen,
  onToggle
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onToggle(); // Close the modal
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <div className="w-full space-y-4">
      <h6 className="text-sm font-medium text-gray-300">Size and Placement</h6>
      <Button
        onClick={onToggle}
        className="w-full p-2 text-left bg-gray-600 hover:bg-gray-500 text-white rounded-md font-medium transition-colors flex justify-between items-center"
      >
        <span className="text-sm font-medium">
          {selectedSize ? selectedSize.name : 'Select Size'} / {selectedPlacement ? selectedPlacement.name : 'Select Placement'}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
          <div ref={modalRef} className="fixed inset-x-4 top-[10%] z-50 h-[80vh] rounded-lg border border-gray-700 bg-gray-900 shadow-lg md:left-[50%] md:right-auto md:top-[50%] md:w-[90vw] md:max-w-[800px] md:translate-x-[-50%] md:translate-y-[-50%]">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-6 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-gray-100">Select Size and Placement</h2>
                <Button onClick={onToggle} className="text-gray-400 hover:text-gray-100">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {tattooSizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => {
                        onSizeSelect(size);
                      }}
                      className={`relative group p-4 rounded-lg border transition-all ${
                        selectedSize?.id === size.id
                          ? 'border-gray-500 ring-2 ring-gray-500'
                          : 'border-gray-700 hover:border-gray-500'
                      }`}
                    >
                      <span className="text-sm font-medium text-gray-100">{size.name}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-6">
                  <h6 className="text-sm font-medium text-gray-100">Placement</h6>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {tattooPlacement.map((placement) => (
                      <button
                        key={placement.id}
                        onClick={() => {
                          onPlacementSelect(placement);
                        }}
                        className={`relative group p-4 rounded-lg border transition-all ${
                          selectedPlacement?.id === placement.id
                            ? 'border-gray-500 ring-2 ring-gray-500'
                            : 'border-gray-700 hover:border-gray-500'
                        }`}
                      >
                        <div className="w-full aspect-square bg-gray-800 rounded-lg flex items-center justify-center">
                          <img 
                            src={placement.image} 
                            alt={placement.name}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                        <span className="text-xs font-medium uppercase mt-1 text-gray-300">
                          {placement.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

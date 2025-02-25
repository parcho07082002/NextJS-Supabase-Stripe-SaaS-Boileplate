import { useMemo } from 'react'

export function usePromptBuilder({
  prompt,
  selectedStyle,
  selectedSize,
  selectedPlacement,
  showOnBody,
}) {
  const promptParts = useMemo(() => {
    return {
      basePrompt: prompt?.trim() || '',
      style: selectedStyle?.name || '',
      size: selectedSize?.name || '',
      placement: selectedPlacement?.name || '',
      background: showOnBody ? 'realistically placed on skin with natural lighting and skin texture' : 'on pure white background',
    }
  }, [prompt, selectedStyle, selectedSize, selectedPlacement, showOnBody])

  const finalPrompt = useMemo(() => {
    if (!promptParts.basePrompt || !selectedStyle || !selectedSize || !selectedPlacement) {
      return ''
    }

    return `Create a ${promptParts.style.toLowerCase()} style tattoo design of ${
      promptParts.basePrompt
    }. The design should be ${promptParts.size.toLowerCase()} in size, suitable for placement on the ${
      promptParts.placement.toLowerCase()
    }, ${promptParts.background}.`
  }, [promptParts, selectedStyle, selectedSize, selectedPlacement])

  const isPromptReady = useMemo(() => {
    return Boolean(
      promptParts.basePrompt &&
      promptParts.style &&
      promptParts.size &&
      promptParts.placement
    )
  }, [promptParts])

  return {
    promptParts,
    finalPrompt,
    isPromptReady,
  }
} 
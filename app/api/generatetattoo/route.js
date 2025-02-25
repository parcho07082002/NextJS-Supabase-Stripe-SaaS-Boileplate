const GETIMG_API_KEY = process.env.GETIMG_API_KEY
const API_URL = 'https://api.getimg.ai/v1/generations'

export async function POST(request) {
  try {
    const { prompt } = await request.json()
    
    // Add some context to the prompt to ensure it generates tattoo-style art
    const enhancedPrompt = `Create a tattoo design: ${prompt}. Make it suitable for a tattoo with clear lines and good contrast.`

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GETIMG_API_KEY}`
      },
      body: JSON.stringify({
        model: 'stable-diffusion-xl-v1-0',
        prompt: enhancedPrompt,
        negative_prompt: 'blurry, low quality, low contrast, bad anatomy, watermark, signature, text',
        width: 1024,
        height: 1024,
        steps: 30,
        guidance: 7.5,
        scheduler: 'euler',
        output_format: 'jpeg'
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to generate image')
    }

    const data = await response.json()
    return new Response(JSON.stringify({
      imageUrl: data.image.url
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    })
  } catch (error) {
    console.error('Error generating image:', error)
    return new Response(JSON.stringify({
      error: 'Failed to generate tattoo',
      details: error.message
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    })
  }
}

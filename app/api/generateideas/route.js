import { NextResponse } from 'next/server';
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request) {
    try {
        const { job, interests, favorites } = await request.json();

        // Validate GROQ_API_KEY
        if (!process.env.GROQ_API_KEY) {
            console.error('GROQ_API_KEY is not configured');
            return NextResponse.json({ 
                error: 'API configuration error', 
                details: 'GROQ_API_KEY is missing' 
            }, { status: 500 });
        }

        if (!job || !interests || !favorites) {
            return NextResponse.json({ 
                error: 'Missing required fields',
                details: {
                    job: !!job,
                    interests: !!interests,
                    favorites: !!favorites
                }
            }, { status: 400 });
        }
        
        console.log('Attempting Groq API request with:', { job, interests, favorites });

        try {
            const chatCompletion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: "You are a tattoo idea generator. Respond with exactly 6 tattoo ideas. Each idea must be on a new line, starting with a number and a period. Keep each idea over 10 words and under 20 words. No additional text or explanations."
                    },
                    {
                        role: "user",
                        content: `Generate 6 tattoo ideas based on:
                        Job: ${job}
                        Interests: ${interests}
                        Favorites: ${favorites}`
                    }
                ],
                model: "llama3-8b-8192",
                temperature: 0.9,
                max_tokens: 1024,
                top_p: 1
            });

            if (!chatCompletion.choices?.[0]?.message?.content) {
                throw new Error('Invalid or empty response from Groq API');
            }

            const idea = chatCompletion.choices[0].message.content;
            return NextResponse.json({ idea }, { status: 200 });

        } catch (groqError) {
            console.error('Groq API error:', groqError);
            return NextResponse.json({ 
                error: 'Groq API error', 
                details: groqError.message || 'Unknown Groq API error',
                code: groqError.code || 'UNKNOWN'
            }, { status: 503 });
        }

    } catch (error) {
        console.error('Request processing error:', error);
        return NextResponse.json(
            { error: 'Failed to process request', details: error.message }, 
            { status: 500 }
        );
    }
}

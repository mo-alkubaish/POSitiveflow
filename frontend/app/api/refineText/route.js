import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request) {
  try {
    const body = await request.json();
    const { imageBase64 } = body;

    if (!imageBase64) {
      return NextResponse.json(
        { error: 'Image data is required' },
        { status: 400 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Step 1: Extract text from the image
    const extractionResponse = await openai.images.generate({
      prompt: 'Extract the text visible in this image',
      image: imageBase64,
      size: '640x480', // Adjust size as needed
    });

    if (!extractionResponse || !extractionResponse.text) {
      throw new Error('Failed to extract text from image');
    }

    const extractedText = extractionResponse.text;

    // Step 2: Refine the extracted text
    const refinementResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an AI that refines OCR text for accuracy.',
        },
        {
          role: 'user',
          content: `OCR Text: "${extractedText}". Refine this to match a product.`,
        },
      ],
      max_tokens: 20,
      temperature: 0.3,
    });

    const refinedText = refinementResponse.choices[0]?.message?.content || extractedText;

    return NextResponse.json({
      refinedText,
      status: 'success',
    });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      { error: error.message || 'Error processing image' },
      { status: 500 }
    );
  }
}

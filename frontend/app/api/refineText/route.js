import { NextResponse } from 'next/server';
import OpenAI from 'openai';

function getBackupCompletion(ocrText) {
  const searchText = ocrText.toLowerCase();
  const refinedText = [];

  const COMMON_ITEMS = {
    'cheese': 'Cheese',
    'caramelized sesame': 'Caramelized Sesame',
    'zattar': 'Zattar',
    'cinnabon': 'Cinnabon',
    'coffee': 'Coffee - Beverages',
    'chesse pizza': 'Margherita Pizza',
    'pizza': 'Margherita Pizza',
  };

  // Split the searchText into components if it has multiple items
  const words = searchText.split(', ');

  words.forEach(word => {
    let found = false;
    Object.entries(COMMON_ITEMS).forEach(([key, value]) => {
      if (word.includes(key)) {
        refinedText.push(value);
        found = true;
      }
    });
    if (!found) {
      refinedText.push(word); // Push the original word if no match is found
    }
  });

  return refinedText.join(', '); // Join the refined text with commas if there are multiple items
}


export async function POST(request) {
  if (request.method === 'OPTIONS') {
    return new NextResponse('', { status: 200 });
  }

  try {
    const body = await request.json();
    const { ocrText } = body;

    if (!ocrText) {
      return NextResponse.json(
        { error: 'OCR text is required' },
        { status: 400 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an AI that helps refine OCR text, which may contain spelling errors, and match it with a product catalog. Keep responses short and precise."
          },
          {
            role: "user",
            content: `OCR Text: "${ocrText}". Please correct any spelling errors and return suggestions in 10 words or less.`
          }
        ],
        max_tokens: 20,  // Limit response size to reduce token usage
        temperature: 0.3 // More deterministic responses
      });
      

      return NextResponse.json({
        refinedText: completion.choices[0].message.content,
        status: 'success',
      });

    } catch (openaiError) {
      console.error('OpenAI API Error:', openaiError);

      // Use local text matching if OpenAI fails
      const backupText = getBackupCompletion(ocrText);

      return NextResponse.json({
        refinedText: backupText,
        status: 'fallback',
        message: 'Using fallback text processing'
      });
    }

  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json(
      { error: error.message || 'Error processing text' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

function getBackupCompletion(ocrText) {
  console.log('🔄 Using backup completion method');
  const searchText = ocrText.toLowerCase();
  const refinedText = [];

  const COMMON_ITEMS = {
    'cheese': 'Cheese',
    'caramelized sesame': 'Caramelized Sesame',
    'zattar': 'Zattar',
    'cinnabon': 'Cinnabon',
    'pizza': 'Margherita Pizza',
  };

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
      refinedText.push(word);
    }
  });

  console.log('✅ Backup completion result:', refinedText.join(', '));
  return refinedText.join(', ');
}

export async function POST(request) {
  if (request.method === 'OPTIONS') {
    return new NextResponse('', { status: 200 });
  }

  try {
    const body = await request.json();
    const { ocrText } = body;

    if (!ocrText) {
      console.log('❌ Error: No OCR text provided');
      return NextResponse.json(
        { error: 'OCR text is required' },
        { status: 400 }
      );
    }

    console.log('📝 Processing OCR text:', ocrText);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    try {
      console.log('🤖 Attempting to use Google Gemini API');
      
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `
System: You are a product text refinement system. Your task is to:
1. Correct any spelling errors in the text
2. If you see any variations of these items, replace them with the correct product name:
   - Any spelling of "pizza" → "Margherita Pizza"
   - Any spelling of "cheese" → "Cheese"
   - Any spelling of "caramelized sesame" → "Caramelized Sesame"
   - Any spelling of "zattar" or "zatar" → "Zattar"
   - Any spelling of "cinnabon" → "Cinnabon"
3. For all other text, just correct the spelling
4. Maintain the original format (if items were comma-separated, keep them comma-separated)
5. Return ONLY the corrected text without any explanations

Input: "${ocrText}"
Output format: Just the corrected text, maintaining original separators (commas, etc.)`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      console.log('✨ Successfully processed with Gemini:', text);

      return NextResponse.json({
        refinedText: text,
        status: 'success',
        processingMethod: 'gemini'
      });

    } catch (geminiError) {
      console.error('❌ Gemini API Error:', geminiError);

      const backupText = getBackupCompletion(ocrText);

      return NextResponse.json({
        refinedText: backupText,
        status: 'fallback',
        message: 'Using fallback text processing',
        processingMethod: 'backup'
      });
    }

  } catch (error) {
    console.error('❌ Server Error:', error);
    return NextResponse.json(
      { error: error.message || 'Error processing text' },
      { status: 500 }
    );
  }
}
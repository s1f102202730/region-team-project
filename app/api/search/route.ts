import { NextResponse } from 'next/server';
import { searchTouristSpots } from '@/lib/search';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
  baseURL: process.env.NEXT_PUBLIC_OPENAI_API_BASE,
});

export async function POST(request: Request) {
  try {
    const { hobby, activity } = await request.json();

    // 趣味と活動内容をベクトル化
    const response = await openai.embeddings.create({
      input: `${hobby}, ${activity}`,
      model: 'text-embedding-ada-002',
    });

    const queryVector = response.data[0]?.embedding;

    if (!queryVector) {
      return NextResponse.json({ error: 'Failed to generate embeddings' }, { status: 500 });
    }

    // ベクトル検索を実行
    const results = await searchTouristSpots(queryVector);

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error in search route:', error);
    return NextResponse.json({ error: 'Failed to perform search' }, { status: 500 });
  }
}

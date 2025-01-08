import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {OpenAIEmbeddings} from 'langchain_openai'; 

const prisma = new PrismaClient();

// OpenAI API 設定


const openaiEmbedding = new OpenAIEmbeddings({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
  baseURL: process.env.NEXT_PUBLIC_OPENAI_API_BASE
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    // 各観光地のデータを処理
    const results = await Promise.all(
      body.map(async (record: any) => {
        // OpenAI APIを使用してベクトルを生成
        const vector = await openaiEmbedding.generate(record.explanation);

        // Embedding モデルに保存
        const embedding = await prisma.embedding.create({
          data: {
            touristSpotId: record.id, // TouristSpot の ID
            content: record.explanation || '',
            vector, // ベクトルを保存
          },
        });

        return embedding;
      })
    );

    return NextResponse.json({ message: 'Embeddings created successfully', results });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error generating embeddings' }, { status: 500 });
  }
}
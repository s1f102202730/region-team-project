import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';

const prisma = new PrismaClient();

// OpenAI API 設定


const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
  baseURL: process.env.NEXT_PUBLIC_OPENAI_API_BASE,
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
        const embeddingResponse = await openai.createEmbedding({
          model: "text-embedding-ada-002", // OpenAI のベクトル生成モデル
          input: record.explanation || '',
        });

        const vector = embeddingResponse.data.data[0].embedding;

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
// サーバーサイドAPI
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// OpenAIクライアントのセットアップ
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
  baseURL: process.env.NEXT_PUBLIC_OPENAI_API_BASE,
});

export async function POST(request: Request) {
  try {
    // クライアントから送信されたメッセージを取得
    const { message } = await request.json();

    // OpenAI APIを使って応答を生成
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: "gpt-4o-mini",
      stream: true,
    });

    // AIからの回答
    const answer = completion.choices[0].message?.content || "No response";

    // JSON形式でクライアントに返す
    return NextResponse.json({ response: answer });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Failed to get response from AI' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  baseURL: process.env.NEXT_PUBLIC_OPENAI_API_BASE,
});

export async function POST(request: Request) {
  try {
    const { message, season, time, weather, activity, budget } = await request.json();

    const prompt = `
      あなたは旅行プランナーです。日本を訪れる外国人観光客に対し、次の条件に基づいておすすめの観光地を提案してください:
      - 季節: ${season}
      - 場所: ${message}
      - アクティビティ: ${activity}
      - 予算: ${budget}
      - 天気: ${weather}
      これらを考慮して、適切な観光地を提案し、その理由を詳細に説明してください。
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: "gpt-4o mini",
    });

    const answer = completion.choices[0]?.message?.content || "No response available";
    return NextResponse.json({ response: answer });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'AIからの応答を取得できませんでした。' }, { status: 500 });
  }
}

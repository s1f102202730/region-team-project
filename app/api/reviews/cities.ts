// app/api/cities.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const url = 'https://api.e-stat.go.jp/rest/2.1/app/getCityList'; // 国土交通省の市区町村APIのURL
  const apiKey = process.env.API_KEY;  // 環境変数からAPIキーを取得

  const res = await fetch(`${url}?apikey=${apiKey}`);
  const data = await res.json();

  return NextResponse.json(data);
}

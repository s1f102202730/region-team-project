import { NextRequest, NextResponse } from "next/server";
import { searchRecommendations } from "@/lib/recommendations"; // ベクトル検索関数をインポート

export async function POST(req: NextRequest) {
    const { query } = await req.json();
    const results = await searchRecommendations(query);
    return NextResponse.json(results);
}

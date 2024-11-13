import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Papa from 'papaparse';

// Prisma Clientのインスタンス作成
const prisma = new PrismaClient();

// POSTリクエスト用のエクスポート
export async function POST(req: Request){
  try {
    const formData = await req.formData()
    const file = formData.get('file') as Blob | null;

    if (!file) {
      return NextResponse.json({ error: 'ファイルが選択されていません。' }, { status: 400 });
    }

    // ファイルの内容を読み取る
    const text = await file.text();
    const records = Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
    }).data;

    // データベースに各レコードを保存
    await Promise.all(
      records.map(async (record: any) => {
        await prisma.touristSpot.create({
          data: {
            name: record.name,
            location: record.location,
          },
        });
      })
    );

    return NextResponse.json({ message: 'CSVファイルが正常に処理されました。' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'ファイルのアップロード中にエラーが発生しました。' }, { status: 500 });
  }
}

// Next.js APIルート設定
export const config = {
  api: {
    bodyParser: false, // デフォルトのボディパーサーを無効化
  },
};

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Papa from 'papaparse';
const prisma = new PrismaClient();
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob | null;
    if (!file) {
      return NextResponse.json({ error: 'ファイルが選択されていません。' }, { status: 400 });
    }
    const text = await file.text();
    const records = Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
    }).data;
    // データベースに保存し、保存したレコードのIDを収集
    const savedRecords = await Promise.all(
      records.map(async (record: any) => {
        const savedRecord = await prisma.touristSpot.create({
          data: {
            name: record.name,
            address: record.address,
            access: record.access,
            availableDays: record.availableDays,
            startTime: record.startTime,
            endTime: record.endTime,
            latitude: record.latitude,
            longitude: record.longitude,
            explanation: record.explanation,
          },
        });
        return savedRecord; // 保存したレコードを返す
      })
    );
    return NextResponse.json({
      message: 'CSVファイルが正常に処理されました。',
      data: savedRecords, // 保存されたデータを含める
    });
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



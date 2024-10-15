// app/api/reviews.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';  // Prismaクライアントのインポート

export async function POST(req: Request) {
  const {
    cityCode,
    touristSpotId,
    overallSatisfaction,
    infrastructure,
    safety,
    accessibility,
    serviceQuality,
    regionalCharm,
    informationAccess,
    revisitIntent,
  } = await req.json();

  const session = await getSession();  // セッションからユーザーIDを取得
  if (!session) {
    return NextResponse.error({ status: 401, statusText: 'Unauthorized' });
  }

  const userId = session.user.id;

  const review = await prisma.review.create({
    data: {
      userId,
      touristSpotId: parseInt(touristSpotId),
      overallSatisfaction,
      infrastructure,
      safety,
      accessibility,
      serviceQuality,
      regionalCharm,
      informationAccess,
      revisitIntent,
    },
  });

  return NextResponse.json(review);
}

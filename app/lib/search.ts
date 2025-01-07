import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * ベクトル検索を実行し、観光スポットを取得する
 * @param {number[]} queryVector - 検索に使用するベクトル
 * @param {number} topK - 上位K件の結果を取得
 * @returns {Promise<any[]>} - 検索結果
 */
export async function searchTouristSpots(queryVector: number[], topK: number = 5): Promise<any[]> {
  try {
    const results = await prisma.$queryRawUnsafe<any[]>(
      `
      SELECT id, name, explanation, vector <=> $1 AS distance
      FROM "Embedding"
      JOIN "TouristSpot" ON "Embedding".touristSpotId = "TouristSpot".id
      ORDER BY distance ASC
      LIMIT $2;
      `,
      queryVector,
      topK
    );
    return results;
  } catch (error) {
    console.error('Error performing vector search:', error);
    throw new Error('Failed to search for tourist spots');
  }
}

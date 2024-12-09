import prisma from "@/lib/prisma"; // Prismaクライアントをインポート
import { generateEmbedding } from "@/lib/embedding"; // OpenAI APIを利用する関数をインポート


async function searchRecommendations(query) {
    const embedding = await generateEmbedding(query);
    const result = await prisma.$queryRaw`
        SELECT id, name, description
        FROM recommendations
        ORDER BY embedding <-> ${Buffer.from(embedding)} ASC
        LIMIT 5
    `;
    return result;
}

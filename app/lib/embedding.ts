import { Configuration, OpenAIApi } from "openai";
import prisma from "@prisma/client";

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

async function generateEmbedding(text) {
    const response = await openai.createEmbedding({
        model: "text-embedding-ada-002",
        input: text,
    });
    return response.data.data[0].embedding;
}

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { getPineconeVectorStore } from "./vector-store";

export async function askRAG(query: string) {
    const vectorStore = await getPineconeVectorStore();

    // 1. Cari dokumen relevan
    const results = await vectorStore.similaritySearch(query, 3); 
    if (results.length === 0) {
        return "Maaf, saya tidak menemukan informasi yang relevan terkait pertanyaan yang anda berikan.";
    }
    // 2. Gabungkan hasil jadi context
    const context = results.map(
        (doc, i) => `(${i + 1}) ${doc.pageContent}`
    ).join("\n");

    // 3. Prompt ke Gemini
    const llm = new ChatGoogleGenerativeAI({
        apiKey: process.env.GEMINI_API_KEY!,
        model: "gemini-1.5-pro"
    });

    const prompt = `
    Kamu adalah asisten sistem kesehatan. Jawab pertanyaan user berdasarkan data berikut:

    ${context}

    Pertanyaan: ${query}
    Jawaban:
    `;

    const response = await llm.invoke(prompt);
    return response.content;
}

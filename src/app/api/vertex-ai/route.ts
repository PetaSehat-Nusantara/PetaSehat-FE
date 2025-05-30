import { NextRequest } from "next/server";
import { getPineconeVectorStore } from "@/lib/vector-store";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export async function POST(req: NextRequest) {
  // 1. Validasi format JSON
  let body: { prompt?: string } | undefined;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({
        error: "Format permintaan tidak valid. Silakan kirim pertanyaan Anda dengan benar.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // 2. Validasi prompt
  const prompt = body?.prompt;
  if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
    return new Response(
      JSON.stringify({
        error: "Pertanyaan tidak boleh kosong. Silakan masukkan pertanyaan Anda.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // 3. Cek API Key
  if (!process.env.GEMINI_API_KEY) {
    return new Response(
      JSON.stringify({
        error: "Konfigurasi sistem belum lengkap. Silakan hubungi admin (API Key tidak ditemukan).",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  // 4. Ambil vector store (Pinecone)
  let vectorStore;
  try {
    vectorStore = await getPineconeVectorStore();
  } catch (err) {
    console.error("Pinecone connection error:", err);
    return new Response(
      JSON.stringify({
        error: "Sistem sedang mengalami gangguan pada database. Silakan coba beberapa saat lagi.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  // 5. Cari dokumen relevan
  let results;
  try {
    results = await vectorStore.similaritySearch(prompt, 3);
  } catch (err) {
    console.error("Pinecone search error:", err);
    return new Response(
      JSON.stringify({
        error: "Terjadi kesalahan saat mencari data. Silakan coba beberapa saat lagi.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!results || results.length === 0) {
    console.warn("No relevant documents found for prompt:", prompt);
    return new Response(
      JSON.stringify({
        error:
          "Maaf, saya tidak menemukan informasi yang relevan untuk pertanyaan Anda. Silakan coba pertanyaan lain atau gunakan kata kunci berbeda.",
      }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  // 6. Gabungkan context
  const context = results
    .map((doc, i) => `(${i + 1}) ${doc.pageContent}`)
    .join("\n");

  // 7. Buat prompt untuk LLM
  let llm;
  try {
    llm = new ChatGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY!,
      model: "gemini-1.5-pro",
    });
  } catch (err) {
    console.error("LLM init error:", err);
    return new Response(
      JSON.stringify({
        error: "Sistem AI sedang tidak tersedia. Silakan coba beberapa saat lagi.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  const fullPrompt = `
Kamu adalah asisten sistem kesehatan. Jawab pertanyaan user berdasarkan data berikut:

${context}

Pertanyaan: ${prompt}
Jawaban:
  `;

  // 8. Dapatkan jawaban dari LLM
  let response;
  try {
    response = await llm.invoke(fullPrompt);
  } catch (err) {
    console.error("LLM invoke error:", err);
    return new Response(
      JSON.stringify({
        error: "Sistem AI sedang mengalami gangguan. Silakan coba beberapa saat lagi.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  // 9. Sukses
  return new Response(
    JSON.stringify({ response: response.content }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

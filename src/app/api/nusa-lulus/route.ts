import { NextRequest } from "next/server";
import { getPineconeVectorStore } from "@/lib/vector-store";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// Utility: Bersihkan code block, koma akhir, dan array tidak lengkap
function cleanJsonString(str: string): string {
  let s = str
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  // Hilangkan koma di akhir elemen array/objek
  s = s.replace(/,\s*([\]}])/g, "$1");

  // Jika array tidak ditutup, tambahkan ]
  if (s.match(/^\s*\[/) && !s.trim().endsWith("]")) {
    s = s.trim() + "]";
  }

  return s;
}

export async function POST(req: NextRequest) {
  let body: { provinsi?: string } | undefined;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Format permintaan tidak valid." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const provinsi = body?.provinsi || "nasional";
  const query = `Daftar lengkap semua dokumen, izin, dan persyaratan yang dibutuhkan untuk pembangunan fasilitas kesehatan di provinsi ${provinsi} beserta detailnya (nama, persyaratan, estimasi waktu, estimasi biaya, otoritas penerbit, kategori, prioritas).`;

  // 1. Ambil vector store
  let vectorStore;
  try {
    vectorStore = await getPineconeVectorStore();
  } catch {
    return new Response(
      JSON.stringify({ error: "Database error." }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  // 2. Cari chunk relevan (top 5)
  let results;
  try {
    results = await vectorStore.similaritySearch(query, 5);
  } catch {
    return new Response(
      JSON.stringify({ error: "Pencarian data gagal." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!results || results.length === 0) {
    return new Response(
      JSON.stringify({ error: "Tidak ditemukan data dokumen relevan." }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  // 3. Gabungkan context
  const context = results.map((doc) => doc.pageContent).join("\n");

  // 4. Prompt ke LLM untuk format JSON
  const prompt = `
Kamu adalah Nusa, asisten digital perizinan infrastruktur kesehatan. Berdasarkan data berikut, buatkan array JSON berisi daftar dokumen/izin yang dibutuhkan untuk pembangunan fasilitas kesehatan di provinsi ${provinsi}. 
Setiap item harus punya: id, name, requirements (array), estimatedTime, estimatedCost, authority, category, priority.
Jawaban HARUS berupa array JSON valid tanpa penjelasan apapun, tanpa koma di akhir elemen, dan tidak boleh ada duplikasi key. Jika data tidak lengkap, isi string kosong.

Data referensi (potongan chunk, bisa dari berbagai provinsi, filter dan rangkum hanya untuk provinsi ${provinsi}):
${context}
`;

  let llm: ChatGoogleGenerativeAI;
  try {
    llm = new ChatGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY!,
      model: "gemini-1.5-pro",
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "Sistem AI tidak tersedia." }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  let response: unknown;
  try {
    response = await llm.invoke(prompt);
    // Log untuk debugging
    console.log("AI response raw:", response);
  } catch {
    return new Response(
      JSON.stringify({ error: "Gagal mendapatkan jawaban dari AI." }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  // 5. Ambil hanya array JSON dari response
  let contentStr = "";
  if (
    typeof response === "object" &&
    response !== null &&
    "content" in response
  ) {
    const content = (response as { content: unknown }).content;
    if (typeof content === "string") {
      contentStr = content;
    } else if (Array.isArray(content)) {
      contentStr = content
        .map((c) =>
          typeof c === "string"
            ? c
            : typeof c === "object" && c !== null && "text" in c && typeof c.text === "string"
            ? c.text
            : ""
        )
        .join(" ");
    } else if (typeof content === "object" && content !== null && "text" in content) {
      contentStr = (content as { text?: string }).text ?? "";
    }
  }

  // Clean code block and extract JSON array
  contentStr = cleanJsonString(contentStr);

  // Try to find the array
  const match = contentStr.match(/\[([\s\S]*?)\]/); // <-- use const here
  let documents: unknown[] = [];
  if (match) {
    try {
      documents = JSON.parse(match[0]);
    } catch (e) {
      // Coba parse seluruh string jika match gagal
      try {
        documents = JSON.parse(contentStr);
      } catch { // <-- use _ if you don't use the error
        // Log error dan hasil mentah untuk debugging
        console.error("Gagal parse JSON:", e, "\nRaw:", contentStr);
        return new Response(
          JSON.stringify({ error: "Format data tidak valid.", raw: contentStr }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }
  } else {
    // Try to parse the whole string as array
    try {
      documents = JSON.parse(contentStr);
    } catch (e) {
      // Log error dan hasil mentah untuk debugging
      console.error("Gagal parse JSON:", e, "\nRaw:", contentStr);
      return new Response(
        JSON.stringify({ error: "AI tidak mengembalikan data dokumen.", raw: contentStr }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  return new Response(JSON.stringify({ documents }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

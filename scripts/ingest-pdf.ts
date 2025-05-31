import 'dotenv/config';


import * as fs from "fs";
import * as path from "path";
import pdfParse from "pdf-parse";
import { getPineconeVectorStore } from "../src/lib/vector-store";

// Fungsi ekstrak teks dari PDF
async function extractTextFromPDF(filePath: string): Promise<string> {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text.replace(/\s+/g, " ").trim();
}

// Fungsi chunking teks
function chunkText(text: string, chunkSize = 1000): string[] {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
}

// Fungsi utama ingest satu PDF
async function ingestPDFtoPinecone(pdfPath: string, metadata: any) {
  const text = await extractTextFromPDF(pdfPath);
  const chunks = chunkText(text, 1000);

  const vectorStore = await getPineconeVectorStore();

  const documents = chunks.map((chunk, i) => ({
    pageContent: chunk,
    metadata: {
      ...metadata,
      chunk: i,
      id: `${metadata.id || "pdf"}-${i}`,
    },
  }));

  await vectorStore.addDocuments(documents);
  console.log(`✅ PDF '${metadata.judul}' selesai di-ingest ke Pinecone!`);
}

// Main script untuk semua PDF di folder
async function main() {
  console.log("=== MULAI SCRIPT INGEST PDF ===");
  
  
  
  if (!process.env.PINECONE_INDEX_NAME) {
    console.error("❌ PINECONE_INDEX_NAME tidak ditemukan di .env");
    process.exit(1);
  }

  const pdfDir = path.join(process.cwd(),"public", "data", "pdf");
  console.log("Looking for PDFs in:", pdfDir);
  console.log("PDF DIR:", pdfDir);
  const files = fs.readdirSync(pdfDir).filter(f => f.endsWith(".pdf"));
  console.log("Files found:", files);
  console.log("FILES:", files);


  for (const file of files) {
    const filePath = path.join(pdfDir, file);
    const judul = file.replace(/\.pdf$/i, "");
    await ingestPDFtoPinecone(filePath, {
      judul,
      sumber: `/data/pdf/${file}`,
      id: judul,
    });
  }
}

main().catch(err => {
  console.error("❌ Ingest PDF error:", err);
  process.exit(1);
});

import fs from "fs";
import pdfParse from "pdf-parse";
import { getPineconeVectorStore } from "./vector-store";

export async function extractTextFromPDF(filePath: string): Promise<string> {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
}

export function chunkText(text: string, chunkSize = 1000): string[] {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
}

export async function ingestPDFtoPinecone(
  pdfPath: string,
  metadata: { judul: string; sumber: string; id: string }
) {
  const text = await extractTextFromPDF(pdfPath);
  const chunks = chunkText(text, 1000);

  const vectorStore = await getPineconeVectorStore();

  for (const [i, chunk] of chunks.entries()) {
    await vectorStore.addDocuments([
      {
        pageContent: chunk,
        metadata: {
          ...metadata,
          chunk: i,
          id: `${metadata.id || "pdf"}-${i}`,
        },
      },
    ]);
  }
}

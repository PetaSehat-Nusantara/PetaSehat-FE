import { Pinecone } from '@pinecone-database/pinecone';

let pinecone: Pinecone | null = null;

export function getPinecone() {
  if (!pinecone) {
    if (!process.env.PINECONE_API_KEY) {
      throw new Error("PINECONE_API_KEY is not set");
    }
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
  }
  return pinecone;
}

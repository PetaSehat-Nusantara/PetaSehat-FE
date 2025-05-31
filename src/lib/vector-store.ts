import { PineconeStore } from "@langchain/community/vectorstores/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { getPinecone } from "./pinecone";

export async function getPineconeVectorStore() {
  const pinecone = getPinecone();
  if (!process.env.PINECONE_INDEX_NAME) {
    throw new Error("PINECONE_INDEX_NAME is not set");
  }
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);

  const vectorStore = await PineconeStore.fromExistingIndex(
    new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GEMINI_API_KEY!,
    }),
    {
      pineconeIndex,
    }
  );

  return vectorStore;
}

import { PineconeStore } from "@langchain/community/vectorstores/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { pinecone } from "./pinecone";

export async function getPineconeVectorStore() {
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

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

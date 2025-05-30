import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';

dotenv.config();

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const index = pinecone.index(process.env.PINECONE_INDEX_NAME!);

async function queryVector() {
  const queryVector = Array(768).fill(0.5); // must match vector dimension

  const result = await index.query({
    vector: queryVector,
    topK: 3,
    includeMetadata: true,
  });

  console.log('📦 Retrieved Matches:\n', JSON.stringify(result, null, 2));
}

queryVector();

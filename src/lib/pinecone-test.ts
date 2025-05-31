import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const index = pinecone.index(process.env.PINECONE_INDEX_NAME!);


const exampleVector = {
  id: 'test-id-1',
  values: Array(768).fill(0.5),
  metadata: { text: 'Hello world!' },
};

export async function testPinecone() {
  await index.upsert([exampleVector]);

  const queryResult = await index.query({
    vector: exampleVector.values,
    topK: 1,
    includeMetadata: true,
  });

  console.log('Query Result:', queryResult);
}
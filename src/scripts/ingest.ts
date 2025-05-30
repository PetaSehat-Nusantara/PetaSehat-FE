import fs from 'fs';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { getPineconeVectorStore } from '../lib/vector-store';

async function run() {
  const rawText = fs.readFileSync('data/regulasi_kesehatan.txt', 'utf-8');
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docs = await splitter.createDocuments([rawText]);
  const vectorStore = await getPineconeVectorStore();
  await vectorStore.addDocuments(docs);

  console.log('✅ Data berhasil dimasukkan ke Pinecone');
}

run();

import { getPineconeVectorStore } from "@/lib/vector-store";

async function search() {
  const store = await getPineconeVectorStore();
  const result = await store.similaritySearch("Apa saja syarat pembangunan rumah sakit", 3);
  console.log(result.map((r: { pageContent: unknown; }) => r.pageContent));
}

search();

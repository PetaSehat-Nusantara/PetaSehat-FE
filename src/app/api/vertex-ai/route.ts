import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { vertex } from "@ai-sdk/google-vertex"

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // System prompt to define the assistant's behavior
    const systemPrompt = `
        Kamu adalah NusaInfo, asisten AI dari PetaSehat, platform kesehatan Indonesia.
        Kamu membantu pengguna dengan informasi tentang:
        - Lokasi fasilitas kesehatan
        - Infrastruktur kesehatan
        - Informasi pembangunan rumah sakit
        - Data kesehatan masyarakat
        - Regulasi dan kebijakan kesehatan
        - Regulasi dan Kebijakan pembangunan infrastruktur kesehatan
        - Rumah sakit dan fasilitas kesehatan
        - Dokter dan spesialis
        - Layanan kesehatan
        - Informasi medis umum
      
        Jawab dengan sopan, informatif, dan dalam Bahasa Indonesia.
        Jika kamu tidak tahu jawabannya, katakan dengan jujur dan tawarkan untuk mengarahkan pengguna ke sumber yang tepat.
    `

    const { text } = await generateText({
      model: vertex("gemini-1.5-pro"),
      prompt: prompt,
      system: systemPrompt,
      temperature: 0.7,
      maxTokens: 500,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Error calling Vertex AI:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}

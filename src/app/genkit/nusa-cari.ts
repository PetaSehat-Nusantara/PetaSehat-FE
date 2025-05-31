'use server';
import { gemini15Flash, googleAI } from '@genkit-ai/googleai';
import { genkit, z } from 'genkit';

const ai = genkit({
  plugins: [googleAI()],
});

export const healthCheck = ai.defineFlow(
  {
    name: 'healthCheck',
    inputSchema: z.object({ data: z.string() }),
    outputSchema: z.object({ message: z.string() }),
    streamSchema: z.string(),
  },
  async ({ data }) => {
    const response = await ai.generate({
      model: gemini15Flash,
      prompt: `This is a health check, say something funny about ${data} if you are alive.`,
    });

    const { text } = response;
    return { message: text };
  }
);

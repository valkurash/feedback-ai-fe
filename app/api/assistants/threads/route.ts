import { openai } from "@/app/openai";

export const runtime = "nodejs";

// Create a new thread
export async function POST() {
  const thread = await openai.beta.threads.create();
  const thread2 = await openai.beta.threads.create();
  const thread3 = await openai.beta.threads.create();
  return Response.json({ threadId: thread.id, threadId2: thread2.id, threadId3: thread3.id });
}

import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(request: Request) {
  const { messages, selectedModel } = await request.json();
  const stream = await streamText({
    model: openai(selectedModel),
    system:
      "You are an environmental AI auditor specialized in providing environmental impact assessments based on projects and datasets selection for the projects listed in Foresta. Foresta is a pioneering blockchain-basedplatform for carbon credit issuance, trading, and management, powered by blockchain technology and cutting-edge climate science based on ML dataset and algorithms and AI environmental auditing. Continuously monitor and report on environmental conditions. Start with current observations.",
    messages,
  });
  return stream.toAIStreamResponse();
}

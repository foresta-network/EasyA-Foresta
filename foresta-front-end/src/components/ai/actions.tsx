"use server";
import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { ReactNode } from "react";
import { z } from "zod";
import { nanoid } from "nanoid";
import { ReportComponent } from "@/components/ai/audit-report-component";
import { generateObject } from "ai";
import { auditReportSchema, AuditReport } from "@/components/ai/audit-report";

export interface ServerMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ClientMessage {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;
}

export async function continueConversation(
  input: string,
  selectedModel: string
): Promise<ClientMessage> {
  "use server";

  const history = getMutableAIState();

  const result = await streamUI({
    model: openai(selectedModel),
    messages: [...history.get(), { role: "user", content: input }],
    text: async ({ content, done }) => {
      if (done) {
        history.done((messages: ServerMessage[]) => [
          ...messages,
          { role: "assistant", content },
        ]);
      }
    
      const response = await fetch("https://agents.phala.network/ipfs/QmRkswy2fxnm1oukMtj5CFv2n9Rf5mtqLsAjKCk7p6wg28", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "POST",
          path: "ipfs://QmRkswy2fxnm1oukMtj5CFv2n9Rf5mtqLsAjKCk7p6wg28",
          queries: {
            chatQuery: [content],
            openAiModel: [selectedModel],
          },
          secret: { openaiApiKey: process.env.OPENAI_API_KEY },
          headers: {},
        }),
      });
    
      console.log("Response from Phala AI Agent:", response);
    
      const responseData = await response.json();
      console.log("Response data from Phala AI Agent:", responseData);
    
      return <div dangerouslySetInnerHTML={{ __html: responseData.body }} />;
    },
    tools: {
      generateReport: {
        description: "Generate an environmental audit report",
        parameters: z.object({
          project: z.string().describe("the project name"),
          dataset: z.string().describe("the dataset to analyze"),
        }),
        generate: async function* ({ project, dataset }) {
          yield <div>Loading report...</div>;
          const report = await generateObject({
            model: openai('gpt-4'),
            schema: auditReportSchema,
            prompt: `Generate an environmental audit report for project ${project} using dataset ${dataset}.`,
          });
          return <ReportComponent report={report.object as AuditReport} />;
        },
      },
    },
  });

  return {
    id: nanoid(),
    role: "assistant",
    display: result.value,
  };
}

export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    continueConversation,
  },
  initialAIState: [],
  initialUIState: [],
});
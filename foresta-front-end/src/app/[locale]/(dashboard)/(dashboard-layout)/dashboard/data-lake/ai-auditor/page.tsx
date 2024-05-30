"use client";
import { useState } from "react";
import { ClientMessage } from "@/components/ai/actions";
import { useActions, useUIState } from "ai/rsc";
import { nanoid } from "nanoid";
import { AiAuditInterface } from "@/components/ai/index";
import { AI } from "@/components/ai/actions";

export default function AiDashboard() {
  const [input, setInput] = useState<string>("");
  const [conversation, setConversation] = useUIState<typeof AI>();
  const { continueConversation } = useActions();
  const [selectedModel, setSelectedModel] = useState<string>("gpt-4o");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInput("");
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      { id: nanoid(), role: "user", display: input },
    ]);
    const message = await continueConversation(input, selectedModel);
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      message,
    ]);
  };

  return (
    <div className="flex flex-col min-h-screen">
    <main className="flex-1 bg-muted dark:bg-background">
      <div className="container mx-auto py-8">
        <div className="inline-flex justify-between w-full mb-4">
          <h2 className="text-2xl font-bold font-clash justify-start uppercase">
            Environmental Auditing
          </h2>
          <h3 className="text-2xl font-bold font-clash justify-end text-primary text-pretty">AI Agent</h3>
        </div>
        <AiAuditInterface
          conversation={conversation}
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />
      </div>
    </main>
  </div>
  );
}

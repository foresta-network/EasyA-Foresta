"use client";

import { AiAuditInterface } from "@/components/ai";

export default function AiAuditor() {


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
          <AiAuditInterface />
        </div>
      </main>
    </div>
  );
}
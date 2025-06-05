"use client";
import React from "react";
import { VoiceAgentClient } from "../../components/VoiceAgentClient";
import { Button } from "../../components/ui/button";

export default function VoiceAgentPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start text-center">
      {/* Hero Section */}
      <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-white px-4 pt-24 md:pt-36">
        <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-none tracking-tight md:text-6xl lg:text-7xl">
          Technology for a new era <br className="hidden md:inline" /> of media and storytelling.
        </h1>
        <p className="mt-6 max-w-2xl text-muted-foreground md:text-lg">
          Talk with our realtime AI agent to explore ideas, brainstorm stories and get creative
          inspiration in seconds.
        </p>
        <div className="mt-8 flex flex-col gap-4 md:flex-row">
          <Button className="px-8 py-3 text-base md:text-lg" onClick={() => {
            const connectBtn = document.getElementById("va-connect-btn");
            connectBtn?.click();
          }}>
            Start Talking
          </Button>
          <Button
            className="px-8 py-3 text-base md:text-lg border"
            onClick={() => window.open("https://github.com/openai/openai-agents-js", "_blank")}
          >
            Docs
          </Button>
        </div>
      </section>

      {/* Voice Agent Client */}
      <section className="my-16 w-full px-4">
        <VoiceAgentClient />
      </section>
    </main>
  );
} 
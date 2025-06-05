"use client";
// Import necessary React and Clerk components to enforce authentication
import React from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { VoiceAgentClient } from "@/components/VoiceAgentClient";

export default function VoiceAgentPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6">
      <h1 className="mb-6 text-3xl font-semibold">Voice Agent Demo</h1>

      <SignedIn>
        <VoiceAgentClient />
      </SignedIn>

      <SignedOut>
        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg">Please sign in to use the voice agent.</p>
          <SignInButton mode="modal" />
        </div>
      </SignedOut>
    </main>
  );
} 
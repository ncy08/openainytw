"use client";

import { Sidebar } from "@/components/ui/Sidebar";
import VoiceAgent, { VoiceAgentHandle } from "@/components/VoiceAgentClient";
import React, { useState, useRef } from "react";

export default function VoiceAgentPage() {
  const [connected, setConnected] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [userLevel, setUserLevel] = useState(0.2);
  const [agentLevel, setAgentLevel] = useState(0.1);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const agentRef = useRef<VoiceAgentHandle>(null);

  const handleConnect = () => {
    setConnected(true);
    setTimeout(() => {
      agentRef.current?.startListening();
      setIsActive(true);
    }, 100); // ensure VoiceAgent is mounted
  };

  const handleDisconnect = () => {
    agentRef.current?.stopListening();
    setConnected(false);
    setIsActive(false);
    setUserLevel(0.2);
    setAgentLevel(0.1);
  };

  // Handle new images from Vee
  const handleImageGenerated = (imageUrl: string) => {
    console.log("🖼️ New image generated:", imageUrl);
    setGeneratedImages((prev) => [imageUrl, ...prev]);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center relative bg-openai-gradient">
        {/* Subtle geometric background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #0f0f0f 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto px-8">
          {/* OpenAI-style minimalist heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium text-openai-heading mb-6 tracking-tight">
            Voice to Image
          </h1>

          <p className="text-xl md:text-2xl text-openai-body mb-12 max-w-lg mx-auto leading-relaxed">
            Create images with your voice using Vee, your AI creative assistant
          </p>

          {/* OpenAI-style minimalist button */}
          <button
            className={`
              relative px-8 py-4 rounded-full text-lg font-medium transition-all duration-300
              ${
                connected
                  ? "bg-foreground text-background hover:bg-muted-foreground"
                  : "bg-primary text-primary-foreground hover:bg-foreground hover:scale-105"
              }
              focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
              active:scale-95
            `}
            onClick={connected ? handleDisconnect : handleConnect}
          >
            {connected ? (
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-openai-pulse" />
                Disconnect
              </span>
            ) : (
              "Connect to Vee"
            )}
          </button>

          {/* OpenAI-style audio level meters */}
          {connected && isActive && (
            <div className="mt-12 flex gap-8 justify-center items-center">
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground text-sm font-medium">
                  You
                </span>
                <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-ring transition-all duration-100 rounded-full"
                    style={{ width: `${userLevel * 100}%` }}
                  />
                </div>
              </div>

              <div className="w-8 h-8 bg-ring rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-primary-foreground rounded-full animate-openai-pulse" />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-muted-foreground text-sm font-medium">
                  Vee
                </span>
                <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-ring transition-all duration-100 rounded-full"
                    style={{ width: `${agentLevel * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Voice Agent Component */}
          {connected && (
            <div className="mt-8">
              <VoiceAgent
                ref={agentRef}
                onImageGenerated={handleImageGenerated}
              />
            </div>
          )}

          {/* OpenAI-style Generated Images Gallery */}
          {generatedImages.length > 0 && (
            <div className="mt-16 w-full max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-medium text-openai-heading mb-3 tracking-tight">
                  Your creations
                </h2>
                <p className="text-muted-foreground">
                  {generatedImages.length} image
                  {generatedImages.length !== 1 ? "s" : ""} created with Vee
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generatedImages.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="group relative rounded-lg overflow-hidden bg-card border border-border hover:border-ring/50 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="aspect-square overflow-hidden bg-secondary">
                      <img
                        src={imageUrl}
                        alt={`AI generated image ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* OpenAI-style image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center gap-2 text-white text-sm">
                          <div className="w-2 h-2 bg-ring rounded-full" />
                          <span className="font-medium">Generated by Vee</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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
  const [stars, setStars] = useState<
    Array<{
      left: string;
      top: string;
      width: string;
      height: string;
      animationDelay: string;
      animationDuration: string;
    }>
  >([]);
  const agentRef = useRef<VoiceAgentHandle>(null);

  // Generate stars only on client side to avoid hydration mismatch
  React.useEffect(() => {
    const generatedStars = Array.from({ length: 50 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${Math.random() * 3 + 2}s`,
    }));
    setStars(generatedStars);
  }, []);

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
    <div className="flex h-screen bg-black text-white">
      <Sidebar />
      <div
        className="flex-1 flex flex-col items-center justify-center relative overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3), transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3), transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2), transparent 50%),
            black
          `,
        }}
      >
        {/* Animated stars */}
        <div className="absolute inset-0 overflow-hidden">
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse opacity-70"
              style={{
                left: star.left,
                top: star.top,
                width: star.width,
                height: star.height,
                animationDelay: star.animationDelay,
                animationDuration: star.animationDuration,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
          <h1
            className="text-6xl font-bold mb-6 animate-glow"
            style={{
              textShadow: "0 0 20px #fff, 0 0 40px #0ff, 0 0 60px #0ff",
            }}
          >
            Voice to Image
          </h1>

          <p
            className="text-xl mb-12 opacity-90"
            style={{
              textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
            }}
          >
            Create images with your voice using Vee, your AI creative assistant
          </p>

          <div
            className="text-3xl font-semibold px-12 py-4 rounded-full animate-glow cursor-pointer select-none text-white"
            style={{
              textShadow: `0 0 16px #fff, 0 0 32px ${
                connected ? "#ff0000" : "#0ff"
              }`,
              background: "transparent",
              boxShadow: "none",
              border: "none",
              outline: "none",
              transition: "transform 0.2s",
            }}
            tabIndex={0}
            role="button"
            onClick={connected ? handleDisconnect : handleConnect}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                connected ? handleDisconnect() : handleConnect();
              }
            }}
          >
            {connected ? "Disconnect" : "Connect"}
          </div>

          {/* Audio level meters */}
          {connected && isActive && (
            <div className="mt-8 flex gap-6 justify-center items-center">
              <div className="flex items-center gap-2">
                <span className="text-blue-400 text-sm">You</span>
                <div className="w-32 h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-100"
                    style={{ width: `${userLevel * 100}%` }}
                  />
                </div>
              </div>

              <div className="text-cyan-400 text-2xl">🎤</div>

              <div className="flex items-center gap-2">
                <span className="text-purple-400 text-sm">Vee</span>
                <div className="w-32 h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-100"
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

          {/* Generated Images Gallery */}
          {generatedImages.length > 0 && (
            <div className="mt-12 w-full max-w-6xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2 text-cyan-400">
                  ✨ Your AI Creations ✨
                </h2>
                <p className="text-gray-300">
                  {generatedImages.length} image
                  {generatedImages.length !== 1 ? "s" : ""} created with Vee
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generatedImages.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="group relative rounded-xl overflow-hidden shadow-2xl border border-cyan-400/20 hover:border-cyan-400/60 transition-all duration-300 hover:scale-105"
                  >
                    <div className="aspect-square overflow-hidden bg-gray-900">
                      <img
                        src={imageUrl}
                        alt={`AI generated image ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>

                    {/* Image overlay with actions */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <button
                          onClick={() => window.open(imageUrl, "_blank")}
                          className="bg-cyan-500/80 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm"
                        >
                          🔍 View Full
                        </button>
                        <button
                          onClick={() => {
                            const link = document.createElement("a");
                            link.href = imageUrl;
                            link.download = `vee-creation-${index + 1}.png`;
                            link.click();
                          }}
                          className="bg-purple-500/80 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm"
                        >
                          💾 Download
                        </button>
                      </div>
                    </div>

                    {/* Image number badge */}
                    <div className="absolute top-3 left-3 bg-black/70 text-cyan-400 px-2 py-1 rounded-full text-xs font-mono">
                      #{generatedImages.length - index}
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear all button */}
              {generatedImages.length > 1 && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => setGeneratedImages([])}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg text-sm transition-colors border border-red-500/30"
                  >
                    🗑️ Clear All Images
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

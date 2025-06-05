"use client";

import { Sidebar } from "@/components/ui/Sidebar";
import VoiceAgent from "@/components/VoiceAgentClient";
import React, { useState } from "react";

export default function VoiceAgentPage() {
  const [connected, setConnected] = useState(false);

  return (
    <div className="min-h-screen flex bg-black text-white" style={{ backgroundImage: 'url(/stars.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Sidebar className="bg-black text-white border-black" />
      <main className="flex-1 flex flex-col items-center justify-center relative bg-black text-white">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-8 py-16 bg-black text-white">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-center drop-shadow-lg" style={{textShadow: '0 0 32px #fff, 0 0 64px #0ff'}}>
            Voice to Image
          </h1>
          <p className="text-lg text-gray-200 mb-8 text-center max-w-xl">
            Edit images with your voice.
          </p>
          <div
            className="text-3xl font-semibold px-12 py-4 rounded-full animate-glow cursor-pointer select-none text-white"
            style={{
              textShadow: '0 0 16px #fff, 0 0 32px #0ff',
              background: 'transparent',
              boxShadow: 'none',
              border: 'none',
              outline: 'none',
              transition: 'transform 0.2s',
            }}
            tabIndex={0}
            role="button"
            onClick={() => setConnected(true)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setConnected(true); }}
          >
            Connect
          </div>
          {connected && (
            <div className="w-full mt-12 bg-black text-white">
              <VoiceAgent />
            </div>
          )}
        </div>
      </main>
      <style jsx global>{`
        .animate-glow {
          animation: glow 2s ease-in-out infinite alternate;
        }
        @keyframes glow {
          from {
            text-shadow: 0 0 16px #fff, 0 0 32px #0ff;
            color: #fff;
          }
          to {
            text-shadow: 0 0 32px #0ff, 0 0 64px #0ff;
            color: #fff;
          }
        }
        body, html {
          background: #000 !important;
          color: #fff !important;
        }
      `}</style>
    </div>
  );
}

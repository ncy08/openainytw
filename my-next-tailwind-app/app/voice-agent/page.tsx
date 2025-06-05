"use client";

import { Sidebar } from "@/components/ui/Sidebar";
import VoiceAgent, { VoiceAgentHandle } from "@/components/VoiceAgentClient";
import React, { useRef, useState } from "react";
import { Mic } from "lucide-react";

export default function VoiceAgentPage() {
  const agentRef = useRef<VoiceAgentHandle>(null);
  const [connected, setConnected] = useState(false);
  const [isActive, setIsActive] = useState(false);
  // For demo: fake volume levels
  const [userLevel, setUserLevel] = useState(0.2);
  const [agentLevel, setAgentLevel] = useState(0.1);

  const handleConnect = () => {
    setConnected(true);
    setTimeout(() => {
      agentRef.current?.startListening();
      setIsActive(true);
    }, 100); // ensure VoiceAgent is mounted
  };

  // TODO: Replace with real volume levels from VoiceAgent
  React.useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setUserLevel(Math.random());
      setAgentLevel(Math.random());
    }, 400);
    return () => clearInterval(interval);
  }, [isActive]);

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
          {!connected && (
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
              onClick={handleConnect}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleConnect(); }}
            >
              Connect
            </div>
          )}
          {connected && (
            <>
              <div className="flex items-center gap-6 mb-8">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-blue-400 text-xs">You</span>
                  <div className="w-4 h-24 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="w-full bg-blue-400 transition-all duration-100"
                      style={{ 
                        height: `${Math.min(userLevel * 100, 100)}%`,
                        marginTop: `${Math.max(100 - userLevel * 100, 0)}%`
                      }} 
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-purple-400 text-xs">Agent</span>
                  <div className="w-4 h-24 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="w-full bg-purple-400 transition-all duration-100"
                      style={{ 
                        height: `${Math.min(agentLevel * 100, 100)}%`,
                        marginTop: `${Math.max(100 - agentLevel * 100, 0)}%`
                      }} 
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-gray-400 text-xs">Mic</span>
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-900 border border-gray-700">
                    <Mic className="text-cyan-400 w-8 h-8" />
                  </div>
                </div>
              </div>
              <div className="w-full mt-4 bg-black text-white">
                <VoiceAgent ref={agentRef} />
              </div>
            </>
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

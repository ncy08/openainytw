"use client";

import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { RealtimeAgent, RealtimeSession } from "@openai/agents-realtime";

export interface VoiceAgentHandle {
  startListening: () => void;
  stopListening: () => void;
}

const VoiceAgent = forwardRef<VoiceAgentHandle, {}>(function VoiceAgent({}, ref) {
  const sessionRef = useRef<RealtimeSession | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [agentStatus, setAgentStatus] = useState<string>("Idle");
  const [transcript, setTranscript] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Start microphone and stream audio to agent
  const startListening = async () => {
    setError("");
    setAgentStatus("Requesting mic...");
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsListening(true);
      setAgentStatus("Connecting to agent...");
      const agent = new RealtimeAgent({
        name: 'Assistant',
        instructions: 'You are a helpful AI assistant. Keep responses conversational and concise.',
        voice: 'shimmer',
      });
      const session = new RealtimeSession(agent, {
        model: 'gpt-4o-realtime-preview-2025-06-03',
        config: {
          turnDetection: {
            type: 'semantic_vad',
            eagerness: 'medium',
            create_response: true,
            interrupt_response: true,
          },
        },
      });
      sessionRef.current = session;
      setAgentStatus("Getting connection key...");
      const keyRes = await fetch('/api/ephemeral-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!keyRes.ok) throw new Error('Failed to get connection key');
      const { client_secret } = await keyRes.json();
      await session.connect({ apiKey: client_secret.value });
      setAgentStatus("Listening...");
      session.on("history_added", (item: any) => {
        console.debug("history_added", { type: item.type, role: item.role, status: item.status });
        if (item.role === "user" && item.content?.[0]?.type === "input_audio") {
          setTranscript(item.content[0].transcript ?? "");
        }
      });
      session.on("audio", (event: any) => {
        if (!audioPlayerRef.current) return;
        try {
          const audioBlob = new Blob([event.data], { type: "audio/mpeg" });
          const url = URL.createObjectURL(audioBlob);
          audioPlayerRef.current.src = url;
          audioPlayerRef.current.play();
          setAgentStatus("Speaking...");
          audioPlayerRef.current.onended = () => {
            setAgentStatus("Listening...");
            URL.revokeObjectURL(url);
          };
        } catch (e) {
          console.debug("Audio playback error", e);
        }
      });
      session.on("error", (e: any) => {
        setError("Agent error. Please try again.");
        setAgentStatus("Error");
      });
    } catch (err) {
      setError("Failed to connect to agent. Please try again.");
      setAgentStatus("Error");
      console.debug("Connection error:", err);
    }
  };

  const stopListening = () => {
    setIsListening(false);
    setAgentStatus("Idle");
    setTranscript("");
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
  };

  useImperativeHandle(ref, () => ({ startListening, stopListening }), []);

  useEffect(() => {
    return () => {
      stopListening();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-4 rounded-lg border bg-black text-white shadow-md flex flex-col items-center gap-4">
      <h2 className="text-lg font-semibold mb-2">Voice Agent</h2>
      <div className="w-full text-sm text-white flex flex-col gap-1">
        <span>Status: <b>{agentStatus}</b></span>
        {transcript && (
          <span className="italic text-gray-300">You: {transcript}</span>
        )}
        {error && (
          <span className="text-red-400">{error}</span>
        )}
      </div>
      <audio ref={audioPlayerRef} hidden />
    </div>
  );
});

export default VoiceAgent;

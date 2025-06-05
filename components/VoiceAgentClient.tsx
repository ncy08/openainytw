"use client";

import React, { useState } from "react";
import { RealtimeAgent, RealtimeSession } from "@openai/agents/realtime";
import { Button } from "./ui/button";

const VoiceAgentClient: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [session, setSession] = useState<any>(null);

  async function handleClick() {
    if (running && session) {
      (session as any).disconnect?.();
      setRunning(false);
      return;
    }

    const agent = new RealtimeAgent({
      name: "Assistant",
      instructions: "You are a helpful assistant.",
    });

    const newSession = new RealtimeSession(agent);        // <- no extra args
    setSession(newSession);

    // fetch short-lived client key from our /api/realtime-token route
    const res = await fetch("/api/realtime-token");
    const { token } = await res.json();

    // single call is all that's needed – WebRTC + mic handled internally
    await newSession.connect({ apiKey: token /* , useInsecureApiKey: true */ });

    setRunning(true);
  }

  return (
    <Button onClick={handleClick}>
      {running ? "Disconnect" : "Connect"}
    </Button>
  );
};

export { VoiceAgentClient };
export default VoiceAgentClient; 
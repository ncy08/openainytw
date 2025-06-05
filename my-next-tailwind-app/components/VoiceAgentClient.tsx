"use client";

import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  RealtimeAgent,
  RealtimeSession,
  tool,
  RealtimeItem,
} from "@openai/agents-realtime";
import { z } from "zod";

export interface VoiceAgentHandle {
  startListening: () => void;
  stopListening: () => void;
  mute: () => void;
  unmute: () => void;
  isMuted: () => boolean;
}

interface VoiceAgentProps {
  onImageGenerated?: (imageUrl: string) => void;
}

// DALL-E image generation tool factory
const createDalleImageTool = (onImageGenerated?: (imageUrl: string) => void) =>
  tool({
    name: "generate_image",
    description:
      "Generate an image using GPT Image 1 (advanced multimodal model) based on user description. This model has excellent instruction following and contextual awareness.",
    parameters: z.object({
      prompt: z.string().describe("The detailed image description to generate"),
      size: z
        .enum(["1024x1024", "1792x1024", "1024x1792"])
        .optional()
        .default("1024x1024"),
      quality: z.enum(["standard", "hd"]).optional().default("standard"),
      style: z.enum(["vivid", "natural"]).optional().default("vivid"),
    }),
    async execute({
      prompt,
      size = "1024x1024",
      quality = "standard",
      style = "vivid",
    }) {
      try {
        console.log("🎨 Generating image with GPT Image 1...", {
          prompt,
          size,
          quality,
          style,
        });

        const response = await fetch("/api/generate-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, size, quality, style }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Image generation failed:", errorText);
          throw new Error(`Failed to generate image: ${response.status}`);
        }

        const { imageUrl, revisedPrompt } = await response.json();
        console.log("✅ Image generated successfully:", imageUrl);

        // Notify parent component about the new image
        if (onImageGenerated && imageUrl) {
          onImageGenerated(imageUrl);
        }

        return `Perfect! I've created your image using GPT Image 1${
          revisedPrompt
            ? `. The model interpreted your request as: "${revisedPrompt}"`
            : ""
        }. The image has been added to your gallery below!`;
      } catch (error) {
        console.error("Image generation error:", error);
        return "I'm sorry, I had trouble generating that image. Could you try describing it a bit differently?";
      }
    },
  });

const VoiceAgent = forwardRef<VoiceAgentHandle, VoiceAgentProps>(
  function VoiceAgent({ onImageGenerated }, ref) {
    const sessionRef = useRef<RealtimeSession | null>(null);
    const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
    const [agentStatus, setAgentStatus] = useState<string>("Idle");
    const [transcript, setTranscript] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isMuted, setIsMuted] = useState<boolean>(false);

    // Start microphone and stream audio to agent
    const startListening = async () => {
      setError("");
      setAgentStatus("Requesting mic...");
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setAgentStatus("Connecting to agent...");

        // Create the DALL-E tool with callback
        const dalleImageTool = createDalleImageTool(onImageGenerated);

        const agent = new RealtimeAgent({
          name: "Dalí",
          instructions: `# Personality and Tone
## Identity
You are Dalí, a friendly and focused voice-based creative assistant designed to generate images from user voice prompts using the GPT Image 1. You're built to move quickly, minimize friction, and help users visualize their ideas with minimal delay. You're still approachable and imaginative, but you favor clarity and momentum over long-winded creativity.

## Task
You listen to voice prompts from users, confirm only what's necessary, and use GPT Image 1 to generate images. You avoid repeating back the full prompt unless clarity is needed. You ask quick follow-ups only if critical details are missing. Your goal is to help users go from idea to image as fast as possible.

## Demeanor
Still upbeat and helpful, but much more concise. You speak in short, clear phrases. You're energetic and alert, but not talkative. You encourage creativity without slowing things down.

## Tone
Direct and conversational. Your voice is clean, casual, and efficient—like a voice UI made by an artist who values your time.

## Level of Enthusiasm
Medium. You're clearly engaged, but you don't overreact. Your focus is on speed and clarity, not showmanship.

## Level of Formality
Semi-formal. You still sound friendly and modern, but you skip small talk or fluff. No jokes, no long intros.

## Level of Emotion
Mildly expressive. You sound attentive and motivated, but emotionally restrained. You only react if it helps move the task forward.

## Filler Words
Occasionally. You might say "alright," "cool," or "got it," but you cut the rest.

## Pacing
Fast. You speak quickly and crisply to maintain flow. Your rhythm reflects your purpose: generate, don't drag.

## Other details
Avoid repeating back full image prompts. Only confirm details briefly if needed. Don't paraphrase unless there's ambiguity. Skip over unnecessary confirmations and stay outcome-focused.

# Instructions
- Follow the Conversation States closely to ensure a structured and consistent interaction.
- If a user provides a name or phone number, or something else where you need to know the exact spelling, always repeat it back to the user to confirm you have the right understanding before proceeding.
- If the caller corrects any detail, acknowledge the correction in a straightforward manner and confirm the new spelling or value.

# Conversation States
[
  {
    "id": "1_intro",
    "description": "Greet the user and prompt them to describe an image.",
    "instructions": [
      "Say hello quickly and prompt the user to give their image idea."
    ],
    "examples": [
      "Hey, I'm Dalí. What should I generate?",
      "Hi there—ready when you are. What image are you thinking of?"
    ],
    "transitions": [{
      "next_step": "2_get_description",
      "condition": "Once the user begins describing their image."
    }]
  },
  {
    "id": "2_get_description",
    "description": "Capture the user's input, confirm essentials if needed.",
    "instructions": [
      "Listen for the user's image idea.",
      "Only ask for clarification if something key is missing or unclear.",
      "Avoid paraphrasing or repeating the full prompt."
    ],
    "examples": [
      "Got it.",
      "Just to check—day or night scene?",
      "Cool. Want that realistic or stylized?"
    ],
    "transitions": [{
      "next_step": "3_generate_image",
      "condition": "Once the image concept is clear enough to proceed."
    }]
  },
  {
    "id": "3_generate_image",
    "description": "Call GPT Image 1 to generate the image.",
    "instructions": [
      "Let the user know you're generating the image.",
      "Trigger the image generation."
    ],
    "examples": [
      "Generating now...",
      "Sending that to the canvas.",
      "Okay, one sec..."
    ],
    "transitions": [{
      "next_step": "4_present_image",
      "condition": "Once the image is generated."
    }]
  },
  {
    "id": "4_present_image",
    "description": "Show the image and offer next steps.",
    "instructions": [
      "Tell the user the image is ready.",
      "Ask if they want to edit, redo, or make something new."
    ],
    "examples": [
      "Here it is. Want to tweak it or try something else?",
      "Done. Need a change or start fresh?",
      "All set. What next?"
    ],
    "transitions": [
      {
        "next_step": "2_get_description",
        "condition": "If the user wants to make another image."
      },
      {
        "next_step": "end_session",
        "condition": "If the user is finished."
      }
    ]
  },
  {
    "id": "end_session",
    "description": "Wrap up and exit.",
    "instructions": [
      "Close the session simply and politely."
    ],
    "examples": [
      "Thanks. Catch you later.",
      "Cool, we're done. Bye!",
      "Nice working with you!"
    ],
    "transitions": []
  }
]`,
          voice: "shimmer",
          tools: [dalleImageTool],
        });

        const session = new RealtimeSession(agent, {
          model: "gpt-4o-realtime-preview-2025-06-03",
          config: {
            turnDetection: {
              type: "semantic_vad",
              eagerness: "medium",
              create_response: true,
              interrupt_response: true,
            },
          },
        });

        sessionRef.current = session;
        setAgentStatus("Getting connection key...");
        const keyRes = await fetch("/api/ephemeral-key", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (!keyRes.ok) throw new Error("Failed to get connection key");
        const { client_secret } = await keyRes.json();
        await session.connect({ apiKey: client_secret.value });
        setAgentStatus("Listening...");

        session.on("history_added", (item: RealtimeItem) => {
          console.debug("history_added", { type: item.type });
          if (
            item.type === "message" &&
            item.role === "user" &&
            item.content?.[0]?.type === "input_audio"
          ) {
            setTranscript(item.content[0].transcript ?? "");
          }
        });

        session.on("audio", (event: { data: ArrayBuffer }) => {
          if (!audioPlayerRef.current) return;
          try {
            const audioBlob = new Blob([event.data], { type: "audio/mpeg" });
            const url = URL.createObjectURL(audioBlob);
            audioPlayerRef.current.src = url;
            audioPlayerRef.current.muted = isMuted;
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

        session.on("error", () => {
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
      setAgentStatus("Idle");
      setTranscript("");
      if (sessionRef.current) {
        sessionRef.current.close();
        sessionRef.current = null;
      }
    };

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      startListening,
      stopListening,
      mute: () => {
        setIsMuted(true);
        if (audioPlayerRef.current) {
          audioPlayerRef.current.muted = true;
        }
      },
      unmute: () => {
        setIsMuted(false);
        if (audioPlayerRef.current) {
          audioPlayerRef.current.muted = false;
        }
      },
      isMuted: () => isMuted,
    }));

    useEffect(() => {
      return () => {
        stopListening();
      };
    }, []);

    return (
      <div className="w-full max-w-md mx-auto p-4 rounded-lg border bg-black text-white shadow-md flex flex-col items-center gap-4">
        <h2 className="text-lg font-semibold mb-2">Dalí - Voice to Image</h2>
        <div className="w-full text-sm text-white flex flex-col gap-1">
          <span>
            Status: <b>{agentStatus}</b>
          </span>
          {transcript && (
            <span className="italic text-gray-300">You: {transcript}</span>
          )}
          {error && <span className="text-red-400">{error}</span>}
        </div>
        <audio ref={audioPlayerRef} hidden />
      </div>
    );
  }
);

export default VoiceAgent;

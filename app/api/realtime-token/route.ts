import { NextResponse } from "next/server";

export const runtime = "edge"; // run on Vercel Edge Functions for low latency

export async function GET() {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({ model: "gpt-4o-realtime-preview-2025-06-03" })
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: text }, { status: res.status });
    }

    const data = await res.json();
    const token = data?.client_secret?.value;
    if (!token) {
      return NextResponse.json({ error: "No token returned" }, { status: 500 });
    }

    // Help browsers avoid caching this sensitive response
    return new NextResponse(JSON.stringify({ token }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 
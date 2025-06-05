# openainytw

## Voice Agent Quickstart

### Prerequisites

1. **Environment variables**
   - `OPENAI_API_KEY` (server-only)
   - `NEXT_PUBLIC_OPENAI_API_KEY` (public client token – keep permissions minimal)
   # (No authentication setup required for hackathon demo)
2. Install dependencies:
   ```sh
   pnpm i # or npm install / yarn
   ```

### Development

Run the dev server:
```sh
pnpm dev
```
Open http://localhost:3000/voice-agent and authenticate with Clerk to start talking to the agent.

### Production considerations

- Never log API keys or Clerk user IDs to the browser console.
- Use Vercel environment variables for secrets.
- Consider generating a short-lived client token for the Realtime API instead of exposing your full key.
- Store audio/image/video outputs in Vercel Blob Storage to keep bandwidth costs predictable.

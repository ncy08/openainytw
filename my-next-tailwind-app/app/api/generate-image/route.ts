import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const {
      prompt,
      size = "1024x1024",
      quality = "low",
      style = "vivid",
    } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    console.log("🎨 Generating image with GPT Image 1:", {
      prompt,
      size,
      quality,
      style,
    });

    // Create a detailed prompt that incorporates the style preferences
    const enhancedPrompt = `Create an image with a ${style} artistic style. ${prompt}`;

    // Map quality parameters from DALL-E format to GPT Image 1 format
    const gptImageQuality = quality === "hd" ? "high" : "medium";

    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: enhancedPrompt,
      size: size as "1024x1024" | "1536x1024" | "1024x1536",
      quality: gptImageQuality as "low" | "medium" | "high" | "auto",
    });

    // Extract the image from the response (Images API format)
    const imageData = response.data[0];

    if (!imageData?.b64_json) {
      return NextResponse.json(
        { error: "No image generated in response" },
        { status: 500 }
      );
    }

    // The image is returned as base64 data
    const imageUrl = `data:image/png;base64,${imageData.b64_json}`;

    // GPT Image 1 may provide a revised prompt
    const revisedPrompt = imageData.revised_prompt || null;

    console.log("✅ Image generated successfully with GPT Image 1");

    return NextResponse.json({
      imageUrl,
      revisedPrompt,
      originalPrompt: prompt,
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}

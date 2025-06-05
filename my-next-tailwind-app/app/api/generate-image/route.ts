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
      quality = "standard",
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

    // Create a detailed prompt that incorporates the quality and style preferences
    const enhancedPrompt = `Create a ${
      quality === "hd" ? "high-quality, detailed" : "standard quality"
    } image with a ${style} artistic style. ${prompt}`;

    const response = await openai.responses.create({
      model: "gpt-image-1",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: enhancedPrompt,
            },
          ],
        },
      ],
      modalities: ["text", "image"],
      max_completion_tokens: 2000,
    });

    // Extract the image from the response
    const imageContent = response.choices[0]?.message?.content?.find(
      (item) => item.type === "image"
    );

    if (!imageContent || imageContent.type !== "image") {
      return NextResponse.json(
        { error: "No image generated in response" },
        { status: 500 }
      );
    }

    // The image is returned as base64 data
    const imageUrl = `data:image/png;base64,${imageContent.image}`;

    // Get any text response as the "revised prompt"
    const textContent = response.choices[0]?.message?.content?.find(
      (item) => item.type === "text"
    );
    const revisedPrompt =
      textContent?.type === "text" ? textContent.text : null;

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

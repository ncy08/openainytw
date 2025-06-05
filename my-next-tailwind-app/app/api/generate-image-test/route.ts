import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const SIZES = ["1024x1024", "1792x1024", "1024x1792"];
const QUALITIES = ["standard", "hd"];
const STYLES = ["vivid", "natural"];
const RESPONSE_FORMATS = ["url", "b64_json"];

export async function POST(req: NextRequest) {
  try {
    // Pick random metadata
    const size = SIZES[Math.floor(Math.random() * SIZES.length)];
    const quality = QUALITIES[Math.floor(Math.random() * QUALITIES.length)];
    const style = STYLES[Math.floor(Math.random() * STYLES.length)];
    const response_format = RESPONSE_FORMATS[Math.floor(Math.random() * RESPONSE_FORMATS.length)];
    const n_images = 1;
    const duration_ms = Math.floor(Math.random() * 2000) + 1000;
    const user_id = `user_${Math.floor(Math.random() * 8) + 1}`;
    const prompt = "A test image generated for analytics";
    const image_url = `https://blob.vercel-storage.com/test-${Date.now()}.jpg`;
    const width = size.split("x")[0];
    const height = size.split("x")[1];

    const result = await pool.query(
      `INSERT INTO image_generations 
        (user_id, prompt, image_url, created_at, model, provider, status, duration_ms, file_size_bytes, width, height, size, quality, style, response_format, n_images)
       VALUES ($1, $2, $3, NOW(), 'gpt-image-1', 'openai', 'completed', $4, 1024000, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [user_id, prompt, image_url, duration_ms, width, height, size, quality, style, response_format, n_images]
    );

    return NextResponse.json({ success: true, row: result.rows[0] });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
} 
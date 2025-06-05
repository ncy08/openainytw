import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const SIZES = ["1024x1024", "1792x1024", "1024x1792"];
const QUALITIES = ["standard", "hd"];
const STYLES = ["vivid", "natural"];
const RESPONSE_FORMATS = ["url", "b64_json"];

const POPULAR_SIZE = "1024x1024";
const POPULAR_QUALITY = "standard";

export async function POST(req: NextRequest) {
  try {
    const { count, user_id } = await req.json().catch(() => ({ count: 5, user_id: "user_001" }));
    const insertCount = Math.max(1, Math.min(Number(count) || 5, 50));
    const userId = user_id || "user_001";
    const insertedRows = [];

    for (let i = 0; i < insertCount; i++) {
      // 50% chance to use popular size/quality
      const size = Math.random() < 0.5 ? POPULAR_SIZE : SIZES[Math.floor(Math.random() * SIZES.length)];
      const quality = Math.random() < 0.5 ? POPULAR_QUALITY : QUALITIES[Math.floor(Math.random() * QUALITIES.length)];
      const style = STYLES[Math.floor(Math.random() * STYLES.length)];
      const response_format = RESPONSE_FORMATS[Math.floor(Math.random() * RESPONSE_FORMATS.length)];
      const n_images = 1;
      const duration_ms = Math.floor(Math.random() * 2000) + 1000 + i * 100; // vary duration
      const prompt = `Test image #${i + 1} generated for analytics`;
      const image_url = `https://blob.vercel-storage.com/test-${Date.now()}-${i}.jpg`;
      const width = size.split("x")[0];
      const height = size.split("x")[1];

      const result = await pool.query(
        `INSERT INTO image_generations 
          (user_id, prompt, image_url, created_at, model, provider, status, duration_ms, file_size_bytes, width, height, size, quality, style, response_format, n_images)
         VALUES ($1, $2, $3, NOW(), 'gpt-image-1', 'openai', 'completed', $4, 1024000, $5, $6, $7, $8, $9, $10, $11)
         RETURNING *`,
        [userId, prompt, image_url, duration_ms, width, height, size, quality, style, response_format, n_images]
      );
      insertedRows.push(result.rows[0]);
    }

    return NextResponse.json({ success: true, rows: insertedRows });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
} 
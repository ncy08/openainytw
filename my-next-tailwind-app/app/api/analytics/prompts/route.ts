import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("user_id") || "user_001";
    // Top 10 prompts
    const promptsRes = await pool.query(
      `SELECT prompt, COUNT(*) as count
       FROM user_prompts
       WHERE user_id = $1
       GROUP BY prompt
       ORDER BY count DESC, prompt ASC
       LIMIT 10`,
      [userId]
    );
    const prompts = promptsRes.rows;

    // Top styles
    const stylesRes = await pool.query(
      `SELECT style, COUNT(*) as count
       FROM user_prompts
       WHERE user_id = $1
       GROUP BY style
       ORDER BY count DESC, style ASC
       LIMIT 5`,
      [userId]
    );
    const styles = stylesRes.rows;

    // Top qualities
    const qualitiesRes = await pool.query(
      `SELECT quality, COUNT(*) as count
       FROM user_prompts
       WHERE user_id = $1
       GROUP BY quality
       ORDER BY count DESC, quality ASC
       LIMIT 5`,
      [userId]
    );
    const qualities = qualitiesRes.rows;

    return NextResponse.json({ success: true, prompts, styles, qualities });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
} 
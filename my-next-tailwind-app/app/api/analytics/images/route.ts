import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function GET(req: NextRequest) {
  try {
    // Total generations
    const totalRes = await pool.query(
      `SELECT COUNT(*) FROM image_generations WHERE model = 'gpt-image-1'`
    );
    const total = parseInt(totalRes.rows[0].count, 10);

    // Monthly breakdown (last 6 months)
    const monthlyRes = await pool.query(`
      SELECT to_char(created_at, 'YYYY-MM') as month, COUNT(*) as count
      FROM image_generations
      WHERE model = 'gpt-image-1'
      GROUP BY month
      ORDER BY month
      LIMIT 6
    `);
    const monthly = monthlyRes.rows;

    // Breakdown by size
    const sizeRes = await pool.query(`
      SELECT size, COUNT(*) as count
      FROM image_generations
      WHERE model = 'gpt-image-1'
      GROUP BY size
      ORDER BY count DESC
    `);
    const sizes = sizeRes.rows;

    // Breakdown by quality
    const qualityRes = await pool.query(`
      SELECT quality, COUNT(*) as count
      FROM image_generations
      WHERE model = 'gpt-image-1'
      GROUP BY quality
      ORDER BY count DESC
    `);
    const qualities = qualityRes.rows;

    // Breakdown by style
    const styleRes = await pool.query(`
      SELECT style, COUNT(*) as count
      FROM image_generations
      WHERE model = 'gpt-image-1'
      GROUP BY style
      ORDER BY count DESC
    `);
    const styles = styleRes.rows;

    // Breakdown by response_format
    const responseFormatRes = await pool.query(`
      SELECT response_format, COUNT(*) as count
      FROM image_generations
      WHERE model = 'gpt-image-1'
      GROUP BY response_format
      ORDER BY count DESC
    `);
    const responseFormats = responseFormatRes.rows;

    // Average duration
    const avgDurationRes = await pool.query(`
      SELECT AVG(duration_ms) as avg_duration
      FROM image_generations
      WHERE model = 'gpt-image-1'
    `);
    const avgDuration = parseFloat(avgDurationRes.rows[0].avg_duration || 0);

    return NextResponse.json({
      success: true,
      total,
      monthly,
      sizes,
      qualities,
      styles,
      responseFormats,
      avgDuration,
    });
  } catch (error) {
    const err = error as Error;
    console.error("[analytics/images] error", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
} 
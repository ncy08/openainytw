import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, prompt, image_url, model, status, duration_ms, meta, session_id } = body;
    console.debug('[Analytics API] Inserting image_generation', { user_id, prompt, session_id });
    const result = await pool.query(
      `INSERT INTO image_generations (user_id, session_id, prompt, image_url, model, status, duration_ms, meta)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [user_id, session_id, prompt, image_url, model, status, duration_ms, meta]
    );
    console.debug('[Analytics API] Inserted image_generation', result.rows[0]);
    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.debug('[Analytics API] Error inserting image_generation', error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  // Test query param: ?test=1
  const { searchParams } = new URL(request.url);
  if (searchParams.get('test')) {
    try {
      const tables = await pool.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`);
      console.debug('[Analytics API] DB Connectivity Test: Tables', tables.rows);
      return NextResponse.json({ success: true, tables: tables.rows });
    } catch (error) {
      console.debug('[Analytics API] DB Connectivity Test Error', error);
      return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
  }
  try {
    console.debug('[Analytics API] Fetching analytics');
    // Total images
    const totalRes = await pool.query('SELECT COUNT(*) FROM image_generations');
    // Images per user
    const perUserRes = await pool.query('SELECT user_id, COUNT(*) FROM image_generations GROUP BY user_id');
    // Images per day
    const perDayRes = await pool.query('SELECT DATE(created_at) as day, COUNT(*) FROM image_generations GROUP BY day ORDER BY day DESC');
    // Top prompts
    const topPromptsRes = await pool.query('SELECT prompt, COUNT(*) FROM image_generations GROUP BY prompt ORDER BY COUNT(*) DESC LIMIT 10');
    console.debug('[Analytics API] Analytics fetched');
    return NextResponse.json({
      success: true,
      total: totalRes.rows[0].count,
      perUser: perUserRes.rows,
      perDay: perDayRes.rows,
      topPrompts: topPromptsRes.rows,
    });
  } catch (error) {
    console.debug('[Analytics API] Error fetching analytics', error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
} 
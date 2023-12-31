import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, description, campaignId } = body;

  try {
    await sql`INSERT INTO settings (title, description, campaign_id) VALUES (${title}, ${description}, ${campaignId});`;
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

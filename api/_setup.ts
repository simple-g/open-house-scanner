import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '../lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await sql`CREATE TABLE IF NOT EXISTS agents (
      id           uuid PRIMARY KEY,
      name         text,
      email        text UNIQUE NOT NULL,
      phone        text,
      brand_color  text,
      calendar_link text,
      plan         text DEFAULT 'free',
      created_at   timestamptz DEFAULT now()
    );`;

    await sql`CREATE TABLE IF NOT EXISTS events (
      id         uuid PRIMARY KEY,
      agent_id   uuid NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
      title      text NOT NULL,
      address    text,
      start_at   timestamptz,
      end_at     timestamptz,
      is_public  boolean DEFAULT true,
      created_at timestamptz DEFAULT now()
    );`;

    await sql`CREATE TABLE IF NOT EXISTS sign_ins (
      id         uuid PRIMARY KEY,
      event_id   uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      name       text NOT NULL,
      email      text,
      phone      text,
      role       text,
      timeline   text,
      created_at timestamptz DEFAULT now()
    );`;

    res.status(200).json({ ok: true });
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'setup failed' });
  }
}


import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '../../lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { agent_id, title, address, start_at, end_at, is_public = true } = req.body || {};
    const id = crypto.randomUUID();
    await sql/*sql*/`
      INSERT INTO events (id, agent_id, title, address, start_at, end_at, is_public)
      VALUES (${id}::uuid, ${agent_id}::uuid, ${title}, ${address || null},
              ${start_at ? new Date(start_at).toISOString() : null},
              ${end_at ? new Date(end_at).toISOString() : null},
              ${is_public})
    `;
    res.status(200).json({ ok: true, id });
  } catch (e: any) {
    res.status(400).json({ error: e.message || 'Bad Request' });
  }
}

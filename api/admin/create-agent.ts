import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '../../lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { name, email, phone, brand_color, calendar_link } = req.body || {};
    const id = crypto.randomUUID();
    await sql/*sql*/`
      INSERT INTO agents (id, name, email, phone, brand_color, calendar_link, plan)
      VALUES (${id}::uuid, ${name}, ${email}, ${phone || null}, ${brand_color || null},
              ${calendar_link || null}, 'free')
    `;
    res.status(200).json({ ok: true, id });
  } catch (e: any) {
    res.status(400).json({ error: e.message || 'Bad Request' });
  }
}

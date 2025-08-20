import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '../../lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const id = String((req.query as any).id);
  const { rows } = await sql/*sql*/`
    SELECT e.id, e.title, e.address, e.start_at, e.end_at, e.is_public,
           a.id as agent_id, a.name as agent_name, a.email as agent_email,
           a.phone as agent_phone, a.brand_color, a.calendar_link
    FROM events e JOIN agents a ON a.id = e.agent_id
    WHERE e.id = ${id}::uuid
    LIMIT 1
  `;
  if (!rows.length) return res.status(404).json({ error: 'Event not found' });
  res.status(200).json(rows[0]);
}

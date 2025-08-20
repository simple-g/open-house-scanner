import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '../../../lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const id = String((req.query as any).id);
  const { rows } = await sql/*sql*/`
    SELECT id, name, email, phone, role, timeline, created_at
    FROM sign_ins
    WHERE event_id = ${id}::uuid
    ORDER BY created_at DESC
  `;
  res.status(200).json({ sign_ins: rows });
}

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '../lib/db';
import { z } from 'zod';

const SignIn = z.object({
  event_id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  role: z.enum(['buyer','agent','other']).optional(),
  timeline: z.string().optional()
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const data = SignIn.parse(req.body || {});
    const id = crypto.randomUUID();
    await sql/*sql*/`
      INSERT INTO sign_ins (id, event_id, name, email, phone, role, timeline)
      VALUES (${id}::uuid, ${data.event_id}::uuid, ${data.name},
              ${data.email || null}, ${data.phone || null},
              ${data.role || 'buyer'}, ${data.timeline || null})
    `;
    res.status(200).json({ ok: true, id });
  } catch (e: any) {
    res.status(400).json({ error: e.message || 'Bad Request' });
  }
}

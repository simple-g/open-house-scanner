import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '../../lib/db';

export default async function handler(_: VercelRequest, res: VercelResponse) {
  const { rows } = await sql/*sql*/`SELECT id, name, email FROM agents ORDER BY created_at DESC`;
  res.status(200).json({ agents: rows });
}

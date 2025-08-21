// lib/db.ts — Plain Postgres (Neon/Supabase/any) with SSL, Vercel-friendly.
import { Pool } from 'pg';

// We’ll look for your Neon/Supabase URL under the common names.
// Paste your pooled URL into Vercel → Settings → Environment Variables.
const connectionString =
  process.env.DATABASE_URL ||           // <- recommended: set this in Vercel
  process.env.POSTGRES_URL ||           // also OK
  process.env.POSTGRES_PRISMA_URL ||    // also OK
  ''; // fallback

if (!connectionString) {
  throw new Error(
    'Missing DATABASE_URL/POSTGRES_URL/POSTGRES_PRISMA_URL env var. ' +
    'Add your Neon pooled connection string in Vercel → Project → Settings → Environment Variables.'
  );
}

// Neon needs SSL in serverless environments
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

/**
 * Template-string helper so you can write:
 *   await sql`SELECT * FROM table WHERE id = ${someId}`
 * and it will safely parameterize values as $1, $2, ...
 */
export async function sql(strings: TemplateStringsArray, ...values: any[]) {
  let text = '';
  for (let i = 0; i < strings.length; i++) {
    text += strings[i];
    if (i < values.length) text += `$${i + 1}`;
  }
  const res = await pool.query(text, values);
  return { rows: res.rows };
}

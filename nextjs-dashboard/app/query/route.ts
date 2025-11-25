import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

async function listInvoices() {
  const rows = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;
  return rows;
}

export async function GET() {
  const data = await listInvoices();
  return Response.json(data);
}

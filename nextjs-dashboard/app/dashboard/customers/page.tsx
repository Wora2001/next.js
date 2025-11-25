import { neon } from '@neondatabase/serverless';

export default async function Page() {
  // เชื่อมต่อ Neon
  const sql = neon(process.env.DATABASE_URL!);

  // ดึง comment ทั้งหมด
  const comments = await sql`
    SELECT comment
    FROM comments
    ORDER BY comment ASC;
  `;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Comments from database</h1>

      {/* ถ้าไม่มี comment */}
      {comments.length === 0 && (
        <p>No comments found.</p>
      )}

      {/* ถ้ามีข้อมูล */}
      <ul className="space-y-2">
        {comments.map((row, idx) => (
          <li key={idx} className="border p-2 rounded">
            {row.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}

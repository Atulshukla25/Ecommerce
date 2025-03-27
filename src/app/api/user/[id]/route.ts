import { connectDB } from "../../../../lib/db";
export async function GET(req: Request, { params }: { params: { id: string } }): Promise<Response> {
  try {
    const db = await connectDB();
    const [user]: any[] = await db.execute('SELECT * FROM register_table WHERE id = ?', [params.id]);
    await db.end();

    if (user.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(user[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Database error' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
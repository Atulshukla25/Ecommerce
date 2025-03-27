import { connectDB } from "../../../lib/db";

export async function GET(): Promise<Response> {
  try {
    const db = await connectDB();
    const [products]: any[] = await db.execute("SELECT * FROM products");
    await db.end();

    return new Response(JSON.stringify(products), {
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
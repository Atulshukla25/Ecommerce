import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const db = await connectDB();
    const [products]: any[] = await db.execute("SELECT * FROM products");
    await db.end();

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
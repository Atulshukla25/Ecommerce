import { connectDB } from "../../../../lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request): Promise<Response> {
  const { email, user_password }: { email: string; user_password: string } = await req.json();

  try {
    const db = await connectDB();
    const [users]: any[] = await db.execute(
      "SELECT * FROM register_table WHERE email = ?",
      [email]
    );
    await db.end();

    if (users.length === 0) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(user_password, user.user_password);

    if (!isMatch) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "atulshukla25082002",
      { expiresIn: "1h" }
    );

    return Response.json({
      message: "Login successful",
      token,
      userId: user.id,
    });
  } catch (error) {
    return Response.json({ error: "Database error" }, { status: 500 });
  }
}

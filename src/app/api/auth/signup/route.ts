import { connectDB } from "../../../../lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request): Promise<Response> {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const user_password = formData.get("user_password") as string;
    const gender = formData.get("gender") as string;

    if (!name || !email || !user_password || !gender) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    if (user_password.length < 6) {
      return new Response(
        JSON.stringify({
          error: "Password must be at least 6 characters long",
        }),
        { status: 400 }
      );
    }

    const db = await connectDB();

    const [rows]: any[] = await db.query(
      "SELECT * FROM register_table WHERE email = ?",
      [email]
    );
    if (rows.length > 0) {
      return new Response(JSON.stringify({ error: "Email already exists" }), {
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(user_password, 10);

    const [result]: any = await db.execute(
      "INSERT INTO register_table (name, email, user_password, gender) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, gender]
    );

    await db.end();

    return new Response(
      JSON.stringify({
        message: "User registered successfully",
        id: result.insertId,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
    });
  }
}
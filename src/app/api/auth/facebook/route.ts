import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import axios from "axios";

dotenv.config();

const CLIENT_ID: string = process.env.FACEBOOK_CLIENT_ID || "";
const CLIENT_SECRET: string = process.env.FACEBOOK_CLIENT_SECRET || "";
const JWT_SECRET: string = process.env.JWT_SECRET || "";

const DB_CONFIG = {
  host: "localhost",
  user: "root",
  password: "",
  database: "Ecommerce",
  port: 3307,
};

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const code: string | null = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      `https://www.facebook.com/v18.0/dialog/oauth?client_id=${CLIENT_ID}&redirect_uri=http://localhost:3000/api/auth/facebook&scope=email,public_profile`
    );
  }

  try {
    const tokenRes = await axios.get<{ access_token: string }>(
      `https://graph.facebook.com/v18.0/oauth/access_token`,
      {
        params: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          redirect_uri: "http://localhost:3000/api/auth/facebook",
          code,
        },
      }
    );

    const access_token = tokenRes.data.access_token;
    if (!access_token) throw new Error("Facebook OAuth Failed");

    const userRes = await axios.get<{
      id: string;
      name: string;
      email: string;
      picture: { data: { url: string } };
    }>(`https://graph.facebook.com/me`, {
      params: {
        fields: "id,name,email,picture",
        access_token,
      },
    });

    const { id, name, email, picture } = userRes.data;

    const connection = await mysql.createConnection(DB_CONFIG);

    const [existingUser]: any[] = await connection.execute(
      "SELECT id FROM register_table WHERE email = ?",
      [email]
    );

    let userId: number;
    if (existingUser.length > 0) {
      userId = existingUser[0].id;
    } else {
      const [result]: any = await connection.execute(
        "INSERT INTO register_table (name, email, user_password, gender) VALUES (?, ?, '', 'Male')",
        [name, email]
      );
      userId = result.insertId;
    }

    await connection.end();

    const token = jwt.sign(
      { id: userId, email, name, picture: picture.data.url },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.redirect("http://localhost:3000/dashboard");

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    response.cookies.set("userId", userId.toString(), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Facebook OAuth error:", error);
    return NextResponse.json({ error: "OAuth login failed" }, { status: 500 });
  }
}
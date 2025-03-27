import mysql from "mysql2/promise";

export async function connectDB(): Promise<mysql.Connection> {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Ecommerce",
    port: 3307,
  });
}

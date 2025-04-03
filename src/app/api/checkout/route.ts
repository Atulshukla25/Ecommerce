import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, cart } = await req.json();

    if (!userId || cart.length === 0) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    console.log("Order Placed:", { userId, cart });

    return NextResponse.json({ message: "Order placed successfully!" });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

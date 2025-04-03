import { NextResponse } from "next/server";
import { cookies } from "next/headers";

let cart: any[] = []; 

export async function GET() {
  try {
    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { id, name, description, price, image, quantity } = await req.json();

    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.push({ id, name, description, price, image, quantity: quantity || 1 });
    }

    (await cookies()).set("cart", JSON.stringify(cart));
    return NextResponse.json({ message: "Item added to cart", cart }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add item to cart" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, quantity } = await req.json();

    cart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );

    return NextResponse.json({ message: "Cart updated", cart }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    cart = cart.filter((item) => item.id !== id);

    return NextResponse.json({ message: "Item removed from cart", cart }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove item" }, { status: 500 });
  }
}

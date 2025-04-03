"use client";

import useAuthStore from "../../store/index";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

export default function CartPage() {
  const { cart, updateCartItem, removeCartItem, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // Calculate total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center text-yellow-300 mt-10">
          Your Cart
        </h1>

        {cart.length > 0 ? (
          <div className="mt-6 space-y-6 px-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-400">{item.description}</p>
                    <p className="text-lg font-bold text-green-400">
                      ₹{item.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateCartItem(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="bg-yellow-500 px-3 py-1 text-black font-bold rounded-md"
                  >
                    -
                  </button>
                  <span className="text-xl">{item.quantity}</span>
                  <button
                    onClick={() => updateCartItem(item.id, item.quantity + 1)}
                    className="bg-yellow-500 px-3 py-1 text-black font-bold rounded-md"
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      removeCartItem(item.id);
                      toast.info(`${item.name} removed from cart`);
                    }}
                    className="bg-red-500 px-4 py-2 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-8 text-right">
              <h2 className="text-2xl font-bold text-white">
                Total: ₹{totalPrice.toFixed(2)}
              </h2>
              <Link href="/checkout">
                <button className="bg-green-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-600 transition mt-4">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-6">
            Your cart is empty.{" "}
            <Link href="/products" className="text-yellow-300">
              Go shopping!
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

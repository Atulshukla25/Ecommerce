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

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-blue-50 text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-yellow-400 mt-10">
          Your Cart
        </h1>

        {cart.length > 0 ? (
          <div className="mt-8 space-y-8">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row justify-between items-center bg-gray-700 p-6 rounded-xl shadow-xl gap-6"
              >
                <div className="flex items-center gap-6 w-full md:w-2/3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex flex-col">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-300 text-sm">{item.description}</p>
                    <p className="text-lg font-bold text-green-400 mt-2">
                      ₹{item.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateCartItem(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className={`px-3 py-1 text-black font-bold rounded-md transition ${
                      item.quantity <= 1
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-yellow-500 hover:bg-yellow-400"
                    }`}
                  >
                    -
                  </button>
                  <span className="text-xl">{item.quantity}</span>
                  <button
                    onClick={() => updateCartItem(item.id, item.quantity + 1)}
                    className="bg-yellow-500 hover:bg-yellow-400 px-3 py-1 text-black font-bold rounded-md transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      removeCartItem(item.id);
                      toast.info(`${item.name} removed from cart`);
                    }}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-10 text-right pr-4">
              <h2 className="text-2xl font-bold text-black">
                Total: ₹{totalPrice.toFixed(2)}
              </h2>
              <Link href="/checkout">
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md shadow-md transition mt-4">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-10 text-center text-gray-700">
            <p className="text-lg">Your cart is empty.</p>
            <Link
              href="/products"
              className="inline-block mt-3 text-yellow-500 font-semibold hover:underline"
            >
              Go shopping!
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

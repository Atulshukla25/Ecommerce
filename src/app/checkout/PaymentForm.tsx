"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store";
import { toast } from "react-toastify";

export default function PaymentForm() {
  const [loading, setLoading] = useState(false);
  const { cart, user, clearCart } = useAuthStore();
  const router = useRouter();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, cart }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Order placed successfully!");
        clearCart();
        router.push("/order-success");
      } else {
        toast.error(data.message || "Payment failed!");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handlePayment}
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-yellow-300 mb-4">Payment</h2>

      <input
        type="text"
        placeholder="Card Number"
        className="w-full p-3 rounded-md text-white mb-4"
        required
      />
      <input
        type="text"
        placeholder="Card Holder Name"
        className="w-full p-3 rounded-md text-white mb-4"
        required
      />
      <input
        type="text"
        placeholder="Expiration Date (MM/YY)"
        className="w-full p-3 rounded-md text-white mb-4"
        required
      />
      <input
        type="text"
        placeholder="CVV"
        className="w-full p-3 rounded-md text-white mb-4"
        required
      />

      <button
        type="submit"
        className="w-full bg-green-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-600 transition"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay & Place Order"}
      </button>
    </form>
  );
}

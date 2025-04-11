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
      className="bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-extrabold text-yellow-400 mb-6">
        Payment Details
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Card Number"
          aria-label="Card Number"
          className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
        <input
          type="text"
          placeholder="Card Holder Name"
          aria-label="Card Holder Name"
          className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
        <input
          type="text"
          placeholder="Expiration Date (MM/YY)"
          aria-label="Expiration Date"
          className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
        <input
          type="text"
          placeholder="CVV"
          aria-label="CVV"
          className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`mt-6 w-full px-6 py-3 rounded-md shadow-md font-semibold transition ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600 text-white"
        }`}
      >
        {loading ? "Processing..." : "Pay & Place Order"}
      </button>
    </form>
  );
}

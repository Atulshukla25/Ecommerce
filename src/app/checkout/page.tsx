"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store";
import OrderSummary from "./OrderSummary";
import PaymentForm from "./PaymentForm";

export default function CheckoutPage() {
  const { cart, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (cart.length === 0) {
      router.push("/cart");
    }
  }, [user, cart, router]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center text-yellow-300 mt-10">
          Checkout
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 px-6">
          <OrderSummary />
          <PaymentForm />
        </div>
      </div>
    </div>
  );
}

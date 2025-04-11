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
      return;
    }
    if (cart.length === 0) {
      router.push("/cart");
    }
  }, [user, cart, router]);

  return (
    <div className="min-h-screen bg-blue-50 text-white">
      <div className="container max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-center text-yellow-400 mt-6 mb-10">
          Checkout
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <OrderSummary />
          <PaymentForm />
        </div>
      </div>
    </div>
  );
}

"use client";

import useAuthStore from "../../store";

export default function OrderSummary() {
  const { cart } = useAuthStore();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity ?? 1),
    0
  );

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl">
      <h2 className="text-2xl font-extrabold text-yellow-400 mb-6">
        Order Summary
      </h2>

      {cart.length > 0 ? (
        <div className="space-y-5">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center text-white"
            >
              <p className="font-medium">
                {item.name}{" "}
                <span className="text-sm text-gray-300">
                  ({item.quantity ?? 1}x)
                </span>
              </p>
              <p className="font-semibold text-green-400">
                ₹{item.price * (item.quantity ?? 1)}
              </p>
            </div>
          ))}

          <hr className="my-4 border-gray-600" />

          <div className="flex justify-between items-center text-white">
            <h3 className="text-xl font-bold">Total:</h3>
            <span className="text-xl font-bold text-green-400">
              ₹{totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      ) : (
        <p className="text-gray-400 text-sm">No items in cart.</p>
      )}
    </div>
  );
}

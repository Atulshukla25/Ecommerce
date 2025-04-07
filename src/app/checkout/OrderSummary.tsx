"use client";

import useAuthStore from "../../store";

export default function OrderSummary() {
  const { cart } = useAuthStore();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity ?? 1),
    0
  );

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Order Summary</h2>

      {cart.length > 0 ? (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <p className="text-white">
                {item.name} ({item.quantity}x)
              </p>
              <p className="text-green-400">
                ₹{item.price * (item.quantity ?? 1)}
              </p>
            </div>
          ))}
          <hr className="my-4 border-gray-600" />
          <h3 className="text-xl font-bold text-white">
            Total: ₹{totalPrice.toFixed(2)}
          </h3>
        </div>
      ) : (
        <p className="text-gray-400">No items in cart.</p>
      )}
    </div>
  );
}

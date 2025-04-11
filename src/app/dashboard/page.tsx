"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Cookies from "js-cookie";
import useAuthStore from "../../store/index";
import React from "react";

export default function Dashboard() {
  const router = useRouter();
  const { user, fetchUsers } = useAuthStore();

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId) {
      fetchUsers(userId);
    }
  }, [router, fetchUsers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 text-gray-800 flex flex-col">
      <Navbar user={user} searchQuery={""} setSearchQuery={function (value: React.SetStateAction<string>): void {
        throw new Error("Function not implemented.");
      } } />

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center py-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-yellow-400 mb-4 drop-shadow-md animate-pulse">
          Welcome to <span className="text-pink-500 italic">PocketMall</span>
        </h1>

        <p className="text-lg text-gray-700 max-w-xl mb-10 leading-relaxed">
          Your ultimate destination for shopping! Discover amazing products and
          enjoy an effortless shopping experience.
        </p>

        {user && (
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-6 rounded-2xl shadow-2xl transition-transform transform hover:scale-105 w-full max-w-md">
            <h2 className="text-2xl sm:text-3xl font-bold animate-bounce">
              Hello, {user.name} 👋
            </h2>
            <p className="text-sm text-gray-200 mt-2">
              We're thrilled to have you here! Explore and enjoy your journey
              with us.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

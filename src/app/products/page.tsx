"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Cookies from "js-cookie";
import useAuthStore from "../../store/index";
import React from "react";

interface User {
  id: string;
  name: string;
  email: string;
  gender: string;
}

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-gray-900 to-black text-white flex flex-col items-center justify-center">
  <Navbar user={user} />

  <div className="flex flex-col items-center text-center px-6">
    <h1 className="text-6xl font-extrabold text-yellow-300 mb-6 drop-shadow-2xl animate-pulse">
      Welcome to <span className="text-pink-500">Pocket Mall</span>
    </h1>
    <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
      Your ultimate destination for shopping! Discover amazing products and enjoy an effortless shopping experience.
    </p>
    {user && (
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-6 rounded-2xl shadow-2xl transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-bold text-white animate-bounce">
          Hello, {user.name} 👋
        </h2>
        <p className="text-sm text-gray-200 mt-2">
          We're thrilled to have you here! Explore and enjoy your journey with us.
        </p>
      </div>
    )}
  </div>
</div>
  );
}

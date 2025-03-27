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
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <Navbar user={user} />

      <div className="container mx-auto flex flex-col items-center justify-center mt-20 px-6">
        <h1 className="text-5xl font-extrabold text-yellow-400 mb-4 text-center drop-shadow-md animate-fade-in">
          Welcome to <span className="text-purple-400">Pocket Mall</span> 🎉
        </h1>
        <p className="text-lg text-gray-300 mb-6 text-center max-w-lg">
          Your one-stop shop for everything! Enjoy seamless shopping and explore
          amazing products.
        </p>
        {user && (
          <div className="bg-white text-black px-6 py-4 rounded-xl shadow-lg text-center w-full max-w-md">
            <h2 className="text-2xl font-bold text-purple-600">
              Hello, {user.name} 👋
            </h2>
            <p className="text-gray-600 mt-2">We're glad to have you here!</p>
          </div>
        )}
      </div>
    </div>
  );
}
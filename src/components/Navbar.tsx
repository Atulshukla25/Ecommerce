"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import useAuthStore from "../store/index";
import React from "react";

interface User {
  name: string;
  email: string;
  gender: string;
}

interface NavbarProps {
  user: User | null;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function Navbar({
  user,
  searchQuery,
  setSearchQuery,
}: NavbarProps) {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const { logout, cart } = useAuthStore();

  const togglePopup = (): void => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-4 shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
        <Link
          href="/dashboard"
          className="text-2xl font-extrabold tracking-wide italic"
        >
          Pocket<span className="text-yellow-300">Mall</span>
        </Link>

        <div className="flex items-center space-x-6 text-lg">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-1 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-auto"
          />
          <Link href="/products" className="hover:text-yellow-300 transition">
            Product
          </Link>

          <Link
            href="/cart"
            className="relative hover:text-yellow-300 transition"
          >
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <button onClick={togglePopup} className="flex items-center gap-2">
                <FaUserCircle className="text-3xl" />
              </button>

              {isPopupOpen && (
                <div className="absolute right-[-108px] mt-5 w-85 bg-gradient-to-br from-white via-gray-100 to-gray-200 text-black p-6 shadow-2xl rounded-lg border border-gray-300 animate-fade-in">
                  <h3 className="text-xl font-bold text-gray-700 mb-4 border-b border-gray-300 pb-2">
                    User Profile
                  </h3>
                  <div className="space-y-3">
                    <p>
                      <strong>Name:</strong>{" "}
                      <span className="text-gray-900">{user.name}</span>
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      <span className="text-gray-900">{user.email}</span>
                    </p>
                    <p>
                      <strong>Gender:</strong>{" "}
                      <span className="text-gray-900">{user.gender}</span>
                    </p>
                  </div>

                  <div className="mt-6 space-y-3">
                    <button
                      onClick={() => logout(router)}
                      className="w-full bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition-all transform hover:scale-105"
                    >
                      Logout
                    </button>
                    <button
                      onClick={togglePopup}
                      className="w-full bg-gray-200 text-gray-700 px-5 py-2 rounded-lg shadow-md hover:bg-gray-300 hover:shadow-lg transition-all transform hover:scale-105"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <Link href="/login" className="hover:text-yellow-300 transition">
                Login
              </Link>
              <Link
                href="/signup"
                className="hover:text-yellow-300 transition px-4 py-2 rounded-lg font-medium text-yellow-500 hover:bg-yellow-500"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

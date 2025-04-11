"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import useAuthStore from "../../store/index";
import { SubmitHandler } from "react-hook-form";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  user_password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type OAuthProvider = "google" | "facebook";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { loginWithCredential, handleOAuth, serverError } = useAuthStore();

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    loginWithCredential(data, router);
  };

  const handleSocialLogin = (provider: OAuthProvider) => {
    handleOAuth(provider);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="w-full max-w-xl p-10 space-y-6 bg-white shadow-xl rounded-3xl border border-gray-200">
        <h2 className="text-4xl font-bold text-center text-gray-900">
          Welcome Back!
        </h2>
        <p className="text-center text-sm text-gray-600">
          Login to your{" "}
          <span className="text-blue-600 font-medium">Pocket Mall</span> account
        </p>

        {serverError && (
          <p className="text-red-600 text-center font-semibold animate-pulse">
            {serverError}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("user_password")}
              placeholder="Enter your password"
              className="w-full mt-2 px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
            />
            {errors.user_password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.user_password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-lg shadow-md transition duration-300 focus:ring-2 focus:ring-green-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Signup now
          </Link>
        </p>

        <div className="flex items-center gap-4">
          <hr className="flex-1 border-gray-300" />
          <span className="text-gray-500 font-medium text-sm">
            Or login with
          </span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            className="flex items-center justify-center gap-3 py-3 px-4 w-full text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-md transition duration-300"
            onClick={() => handleSocialLogin("google")}
          >
            <FaGoogle /> Google
          </button>

          <button
            className="flex items-center justify-center gap-3 py-3 px-4 w-full text-white bg-blue-800 hover:bg-blue-900 rounded-lg shadow-md transition duration-300"
            onClick={() => handleSocialLogin("facebook")}
          >
            <FaFacebook /> Facebook
          </button>
        </div>
      </div>
    </div>
  );
}

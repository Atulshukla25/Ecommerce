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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-500">
      <div className="w-full max-w-xl p-8 space-y-6 bg-white shadow-2xl rounded-3xl border border-gray-300">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
          Login to <span className="text-blue-500">Pocket Mall</span>
        </h2>

        {serverError && (
          <p className="text-red-600 text-center font-semibold animate-pulse">
            {serverError}
          </p>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 text-gray-800"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-50"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("user_password")}
              placeholder="Enter your password"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-50"
            />
            {errors.user_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.user_password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-green-800 transition duration-300 focus:ring-2 focus:ring-green-400"
          >
            LOGIN
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Signup now
          </Link>
        </p>

        <div className="flex justify-center items-center">
          <hr className="w-[50%] h-[1px] bg-gray-300 border-0" />
          <p className="px-5 text-gray-700 font-semibold">Or</p>
          <hr className="w-[50%] h-[1px] bg-gray-300 border-0" />
        </div>

        <div className="space-y-3">
          <button
            className="w-full py-3 flex justify-center items-center gap-x-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md focus:ring-2 focus:ring-opacity-50 transition duration-300"
            onClick={() => handleSocialLogin("google")}
          >
            <FaGoogle className="text-xl" />
            CONTINUE WITH GOOGLE
          </button>

          <button
            className="w-full py-3 flex justify-center items-center gap-x-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-lg shadow-md focus:ring-2 focus:ring-opacity-50 transition duration-300"
            onClick={() => handleSocialLogin("facebook")}
          >
            <FaFacebook className="text-xl" />
            CONTINUE WITH FACEBOOK
          </button>
        </div>
      </div>
    </div>
  );
}

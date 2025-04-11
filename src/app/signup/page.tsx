"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { signupSchema } from "../../schema/validation";
import useAuthStore from "../../store/index";
import { z } from "zod";
import { SubmitHandler } from "react-hook-form";

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const { handleOAuth, signupWithCredential, serverError } = useAuthStore();

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("user_password", data.user_password);
    formData.append("gender", data.gender);

    signupWithCredential(formData, router);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="w-full max-w-2xl p-10 space-y-6 bg-white rounded-3xl shadow-xl border border-gray-200">
        <h2 className="text-4xl font-bold text-center text-gray-900">
          Create Your Account
        </h2>
        <p className="text-center text-sm text-gray-600">
          Join <span className="font-semibold text-blue-600">Pocket Mall</span>{" "}
          and start shopping smarter!
        </p>

        {serverError && (
          <p className="text-red-600 text-center font-semibold animate-pulse">
            {serverError}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="Alex Carry"
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 placeholder:text-gray-400"
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="alex@example.com"
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 placeholder:text-gray-400"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register("user_password")}
                placeholder="Create a strong password"
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 placeholder:text-gray-400"
              />
              {errors.user_password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.user_password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="flex mt-3 space-x-6">
                {["Male", "Female", "Other"].map((value) => (
                  <label
                    key={value}
                    className="flex items-center space-x-2 text-gray-700"
                  >
                    <input
                      type="radio"
                      value={value}
                      {...register("gender")}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-400"
                    />
                    <span>{value}</span>
                  </label>
                ))}
              </div>
              {errors.gender && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-lg shadow-md transition duration-300 focus:ring-2 focus:ring-green-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>

        <div className="flex items-center gap-4">
          <hr className="flex-1 border-gray-300" />
          <span className="text-gray-500 font-medium text-sm">
            Or sign up with
          </span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            className="flex items-center justify-center gap-3 py-3 px-4 w-full text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-md transition duration-300"
            onClick={() => handleOAuth("google")}
          >
            <FaGoogle /> Google
          </button>

          <button
            className="flex items-center justify-center gap-3 py-3 px-4 w-full text-white bg-blue-800 hover:bg-blue-900 rounded-lg shadow-md transition duration-300"
            onClick={() => handleOAuth("facebook")}
          >
            <FaFacebook /> Facebook
          </button>
        </div>
      </div>
    </div>
  );
}

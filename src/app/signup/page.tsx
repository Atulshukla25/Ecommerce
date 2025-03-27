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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-500">
      <div className="w-full max-w-xl p-8 space-y-6 bg-white shadow-2xl rounded-3xl border border-gray-300">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
          Join <span className="text-blue-500">Pocket Mall</span>
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
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="Alex Carry"
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-50"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="Alex@example.com"
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-50"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register("user_password")}
                placeholder="Create a strong password"
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-50"
              />
              {errors.user_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.user_password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Gender
              </label>
              <div className="flex space-x-4 mt-3">
                {["Male", "Female", "Other"].map((value) => (
                  <label
                    key={value}
                    className="flex items-center space-x-2 text-gray-800 cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={value}
                      {...register("gender")}
                      className="w-5 h-5 text-blue-600 focus:ring focus:ring-blue-400"
                    />
                    <span>{value}</span>
                  </label>
                ))}
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-green-800 transition duration-300 focus:ring-2 focus:ring-green-400"
          >
            SIGN UP
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>

        <div className="flex justify-center items-center">
          <hr className="w-[50%] h-[1px] bg-gray-300 border-0" />
          <p className="px-5 text-gray-700 font-semibold">Or</p>
          <hr className="w-[50%] h-[1px] bg-gray-300 border-0" />
        </div>

        {[
          {
            provider: "google" as const,
            color: "bg-red-500 hover:bg-red-600",
            icon: <FaGoogle className="text-xl" />,
          },
          {
            provider: "facebook" as const,
            color: "bg-blue-800 hover:bg-blue-900",
            icon: <FaFacebook className="text-xl" />,
          },
        ].map(({ provider, color, icon }) => (
          <button
            key={provider}
            className={`w-full py-3 flex justify-center items-center gap-x-2 ${color} text-white font-semibold rounded-lg shadow-md focus:ring-2 focus:ring-opacity-50 transition duration-300`}
            onClick={() => handleOAuth(provider)}
          >
            {icon} SIGN UP WITH {provider.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
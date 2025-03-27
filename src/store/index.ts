"use client";

import { create } from "zustand";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Router } from "next/router";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface Product {
  id: string;
  name: string;
}

interface Department {
  id: string;
  name: string;
}

interface AuthStoreState {
  departments: Department[];
  loading: boolean;
  serverError: string;
  user: User | null;
  products: Product[];
  signupWithCredential: (data: FormData, router: Router) => Promise<void>;
  loginWithCredential: (data: { email: string; password: string }, router: Router) => Promise<void>;
  logout: (router: Router) => Promise<void>;
  fetchproducts: () => Promise<void>;
  fetchUsers: (userId: string) => Promise<void>;
  handleOAuth: (provider: 'google' | 'github' | 'facebook') => Promise<void>;
}

const useAuthStore = create<AuthStoreState>((set) => ({
  departments: [],
  loading: false,
  serverError: "",
  user: null,
  products: [],

  signupWithCredential: async (data: FormData, router: Router) => {
    set({ loading: true });
    try {
      await axios.post("/api/auth/signup", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Signup Successfully");
      router.push("/login");
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 409) {
        toast.error("Email already exists. Please use a different email.");
      } else {
        set({ serverError: "Failed to sign up. Please try again." });
      }
    } finally {
      set({ loading: false });
    }
  },

  loginWithCredential: async (data: { email: string; password: string }, router: Router) => {
    set({ loading: true });
    try {
      const res: AxiosResponse<{ token: string; userId: string }> = await axios.post("/api/auth/login", data, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        Cookies.set("token", res.data.token);
        Cookies.set("userId", res.data.userId);
        router.push("/products");
        toast.success("Login successful");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 401) {
        toast.error("Invalid Credentials");
      } else {
        toast.error("Something went Wrong!");
      }
    } finally {
      set({ loading: false });
    }
  },

  logout: async (router: Router) => {
    try {
      const res: AxiosResponse = await axios.get("/api/auth/logout", {
        withCredentials: true,
      });
      if (res.status === 200) {
        Cookies.remove("token");
        Cookies.remove("userId");
        router.push("/login");
      } else {
        console.error("Logout failed:", res.data);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  fetchproducts: async () => {
    try {
      const response: AxiosResponse<Product[]> = await axios.get(`/api/products`);
      set({ products: response.data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  fetchUsers: async (userId: string) => {
    try {
      const response: AxiosResponse<User> = await axios.get(`/api/user/${userId}`);
      set({ user: response.data });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  },

  handleOAuth: async (provider: 'google' | 'github' | 'facebook') => {
    const providers = {
      google: "/api/auth/google",
      github: "http://localhost:3000/api/auth/github",
      facebook: "http://localhost:3000/api/auth/facebook",
    };
    try {
      window.location.href = providers[provider];
    } catch (error) {
      console.error("Login failed", error);
    }
  },
}));

export default useAuthStore;
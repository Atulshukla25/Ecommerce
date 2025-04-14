"use client";

import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const useAuthStore = create((set) => ({
  departments: [],
  loading: false,
  serverError: "",
  user: null,
  products: [],
  cart: [],

  signupWithCredential: async (data, router) => {
    set({ loading: true });
    try {
      await axios.post("/api/auth/signup", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Signup Successfully");
      router.push("/login");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Email already exists. Please use a different email.");
      } else {
        set({ serverError: "Failed to sign up. Please try again." });
      }
    } finally {
      set({ loading: false });
    }
  },
  loginWithCredential: async (data, router) => {
    set({ loading: true });
    try {
      const res = await axios.post("/api/auth/login", data, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        Cookies.set("token", res.data.token);
        Cookies.set("userId", res.data.userId);
        router.push("/dashboard");
        toast.success("Login successful");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid Credentials");
      } else {
        toast.error("Something want Wrong!");
      }
    } finally {
      set({ loading: false });
    }
  },

  logout: async (router) => {
    try {
      const res = await axios.get("/api/auth/logout", {
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
      const response = await axios.get(`/api/dashboard`);
      set({ products: response.data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  fetchUsers: async (userId) => {
    try {
      const response = await axios.get(`/api/user/${userId}`);
      set({ user: response.data });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  },

  handleOAuth: async (provider) => {
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
  clearCart: () => {
    set({ cart: [] });
  },

  fetchproducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/api/products");
      set({ products: response.data });
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      set({ loading: false });
    }
  },
  addToCart: (product) => {
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }
    });
  },

  updateCartItem: (id, newQuantity) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ),
    }));
  },

  removeCartItem: (id) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    }));
  },
}));

export default useAuthStore;

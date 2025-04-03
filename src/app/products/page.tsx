"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import useAuthStore from "../../store/index";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const { user, fetchUsers, addToCart, cart } = useAuthStore(); // Get cart from store

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId) {
      fetchUsers(userId);
    }

    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();

        console.log("Fetched Products:", data);

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Unexpected API response:", data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    }

    fetchProducts();
  }, [fetchUsers]);

  // Function to handle Add to Cart with Quantity Restriction
  const handleAddToCart = (product: Product) => {
    const isAlreadyInCart = cart.some((item) => item.id === product.id);

    if (isAlreadyInCart) {
      toast.warning(`${product.name} is already in the cart!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else {
      addToCart({ ...product, quantity: 1 }); // Add with initial quantity 1
      toast.success(`${product.name} added to cart!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar user={user} />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center text-yellow-300 mt-10">
          Our Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 mt-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-2xl font-semibold text-white mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-400 mb-4">{product.description}</p>
                <p className="text-lg font-bold text-green-400">
                  ₹{product.price}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-yellow-500 text-black px-4 py-2 mt-4 rounded-lg shadow-md hover:bg-yellow-600 hover:shadow-lg transition-all transform hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-3">
              No products available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

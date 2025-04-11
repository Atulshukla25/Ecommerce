"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import useAuthStore from "../../store/index";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { user, fetchUsers, addToCart, cart } = useAuthStore();

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId) {
      fetchUsers(userId);
    }

    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        setProducts([]);
      }
    }

    fetchProducts();
  }, [fetchUsers]);

  const handleAddToCart = (product: Product) => {
    const isAlreadyInCart = cart.some((item) => item.id === product.id);
    if (isAlreadyInCart) {
      toast.warning(`${product.name} is already in the cart!`);
    } else {
      addToCart({ ...product, quantity: 1 });
      toast.success(`${product.name} added to cart!`);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-blue-200 text-gray-800">
      <Navbar
        user={user}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold text-center text-blue-800 mb-8 mt-10">
          Explore Our Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transform transition duration-300 hover:scale-[1.02]"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 object-cover rounded-xl mb-4"
                />
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  {product.description}
                </p>
                <p className="text-lg font-semibold text-green-600 mb-4">
                  ₹{product.price}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-all"
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">
              No products available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

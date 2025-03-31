import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-black text-gray-300 py-6 text-center shadow-lg">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-amber-400 font-bold tracking-wide">
            PocketMall
          </span>
          . All rights reserved.
        </p>
        <div className="mt-2 flex justify-center space-x-4">
          <a
            href="#"
            className="text-gray-400 hover:text-amber-400 transition duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-amber-400 transition duration-300"
          >
            Terms of Service
          </a>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Crafted with ❤️ by the PocketMall Team
        </p>
      </div>
    </footer>
  );
};

export default Footer;

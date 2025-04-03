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
      </div>
    </footer>
  );
};

export default Footer;

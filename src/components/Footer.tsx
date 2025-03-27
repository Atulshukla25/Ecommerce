import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-4 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} <span className="text-amber-300">PocketMall.</span> All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

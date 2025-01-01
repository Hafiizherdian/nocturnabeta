import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export default function Button({ children, onClick, type = "button", className }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-[#62929e] text-[#f0f0f0] px-4 py-2 rounded-lg hover:bg-[#4a6f7a] transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
}
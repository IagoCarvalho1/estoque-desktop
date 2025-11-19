"use client";

import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
};

export default function Button({
  children,
  onClick,
  className = "",
  type = "button",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition ${className}`}
    >
      {children}
    </button>
  );
}

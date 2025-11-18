"use client";

import { Home, Package, LogOut } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-10">Estoque</h2>

      <nav className="flex flex-col gap-4">
        <Link className="flex items-center gap-3 text-gray-700 hover:text-black" href="/estoque">
          <Home size={20} /> Dashboard
        </Link>

        <Link className="flex items-center gap-3 text-gray-700 hover:text-black" href="/estoque">
          <Package size={20} /> Produtos
        </Link>
      </nav>

      <div className="mt-auto">
        <button className="flex items-center gap-3 text-red-500 hover:text-red-700">
          <LogOut size={20} /> Sair
        </button>
      </div>
    </aside>
  );
}

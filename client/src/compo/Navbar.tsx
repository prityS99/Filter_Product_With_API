"use client";
import { useState } from "react";
import { ShoppingCart, Menu, X, Search, User, Trash, Plus } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const Navbar = ({ searchQuery, setSearchQuery }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold tracking-tight text-blue-600">
              MY<span className="text-gray-900">STORE</span>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Search size={18} />
              </span>
              {/* <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 sm:text-sm transition"
                placeholder="Search products..."
              /> */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full..."
                placeholder="Search products..."
              />

            </div>
          </div>

          {/* Desktop View: Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* 1. Add Product Button (Visible on Desktop) */}
            <Link
              href="/products/create"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition shadow-sm"
            >
              <Plus size={18} />
              <span>Add Product</span>
            </Link>

            <div className="flex items-center space-x-4 ml-2 border-l pl-4">
              {/* 2. Trash Button (Visible on Desktop) */}
              <Link
                href="/trash"
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                title="Trash"
              >
                <Trash size={22} />
              </Link>

              {/* Shopping Cart */}
              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full relative transition-all">
                <ShoppingCart size={22} />
                <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </button>

              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
                <User size={22} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-black focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <div className="pb-4">
              <input
                type="text"
                className="w-full pl-4 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50"
                placeholder="Search..."
              />
            </div>

            <Link href="/products/create" onClick={() => setIsOpen(false)} className="flex items-center gap-2 py-3 text-base font-medium text-blue-600 border-b">
              <Plus size={20} /> Add New Product
            </Link>

            <Link href="/shop" onClick={() => setIsOpen(false)} className="block py-3 text-base font-medium text-gray-700 border-b">
              Shop All
            </Link>

            <Link href="/trash" onClick={() => setIsOpen(false)} className="flex items-center gap-2 py-3 text-base font-medium text-red-600">
              <Trash size={20} /> Trash Items
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
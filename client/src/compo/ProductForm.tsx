"use client";

import { useState, useEffect } from "react";
import { X, UploadCloud, Save } from "lucide-react";

// Type definitions
interface Product {
  name: string;
  size: string;
  color: string;
  category: string;
  image: string;
  price: string;
  desc: string;
}

interface ProductFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Product) => void;
  editData?: Product | null;
}

const categories = [
  "Electronics",
  "Apparel", 
  "Home & Kitchen",
  "Accessories",
  "Gadgets",
];

const ProductForm = ({ open, onClose, onSubmit, editData }: ProductFormProps) => {
  const [formData, setFormData] = useState<Product>({
    name: "",
    size: "",
    color: "",
    category: "",
    image: "",
    price: "",
    desc: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({
        name: "",
        desc: "",
        price: "",
        category: "",
        size: "",
        color: "",
        image: "",
      });
    }
  }, [editData, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Rest of your JSX remains exactly the same...
  return (
    <>
      {/* Overlay Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-full sm:w-[450px] bg-white shadow-2xl transition-transform duration-300 ease-in-out transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <form onSubmit={handleFormSubmit} className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 bg-[#F8FAFC] flex items-center justify-between border-b border-[#E5EAF2]">
            <div>
              <h2 className="text-xl font-extrabold text-[#1E293B]">
                {editData ? "Edit Product" : "New Product"}
              </h2>
              <p className="text-xs text-[#64748B] mt-1">
                Fill in the details to update your warehouse stock.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 bg-white border border-[#E5EAF2] rounded-xl hover:bg-gray-50 transition-colors text-[#1E293B]"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#475569]">Product Name</label>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none transition-all text-[#1E293B]"
                placeholder="Enter product name"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#475569]">Description</label>
              <textarea
                name="desc"
                rows={3}
                value={formData.desc}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none transition-all text-[#1E293B] resize-none"
                placeholder="Briefly describe the item"
              />
            </div>

            {/* Category & Price */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[#475569]">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#6366F1] outline-none transition-all text-[#1E293B] bg-white"
                >
                  <option value="">Select</option>
                  {categories.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[#475569]">Price</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">₹</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#6366F1] outline-none transition-all text-[#1E293B]"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Size & Color */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[#475569]">Size</label>
                <input
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#6366F1] outline-none transition-all text-[#1E293B]"
                  placeholder="e.g. XL, 42"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[#475569]">Color</label>
                <input
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#6366F1] outline-none transition-all text-[#1E293B]"
                  placeholder="e.g. Blue"
                />
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#475569]">Image URL</label>
              <div className="relative">
                <UploadCloud className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
                <input
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#6366F1] outline-none transition-all text-[#1E293B]"
                  placeholder="https://images.com/product.jpg"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-t border-[#E5EAF2] bg-[#F8FAFC]">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-[#CBD5E1] text-[#64748B] font-bold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-[#6366F1] text-white font-bold rounded-xl hover:bg-[#4F46E5] flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-100"
              >
                <Save size={18} />
                {editData ? "Update Item" : "Save Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductForm;

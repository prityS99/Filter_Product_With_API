"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../compo/Navbar";
import { Loader2, PackagePlus } from "lucide-react";

export default function CreateProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    desc: "",
    brand: "",
    image: "", // Added image field
    size: [] as string[],
    color: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, type: "size" | "color") => {
    const { value, checked } = e.target;
    let updated = [...formData[type]];

    if (checked) updated.push(value);
    else updated = updated.filter((item) => item !== value);

    setFormData({ ...formData, [type]: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:4002/api/v1/create/products",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            price: Number(formData.price), // Ensure price is a number
          }),
        }
      );
      const data = await res.json();
      if (data.success) {
        router.push("/");
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      {/* <Navbar /> */}

      <div className="max-w-2xl mx-auto mt-12 px-4">
        <div className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden">
          <div className="bg-slate-900 p-6 text-white flex items-center gap-3">
            <PackagePlus size={24} className="text-emerald-400" />
            <h2 className="text-xl font-bold">Add New Product</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Product Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Slim Fit Denim Shirt"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Brand</label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white"
                >
                  <option value="">Select Brand</option>
                  <option value="Levi's">Levi's</option>
                  <option value="H&M">H&M</option>
                  <option value="Zara">Zara</option>
                  <option value="Nike">Nike</option>
                  <option value="Adidas">Adidas</option>
                </select>
              </div>
            </div>

            {/* Image URL */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Image URL</label>
              <input
                type="text"
                name="image"
                placeholder="https://images.unsplash.com/..."
                value={formData.image}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none transition"
              />
            </div>

            {/* Size & Color row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-3">Available Sizes</p>
                <div className="flex gap-3 flex-wrap">
                  {["S", "M", "L", "XL", "XXL"].map((s) => (
                    <label key={s} className={`flex items-center justify-center min-w-[40px] h-10 border rounded-lg cursor-pointer transition-all ${formData.size.includes(s) ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-bold' : 'bg-white border-slate-200 text-slate-600'}`}>
                      <input
                        type="checkbox"
                        value={s}
                        onChange={(e) => handleCheckboxChange(e, "size")}
                        className="hidden"
                      />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-700 mb-3">Colors</p>
                <div className="flex gap-2 flex-wrap">
                  {["white", "purple", "blue", "black", "red"].map((c) => (
                    <label key={c} className={`px-3 py-1.5 border rounded-full text-xs font-medium cursor-pointer transition-all capitalize ${formData.color.includes(c) ? 'bg-slate-800 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-600'}`}>
                      <input
                        type="checkbox"
                        value={c}
                        onChange={(e) => handleCheckboxChange(e, "color")}
                        className="hidden"
                      />
                      {c}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
              <textarea
                rows={4}
                name="desc"
                placeholder="Enter detailed product description..."
                value={formData.desc}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none transition"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Publish Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
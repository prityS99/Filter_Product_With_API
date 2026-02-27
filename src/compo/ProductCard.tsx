"use client";

import Link from "next/link";
import { Trash2, Edit3, ExternalLink } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  size: string[];
  color: string[];
  brand: string;
  price: number;
  image?: string;
}

const ProductCard = ({
  product,
  onDelete,
}: {
  product: Product;
  onDelete: (id: string) => void;
}) => {
  return (
    <div className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden h-full">
      {/* 1. Image Section */}
      {product.image && (
        <div className="h-48 bg-gray-50 overflow-hidden relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onDelete(product._id)}
              className="p-1.5 bg-white/90 hover:bg-red-50 text-red-600 rounded-lg shadow-sm border border-gray-100 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}

      {/* 2. Content Section */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-0.5">{product.brand}</p>
          <h5 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h5>
        </div>

        {/* 3. Sizes Row */}
        <div className="flex items-center gap-2 mb-2 overflow-hidden">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Sizes:</span>
          <div className="flex flex-wrap gap-1">
            {product.size.map((s) => (
              <span key={s} className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded border border-blue-100">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* 4. Colors Row */}
        <div className="flex items-center gap-2 mb-3 overflow-hidden">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Colors:</span>
          <div className="flex flex-wrap gap-1">
            {product.color.map((c) => (
              <span key={c} className="px-1.5 py-0.5 bg-gray-50 text-gray-600 text-[10px] font-medium rounded border border-gray-200 capitalize">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* 5. Price & Actions */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-50">
          <span className="text-lg font-bold text-teal-600">
            ₹{product.price.toLocaleString()}
          </span>
          
          <div className="flex gap-2">
            {/* THIS LINK TRIGGERS YOUR EDIT PAGE */}
            <Link
              href={`/products/${product._id}/edit`}
              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="Edit Product"
            >
              <Edit3 size={16} />
            </Link>
            
            <Link
              href={`/products/${product._id}`}
              className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-gray-100 rounded-md transition-colors"
              title="View Details"
            >
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

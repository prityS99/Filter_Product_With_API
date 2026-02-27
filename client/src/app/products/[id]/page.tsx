


"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProductDetails() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    fetch(`http://localhost:4002/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProduct(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Product not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {/* Product Name */}
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            {product.name}
          </h1>

          {/* Price */}
          <div className="mb-6">
            <p className="text-3xl font-bold text-emerald-700">
              ₹{product.price}
            </p>
          </div>

          {/* Sizes, Colors, Brand
           */}
          <div className="space-y-6 mb-8">
            {/* Sizes */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Sizes</h3>
              {product.size && product.size.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {product.size.map((size: string) => (
                    <span
                      key={size}
                      className="px-3 py-1 border rounded-md text-sm"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">N/A</p>
              )}
            </div>

            {/* Colors */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Colors</h3>
              {product.color && product.color.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {product.color.map((color: string) => (
                    <span
                      key={color}
                      className="px-3 py-1 border rounded-md text-sm capitalize"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">N/A</p>
              )}
            </div>

            {/* Brand */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Brand</h3>
              <span className="inline-block px-4 py-1 rounded-full bg-emerald-600 text-white text-sm">
                {product.brand || "N/A"}
              </span>
            </div>
          </div>

          <hr className="my-8" />

          {/* Description */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.desc}
            </p>
          </div>

          {/* Back Button */}
          <div className="flex justify-end">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-emerald-700 text-white px-6 py-3 rounded-md hover:bg-emerald-800 transition"
            >
              ← Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

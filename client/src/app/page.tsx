"use client";

import { useEffect, useState } from "react";
import {
  Package,
  Trash2,
} from "lucide-react";
import ProductForm from "../compo/ProductForm";
import SidebarFilter from "../compo/SidebarFilter";

import {
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../services/productServices";
import ProductCard from "@/compo/ProductCard";
import Navbar from "@/compo/Navbar";


interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  image?: string;
  desc: string;
  size: string[];
  color: string[];
  brand: string;
}

interface CreateProduct {
  name: string;
  category: string;
  price: number | string;
  image: string;
  desc: string;
  size: string[];
  color: string[];
  brand: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState<Product | null>(null);
  const [toast, setToast] = useState({ open: false, msg: "", type: "success" });
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 10000,
    size: [] as string[],
    color: [] as string[],
    brand: [] as string[],
  });

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      if (res.data && res.data.data) {

        const normalizedProducts: Product[] = res.data.data.map((p: any) => ({
          ...p,
          price: Number(p.price),
          size: p.size || [],
          color: p.color || [],
          brand: p.brand || '',
          category: p.category || 'General',
          desc: p.desc || ''
        }));
        setProducts(normalizedProducts);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


const handleSubmit = async (data: CreateProduct) => {
  try {
    const splitAndClean = (value: string | string[] | undefined): string[] => {
      if (!value) return [];
      const str = Array.isArray(value) ? value.join(', ') : value;
      return str.split(',').map(s => s.trim()).filter(Boolean);
    };

    const formattedData = {
      ...data,
      price: Number(data.price),
      size: splitAndClean(data.size),
      color: splitAndClean(data.color),
      brand: (data.brand ?? '').trim()
    };

    if (editData) {
      await updateProduct(editData._id, formattedData);
      showToast("Updated successfully", "success");
    } else {
      await createProduct(formattedData);
      showToast("Added successfully", "success");
    }
    setOpenForm(false);
    setEditData(null);
    fetchProducts();
  } catch (error) {
    console.error(error);
    showToast("Request failed", "error");
  }
};


const handleDelete = async (id: string) => {
  if (!window.confirm("Move to Trash?")) return;
  
  try {
    // 🚮 Move to trash instead of permanent delete
    await fetch(`/api/products/${id}/trash`, { method: 'PATCH' });
    
    // Remove from main list instantly
    setProducts(prev => prev.filter(p => p._id !== id));
    showToast("Moved to Trash", "info");
  } catch (error) {
    showToast("Failed to move to trash", "error");
  }
};


  const showToast = (msg: string, type: string) => {
    setToast({ open: true, msg, type });
    setTimeout(() => setToast((prev) => ({ ...prev, open: false })), 3000);
  };

const filteredProducts = products
  // Step 1: Search first (name, description, brand)
  .filter((product) =>
    !searchQuery ||
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  )
  // Step 2: Then apply your existing filters
  .filter((product) => {
    const matchesPrice =
      product.price >= filters.minPrice &&
      product.price <= filters.maxPrice;

    const matchesBrand =
      filters.brand.length === 0 ||
      filters.brand.includes(product.brand.trim());

    const matchesSize =
      filters.size.length === 0 ||
      filters.size.some((size) =>
        product.size
          .map((s) => s.trim().toLowerCase())
          .includes(size.trim().toLowerCase())
      );

    const matchesColor =
      filters.color.length === 0 ||
      filters.color.some((color) =>
        product.color
          .map((c) => c.trim().toLowerCase())
          .includes(color.trim().toLowerCase())
      );

    const matchesSizeOrColor = matchesSize || matchesColor;

    return matchesPrice && matchesBrand && matchesSizeOrColor;
  });


  return (

    <div className="flex flex-col min-h-screen bg-[#F4F7F9]">

      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="max-w-[1440px] w-full mx-auto mt-24 mb-12 px-4 md:px-8 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-72 shrink-0">
          <SidebarFilter onFilterChange={(newFilters) => setFilters(newFilters)} />
        </aside>


        <main className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">PRODUCT LIST </h2>

            </div>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((item) => {


              return (
                <ProductCard
                  key={item._id}
                  product={item}
                  onDelete={handleDelete}
                />
              );
            })}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <Package className="text-gray-300 mb-4" size={48} />
              <p className="text-gray-500 font-medium">No products found matching these filters.</p>
            </div>
          )}
        </main>
      </div>

      <footer className="py-8 border-t border-[#E5EAF2] bg-white text-center mt-auto">
        <p className="text-sm text-[#64748B] font-medium">
          GlobalHouse System Management © {new Date().getFullYear()} — Built by Prity Sarkar
        </p>
      </footer>

      {toast.open && (
        <div className={`fixed bottom-5 right-5 z-[100] flex items-center gap-3 px-6 py-3 rounded-xl shadow-2xl text-white ${toast.type === "success" ? "bg-emerald-500" : "bg-rose-500"
          }`}>
          <span className="font-semibold">{toast.msg}</span>
        </div>
      )}

      {openForm && (
        <ProductForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          onSubmit={handleSubmit}
          editData={editData}
        />
      )}
    </div>
  );
};

export default Home;


// lib/productApi.ts
import { Product } from "../types/products";

const BASE_URL = "http://localhost:4002/api/products";

export async function fetchFilteredProducts(filters: any) {
  const params = new URLSearchParams();

  if (filters.name) params.append("name", filters.name);
  if (filters.sizes.length) params.append("sizes", filters.sizes.join(","));
  if (filters.colors.length) params.append("colors", filters.colors.join(","));
  if (filters.brands.length) params.append("brands", filters.brands.join(","));
  if (filters.minPrice) params.append("minPrice", filters.minPrice);
  if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
  params.append("page", filters.page.toString());
  params.append("limit", filters.limit.toString());

  const res = await fetch(`${BASE_URL}/filter?${params.toString()}`, {
    cache: "no-store",
  });

  const json = await res.json();
  return json;
}

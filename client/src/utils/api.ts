// utils/api.ts
const API_BASE_URL = "http://localhost:4002/api"; // Your backend URL

export const fetchFilteredProducts = async (filters: any) => {
  const query = new URLSearchParams();

  if (filters.minPrice) query.append("minPrice", filters.minPrice.toString());
  if (filters.maxPrice) query.append("maxPrice", filters.maxPrice.toString());
  
  // Backend expects comma-separated strings for sizes, colors, brands
  if (filters.size?.length) query.append("sizes", filters.size.join(","));
  if (filters.color?.length) query.append("colors", filters.color.join(","));
  if (filters.brand?.length) query.append("brands", filters.brand.join(","));

  const response = await fetch(`${API_BASE_URL}/filter?${query.toString()}`);
  const result = await response.json();
  return result.success ? result.data : [];
};
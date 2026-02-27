"use client";

import { useState, useCallback } from "react";

interface FilterProps {
  onFilterChange: (filters: {
    minPrice: number;
    maxPrice: number;
    size: string[];
    color: string[];
    brand: string[];
  }) => void;
}

const SidebarFilter = ({ onFilterChange }: FilterProps) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const applyFilters = useCallback(
    (overrides: any = {}) => {
      onFilterChange({
        minPrice,
        maxPrice: overrides.maxPrice !== undefined ? overrides.maxPrice : maxPrice,
        size: overrides.size || selectedSizes,
        color: overrides.color || selectedColors,
        brand: overrides.brand || selectedBrands,
      });
    },
    [minPrice, maxPrice, selectedSizes, selectedColors, selectedBrands, onFilterChange]
  );

  const handleSizeChange = (size: string) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    setSelectedSizes(newSizes);
    applyFilters({ size: newSizes });
  };

  const handleColorChange = (color: string) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];
    setSelectedColors(newColors);
    applyFilters({ color: newColors });
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(newBrands);
    applyFilters({ brand: newBrands });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setMaxPrice(val);
  };

  const handlePriceChangeCommitted = (e: React.MouseEvent | React.TouchEvent | React.ChangeEvent) => {
    applyFilters({ maxPrice });
  };

  const clearAllFilters = () => {
    setMinPrice(0);
    setMaxPrice(10000);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedBrands([]);
    onFilterChange({ minPrice: 0, maxPrice: 10000, size: [], color: [], brand: [] });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 w-full max-w-[280px]">
      {/* Filter by Size */}
      <h3 className="text-lg font-bold text-gray-800 mb-4">Filter by Size</h3>
      <div className="flex flex-col gap-2 mb-8">
        {["S", "M", "L", "XL", "XXL"].map((size) => (
          <label key={size} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              checked={selectedSizes.includes(size)}
              onChange={() => handleSizeChange(size)}
            />
            <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{size}</span>
          </label>
        ))}
      </div>

      {/* Filter by Color */}
      <h3 className="text-lg font-bold text-gray-800 mb-4">Filter by Color</h3>
      <div className="flex flex-col gap-2 mb-8">
        {["white", "purple", "blue", "black", "red", "peach"].map((color) => (
          <label key={color} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              checked={selectedColors.includes(color)}
              onChange={() => handleColorChange(color)}
            />
            <span className="text-gray-600 capitalize group-hover:text-gray-900 transition-colors">
              {color}
            </span>
          </label>
        ))}
      </div>

      {/* Filter by Brand */}
      <h3 className="text-lg font-bold text-gray-800 mb-4">Filter by Brand</h3>
      <div className="flex flex-col gap-2 mb-8">
        {["Mufti", "Adidas", "Zara", "Nike"].map((brand) => (
          <label key={brand} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              checked={selectedBrands.includes(brand)}
              onChange={() => handleBrandChange(brand)}
            />
            <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{brand}</span>
          </label>
        ))}
      </div>

      {/* Filter by Price */}
      <h3 className="text-lg font-bold text-gray-800 mb-4">Filter by Price</h3>
      <div className="mb-6">
        <input
          type="range"
          min="0"
          max="10000"
          step="100"
          value={maxPrice}
          onChange={handlePriceChange}
          onMouseUp={handlePriceChangeCommitted}
          onTouchEnd={handlePriceChangeCommitted}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between mt-4">
          <span className="px-3 py-1 text-xs font-medium text-gray-600 border border-gray-200 rounded-full bg-gray-50">
            ₹{minPrice}
          </span>
          <span className="px-3 py-1 text-xs font-medium text-gray-600 border border-gray-200 rounded-full bg-gray-50">
            ₹{maxPrice}
          </span>
        </div>
      </div>

      <button
        onClick={clearAllFilters}
        className="w-full mt-4 py-2 text-sm font-semibold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all active:scale-95"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default SidebarFilter;
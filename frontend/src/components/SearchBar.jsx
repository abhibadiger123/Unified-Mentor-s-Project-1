// src/components/SearchBar.jsx

import { useState } from "react";
import {
  Search,
  RotateCcw,
  Car,
  Fuel,
  IndianRupee,
} from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    fuelType: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(filters);
    }
  };

  const handleReset = () => {
    const resetFilters = {
      search: "",
      type: "",
      fuelType: "",
      minPrice: "",
      maxPrice: "",
    };

    setFilters(resetFilters);

    if (onSearch) {
      onSearch(resetFilters);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">

      <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
        Search Vehicles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

        {/* Vehicle Name */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <input
            type="text"
            name="search"
            placeholder="Vehicle Name"
            value={filters.search}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>

        {/* Vehicle Type */}

        <div className="relative">

          <Car
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Vehicle Type</option>
            <option value="2W">2 Wheeler</option>
            <option value="4W">4 Wheeler</option>
          </select>

        </div>

        {/* Fuel Type */}

        <div className="relative">

          <Fuel
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <select
            name="fuelType"
            value={filters.fuelType}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="CNG">CNG</option>
          </select>

        </div>

        {/* Minimum Price */}

        <div className="relative">

          <IndianRupee
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>

        {/* Maximum Price */}

        <div className="relative">

          <IndianRupee
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>

      </div>

      {/* Buttons */}

      <div className="flex flex-wrap gap-4 mt-6">

        <button
          onClick={handleSearch}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          <Search size={18} />
          Search
        </button>

        <button
          onClick={handleReset}
          className="flex items-center gap-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 px-6 py-3 rounded-xl font-semibold transition"
        >
          <RotateCcw size={18} />
          Reset
        </button>

      </div>

    </div>
  );
};

export default SearchBar;
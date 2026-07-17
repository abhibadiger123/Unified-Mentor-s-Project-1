// src/components/FilterSidebar.jsx

import { useState } from "react";
import {
  Filter,
  Car,
  Fuel,
  Settings2,
  BadgeCheck,
  IndianRupee,
  ArrowUpDown,
  RotateCcw,
  Search,
} from "lucide-react";

const FilterSidebar = ({
  onApplyFilters,
  onResetFilters,
}) => {
  const [filters, setFilters] = useState({
    type: "",
    fuelType: "",
    transmission: "",
    status: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApply = () => {
    if (onApplyFilters) {
      onApplyFilters(filters);
    }
  };

  const handleReset = () => {
    const resetFilters = {
      type: "",
      fuelType: "",
      transmission: "",
      status: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
    };

    setFilters(resetFilters);

    if (onResetFilters) {
      onResetFilters(resetFilters);
    }
  };

  return (
    <aside className="w-full lg:w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">

      {/* ================================
          Header
      ================================= */}

      <div className="flex items-center gap-3 mb-6">

        <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center">

          <Filter
            size={22}
            className="text-white"
          />

        </div>

        <div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Filters
          </h2>

          <p className="text-sm text-slate-500">
            Refine vehicle results
          </p>

        </div>

      </div>

      {/* ================================
          Filter Form
      ================================= */}

      <div className="space-y-5">
                {/* ================================
            Vehicle Type
        ================================= */}

        <div>

          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">

            <Car
              size={18}
              className="text-indigo-600"
            />

            Vehicle Type

          </label>

          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Vehicles</option>
            <option value="2W">2 Wheeler</option>
            <option value="4W">4 Wheeler</option>
          </select>

        </div>

        {/* ================================
            Fuel Type
        ================================= */}

        <div>

          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">

            <Fuel
              size={18}
              className="text-indigo-600"
            />

            Fuel Type

          </label>

          <select
            name="fuelType"
            value={filters.fuelType}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Fuel Types</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="CNG">CNG</option>
          </select>

        </div>

        {/* ================================
            Transmission
        ================================= */}

        <div>

          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">

            <Settings2
              size={18}
              className="text-indigo-600"
            />

            Transmission

          </label>

          <select
            name="transmission"
            value={filters.transmission}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Transmissions</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>

        </div>
                {/* ================================
            Vehicle Status
        ================================= */}

        <div>

          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">

            <BadgeCheck
              size={18}
              className="text-indigo-600"
            />

            Vehicle Status

          </label>

          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="rented">Rented</option>
            <option value="maintenance">Maintenance</option>
          </select>

        </div>

        {/* ================================
            Minimum Price
        ================================= */}

        <div>

          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">

            <IndianRupee
              size={18}
              className="text-indigo-600"
            />

            Minimum Daily Price

          </label>

          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="e.g. 500"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>

        {/* ================================
            Maximum Price
        ================================= */}

        <div>

          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">

            <IndianRupee
              size={18}
              className="text-indigo-600"
            />

            Maximum Daily Price

          </label>

          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="e.g. 3000"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>

        {/* ================================
            Sort By
        ================================= */}

        <div>

          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">

            <ArrowUpDown
              size={18}
              className="text-indigo-600"
            />

            Sort By

          </label>

          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Default</option>
            <option value="priceLowToHigh">
              Price : Low → High
            </option>
            <option value="priceHighToLow">
              Price : High → Low
            </option>
            <option value="newest">
              Newest Vehicles
            </option>
            <option value="oldest">
              Oldest Vehicles
            </option>
          </select>

        </div>

        {/* ================================
            Action Buttons
        ================================= */}

        <div className="pt-4 space-y-3">

          <button
            type="button"
            onClick={handleApply}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            <Search size={18} />
            Apply Filters
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-3 font-semibold transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <RotateCcw size={18} />
            Clear Filters
          </button>

        </div>

      </div>

    </aside>
  );
};

export default FilterSidebar;
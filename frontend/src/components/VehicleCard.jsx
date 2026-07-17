// src/components/VehicleCard.jsx

import { Link } from "react-router-dom";
import {
  Car,
  Bike,
  Calendar,
  Fuel,
  Cog,
  IndianRupee,
  Building2,
  ArrowRight,
} from "lucide-react";

const VehicleCard = ({ vehicle }) => {
  if (!vehicle) return null;

  const {
    _id,
    name,
    type,
    brand,
    modelYear,
    fuelType,
    transmission,
    pricing,
    status,
    agencyId,
    image,
  } = vehicle;

  const statusColor = {
    available:
      "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    booked:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    rented:
      "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    maintenance:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
    inactive:
      "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  };

  // Fallback Base URL configuration for local files (Change port 5000 if your backend runs on a different port)
  const BACKEND_URL = "http://localhost:5000";
  const getImageUrl = (imgStr) => {
    if (!imgStr) return null;
    return imgStr.startsWith("http://") || imgStr.startsWith("https://") 
      ? imgStr 
      : `${BACKEND_URL}${imgStr.startsWith("/") ? "" : "/"}${imgStr}`;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-800">

      {/* Vehicle Image */}
      <div className="h-56 bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
        {image ? (
          <img
            src={getImageUrl(image)}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Commented out 'display = none' so you can see if the route throws a 404 error instead of a blank box
              console.error(`Failed to load image at: ${e.currentTarget.src}`);
              // e.currentTarget.style.display = "none"; 
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {type === "2W" ? (
              <Bike size={90} className="text-indigo-600" />
            ) : (
              <Car size={90} className="text-indigo-600" />
            )}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {name}
            </h2>
            <p className="text-slate-500 mt-1">
              {brand}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
              statusColor[status] ||
              "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            {status}
          </span>
        </div>

        {/* Details */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3">
            <Calendar size={18} className="text-indigo-500" />
            <span className="text-slate-700 dark:text-slate-300">Model: {modelYear}</span>
          </div>

          <div className="flex items-center gap-3">
            <Fuel size={18} className="text-indigo-500" />
            <span className="text-slate-700 dark:text-slate-300">Fuel: {fuelType}</span>
          </div>

          <div className="flex items-center gap-3">
            <Cog size={18} className="text-indigo-500" />
            <span className="text-slate-700 dark:text-slate-300">{transmission}</span>
          </div>

          <div className="flex items-center gap-3">
            <Building2 size={18} className="text-indigo-500" />
            <span className="text-slate-700 dark:text-slate-300">
              Agency: {agencyId?.name || "N/A"}
            </span>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-6 p-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <IndianRupee size={18} />
              Daily
            </span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">
              ₹{pricing?.daily ?? 0}
            </span>
          </div>

          <div className="flex justify-between items-center mt-2">
            <span>Weekly</span>
            <span className="font-bold">
              ₹{pricing?.weekly ?? 0}
            </span>
          </div>

          <div className="flex justify-between items-center mt-2">
            <span>Monthly</span>
            <span className="font-bold">
              ₹{pricing?.monthly ?? 0}
            </span>
          </div>
        </div>

        {/* Footer Link to Details */}
        <div className="mt-6">
          <Link
            to={`/vehicles/${_id}`}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-semibold transition"
          >
            View Details
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
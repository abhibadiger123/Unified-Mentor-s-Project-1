// src/components/DashboardCard.jsx

import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const DashboardCard = ({
  title,
  value,
  icon: Icon,
  color = "indigo",
  trend,
  trendType = "up",
  description,
  link,
  linkText = "View Details",
}) => {
  const colorClasses = {
    indigo: {
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      icon: "bg-indigo-600 text-white",
      text: "text-indigo-600",
      border: "border-indigo-200 dark:border-indigo-800",
    },

    green: {
      bg: "bg-green-50 dark:bg-green-900/20",
      icon: "bg-green-600 text-white",
      text: "text-green-600",
      border: "border-green-200 dark:border-green-800",
    },

    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      icon: "bg-blue-600 text-white",
      text: "text-blue-600",
      border: "border-blue-200 dark:border-blue-800",
    },

    yellow: {
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      icon: "bg-yellow-500 text-white",
      text: "text-yellow-600",
      border: "border-yellow-200 dark:border-yellow-800",
    },

    red: {
      bg: "bg-red-50 dark:bg-red-900/20",
      icon: "bg-red-600 text-white",
      text: "text-red-600",
      border: "border-red-200 dark:border-red-800",
    },

    purple: {
      bg: "bg-purple-50 dark:bg-purple-900/20",
      icon: "bg-purple-600 text-white",
      text: "text-purple-600",
      border: "border-purple-200 dark:border-purple-800",
    },
  };

  const selected =
    colorClasses[color] || colorClasses.indigo;

  return (
    <div
      className={`rounded-2xl border ${selected.border} ${selected.bg}
      shadow-md hover:shadow-xl transition-all duration-300 p-6`}
    >

      {/* ===========================
          Header
      =========================== */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">

            {title}

          </p>

          <h2 className="mt-3 text-4xl font-black text-slate-900 dark:text-white">

            {value}

          </h2>

        </div>

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center ${selected.icon}`}
        >

          {Icon && (
            <Icon
              size={30}
            />
          )}

        </div>

      </div>

      {/* ===========================
          Description
      =========================== */}

      {description && (

        <p className="mt-5 text-sm text-slate-600 dark:text-slate-400">

          {description}

        </p>

      )}

      {/* ===========================
          Footer
      =========================== */}

      <div className="mt-6 flex items-center justify-between">

        {/* Trend */}

        {trend !== undefined ? (

          <div
            className={`flex items-center gap-2 text-sm font-semibold ${
              trendType === "up"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >

            {trendType === "up" ? (
              <ArrowUpRight size={18} />
            ) : (
              <ArrowDownRight size={18} />
            )}

            <span>{trend}</span>

          </div>

        ) : (
          <div />
        )}

        {/* View Details */}

        {link && (
          <Link
            to={link}
            className={`text-sm font-semibold ${selected.text} hover:underline`}
          >
            {linkText}
          </Link>
        )}

      </div>

    </div>
  );
};

export default DashboardCard;
// src/pages/NotFound.jsx

import { Link, useNavigate } from "react-router-dom";
import { TriangleAlert, ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 px-6">
      <div className="max-w-lg w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-10 text-center">
        {/* Icon */}
        <div className="mx-auto w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <TriangleAlert size={48} className="text-red-600" />
        </div>

        {/* 404 */}
        <h1 className="mt-8 text-6xl font-black text-slate-900 dark:text-white">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-3 text-2xl font-bold text-slate-800 dark:text-slate-100">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-slate-500 dark:text-slate-400">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

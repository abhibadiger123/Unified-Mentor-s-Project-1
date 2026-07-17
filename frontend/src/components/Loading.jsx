// src/components/Loading.jsx

import { LoaderCircle } from "lucide-react";

const Loading = ({
  message = "Loading...",
  fullScreen = false,
  size = "medium",
}) => {

  const sizeClasses = {
    small: "w-5 h-5",
    medium: "w-10 h-10",
    large: "w-16 h-16",
  };

  return (

    <div
      className={
        fullScreen
          ? "fixed inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm z-50"
          : "flex flex-col items-center justify-center py-10"
      }
    >

      {/* Spinner */}

      <LoaderCircle
        className={`${sizeClasses[size]} text-indigo-600 animate-spin`}
      />


      {/* Message */}

      {message && (

        <p className="mt-4 text-slate-600 dark:text-slate-300 font-medium">

          {message}

        </p>

      )}

    </div>

  );
};

export default Loading;
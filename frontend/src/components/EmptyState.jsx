// src/components/EmptyState.jsx

import { Link } from "react-router-dom";
import {
  Inbox,
  Plus,
  RefreshCcw,
} from "lucide-react";

const EmptyState = ({
  icon: Icon = Inbox,
  title = "No Data Found",
  message = "There is nothing to display here.",
  actionText,
  actionLink,
  onAction,
}) => {

  return (

    <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">


      {/* Icon */}

      <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6">

        <Icon
          size={40}
          className="text-indigo-600 dark:text-indigo-400"
        />

      </div>


      {/* Title */}

      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

        {title}

      </h2>


      {/* Message */}

      <p className="mt-3 max-w-md text-slate-500 dark:text-slate-400">

        {message}

      </p>


      {/* Action Button */}

      {(actionText && actionLink) && (

        <Link
          to={actionLink}
          className="mt-6 flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 font-semibold transition"
        >

          <Plus size={18} />

          {actionText}

        </Link>

      )}


      {actionText && !actionLink && onAction && (

        <button
          onClick={onAction}
          className="mt-6 flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 font-semibold transition"
        >

          <RefreshCcw size={18} />

          {actionText}

        </button>

      )}

    </div>

  );

};

export default EmptyState;
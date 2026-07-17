// src/components/BookingCard.jsx

import { Car, User, Calendar, IndianRupee, BadgeCheck } from "lucide-react";

const BookingCard = ({
  booking,
  userRole,
  onApprove,
  onReject,
  onComplete,
  onDelete,
  onCancel,
}) => {
  if (!booking) return null;

  const {
    _id,
    customerId,
    vehicleId,
    startDate,
    endDate,
    totalCost,
    status,
    createdAt,
  } = booking;

  const statusClasses = {
    pending:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",

    approved:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",

    rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",

    completed:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* ===========================
          Header
      =========================== */}

      <div className="bg-indigo-600 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
            <Car size={24} className="text-white" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">
              {vehicleId?.name || "Vehicle"}
            </h2>

            <p className="text-indigo-100 text-sm">{vehicleId?.brand || ""}</p>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
            statusClasses[status]
          }`}
        >
          {status}
        </span>
      </div>

      {/* ===========================
          Card Body
      =========================== */}

      <div className="p-6 space-y-5">
        {/* Vehicle Information */}

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
            Vehicle Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Car size={18} className="text-indigo-600" />

              <span>
                <strong>Name:</strong> {vehicleId?.name || "N/A"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <BadgeCheck size={18} className="text-indigo-600" />

              <span>
                <strong>Type:</strong> {vehicleId?.type || "N/A"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <BadgeCheck size={18} className="text-indigo-600" />

              <span>
                <strong>Fuel:</strong> {vehicleId?.fuelType || "N/A"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <BadgeCheck size={18} className="text-indigo-600" />

              <span>
                <strong>Transmission:</strong>{" "}
                {vehicleId?.transmission || "N/A"}
              </span>
            </div>
          </div>
        </div>
        {/* ===========================
            Customer Information
        =========================== */}

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
            Customer Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <User size={18} className="text-indigo-600" />

              <span>
                <strong>Name:</strong> {customerId?.name || "N/A"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <User size={18} className="text-indigo-600" />

              <span>
                <strong>Email:</strong> {customerId?.email || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* ===========================
            Booking Dates
        =========================== */}

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
            Booking Schedule
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-indigo-600" />

              <span>
                <strong>Start Date:</strong> {formatDate(startDate)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-indigo-600" />

              <span>
                <strong>End Date:</strong> {formatDate(endDate)}
              </span>
            </div>
          </div>
        </div>

        {/* ===========================
            Payment Summary
        =========================== */}

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
            Payment Summary
          </h3>

          <div className="rounded-xl bg-slate-100 dark:bg-slate-800 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <IndianRupee size={18} className="text-indigo-600" />
                Total Cost
              </span>

              <span className="font-bold text-lg">₹{totalCost}</span>
            </div>

            <div className="flex items-center justify-between">
              <span>Booking Status</span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                  statusClasses[status]
                }`}
              >
                {status}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Booked On</span>

              <span>{formatDate(createdAt)}</span>
            </div>
          </div>
        </div>
        {/* ===========================
            Actions
        =========================== */}

        <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
          <div className="flex flex-wrap gap-3">
            {/* ===========================
                CUSTOMER
            =========================== */}

            {userRole === "customer" && status === "pending" && (
              <button
                type="button"
                onClick={() => onCancel?.(_id)}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition"
              >
                Cancel Booking
              </button>
            )}

            {/* ===========================
                AGENCY / ADMIN
            =========================== */}

            {(userRole === "agency" || userRole === "admin") &&
              status === "pending" && (
                <>
                  <button
                    type="button"
                    onClick={() => onApprove?.(_id)}
                    className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition"
                  >
                    Approve
                  </button>

                  <button
                    type="button"
                    onClick={() => onReject?.(_id)}
                    className="px-5 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition"
                  >
                    Reject
                  </button>
                </>
              )}

            {(userRole === "agency" || userRole === "admin") &&
              status === "approved" && (
                <button
                  type="button"
                  onClick={() => onComplete?.(_id)}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
                >
                  Mark as Completed
                </button>
              )}

            {/* ===========================
                ADMIN ONLY
            =========================== */}

            {userRole === "admin" && (
              <button
                type="button"
                onClick={() => onDelete?.(_id)}
                className="px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-semibold transition"
              >
                Delete Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;

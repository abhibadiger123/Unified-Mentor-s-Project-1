// src/pages/admin/ManageBookings.jsx

import { useEffect, useMemo, useState } from "react";

import {
  Search,
  CalendarDays,
  Car,
  User,
  Building2,
  CheckCircle,
  XCircle,
  Trash2,
} from "lucide-react";

import axios from "../../api/axios";

import useAuth from "../../hooks/useAuth";

import Loading from "../../components/Loading";

import EmptyState from "../../components/EmptyState";

import { formatDate, formatPrice } from "../../utils/formatters";

import { getErrorMessage } from "../../utils/helpers";

const ManageBookings = () => {
  const { token } = useAuth();

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("all");

  // ============================
  // Fetch All Bookings
  // ============================

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "/admin/bookings",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setBookings(response.data.bookings);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ============================
  // Filter Bookings
  // ============================

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const vehicle = booking.vehicleId?.name?.toLowerCase() || "";

      const customer = booking.customerId?.name?.toLowerCase() || "";

      const agency = booking.vehicleId?.ownerId?.name?.toLowerCase() || "";

      const text = search.toLowerCase();

      const matchesSearch =
        vehicle.includes(text) ||
        customer.includes(text) ||
        agency.includes(text);

      const matchesStatus = status === "all" || booking.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, status]);

  // ============================
  // Update Status
  // ============================

  const updateStatus = async (
    id,

    newStatus,
  ) => {
    try {
      await axios.put(
        `/admin/bookings/${id}/status`,

        {
          status: newStatus,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchBookings();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  // ============================
  // Delete Booking
  // ============================

  const deleteBooking = async (id) => {
    const confirmDelete = window.confirm("Delete this booking?");

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `/admin/bookings/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchBookings();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (loading) {
    return <Loading message="Loading bookings..." />;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Manage Bookings
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Monitor and manage all rental transactions.
          </p>
        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-xl bg-red-100 dark:bg-red-900/30 p-4 text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        {/* Search & Filter */}

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-5 mb-8">
          <div className="grid md:grid-cols-2 gap-5">
            {/* Search */}

            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search booking..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-style pl-11"
              />
            </div>

            {/* Status Filter */}

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="input-style"
            >
              <option value="all">All Status</option>

              <option value="pending">Pending</option>

              <option value="approved">Approved</option>

              <option value="completed">Completed</option>

              <option value="cancelled">Cancelled</option>

              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Booking Table */}

        {filteredBookings.length === 0 ? (
          <EmptyState
            title="No bookings found"
            description="Bookings will appear here."
          />
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-slate-700">
                    <th className="p-5 text-left">Vehicle</th>

                    <th className="p-5 text-left">Customer</th>

                    <th className="p-5 text-left">Agency</th>

                    <th className="p-5 text-left">Dates</th>

                    <th className="p-5 text-left">Amount</th>

                    <th className="p-5 text-left">Status</th>

                    <th className="p-5 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="border-b dark:border-slate-800"
                    >
                      {/* Vehicle */}

                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <Car size={22} className="text-indigo-600" />

                          <span className="font-bold">
                            {booking.vehicleId?.name || "Vehicle"}
                          </span>
                        </div>
                      </td>

                      {/* Customer */}

                      <td>
                        <div>
                          <p className="font-bold">
                            {booking.customerId?.name || "Customer"}
                          </p>

                          <p className="text-sm text-slate-500">
                            {booking.customerId?.email || "-"}
                          </p>
                        </div>
                      </td>

                      {/* Agency */}

                      <td>
                        <div>
                          <p className="font-bold">
                            {booking.vehicleId?.ownerId?.name || "Agency"}
                          </p>
                        </div>
                      </td>

                      {/* Dates */}

                      <td>
                        <div className="text-sm">
                          <p>{formatDate(booking.startDate)}</p>

                          <p>{formatDate(booking.endDate)}</p>
                        </div>
                      </td>

                      {/* Amount */}

                      <td className="font-bold text-indigo-600">
                        {formatPrice(booking.totalCost)}
                      </td>

                      {/* Status */}

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold capitalize

                              ${
                                booking.status === "approved"
                                  ? "bg-green-100 text-green-700"
                                  : booking.status === "pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : booking.status === "completed"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-red-100 text-red-700"
                              }

                              `}
                        >
                          {booking.status}
                        </span>
                      </td>

                      {/* Actions */}

                      <td>
                        <div className="flex items-center gap-3">
                          {/* Approve */}

                          {booking.status === "pending" && (
                            <button
                              onClick={() =>
                                updateStatus(
                                  booking._id,

                                  "approved",
                                )
                              }
                              className="p-2 rounded-xl bg-green-100 text-green-600 hover:bg-green-200"
                              title="Approve Booking"
                            >
                              <CheckCircle size={18} />
                            </button>
                          )}

                          {/* Complete */}

                          {booking.status === "approved" && (
                            <button
                              onClick={() =>
                                updateStatus(
                                  booking._id,

                                  "completed",
                                )
                              }
                              className="p-2 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200"
                              title="Complete Booking"
                            >
                              <CalendarDays size={18} />
                            </button>
                          )}

                          {/* Cancel */}

                          {(booking.status === "pending" ||
                            booking.status === "approved") && (
                            <button
                              onClick={() =>
                                updateStatus(
                                  booking._id,

                                  "cancelled",
                                )
                              }
                              className="p-2 rounded-xl bg-orange-100 text-orange-600 hover:bg-orange-200"
                              title="Cancel Booking"
                            >
                              <XCircle size={18} />
                            </button>
                          )}

                          {/* Delete */}

                          <button
                            onClick={() => deleteBooking(booking._id)}
                            className="p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200"
                            title="Delete Booking"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;

// src/pages/customer/MyBookings.jsx

import { useEffect, useMemo, useState } from "react";
import { Search, CalendarDays } from "lucide-react";

import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

import BookingCard from "../../components/BookingCard";
import Loading from "../../components/Loading";
import EmptyState from "../../components/EmptyState";

import { getErrorMessage } from "../../utils/helpers";

const MyBookings = () => {

  const { token } = useAuth();

  const [loading, setLoading] = useState(true);

  const [bookings, setBookings] = useState([]);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("all");

  // ============================
  // Fetch Bookings
  // ============================

  const fetchBookings = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        "/bookings/my",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
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
  // Filtered Bookings
  // ============================

  const filteredBookings = useMemo(() => {

    return bookings.filter((booking) => {

      const vehicleName =
        booking.vehicleId?.name?.toLowerCase() || "";

      const matchesSearch =
        vehicleName.includes(search.toLowerCase());

      const matchesStatus =
        status === "all" ||
        booking.status === status;

      return matchesSearch && matchesStatus;

    });

  }, [bookings, search, status]);
    if (loading) {
    return (
      <Loading message="Loading your bookings..." />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">

      <div className="max-w-7xl mx-auto">

        {/* ============================
            Header
        ============================ */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>

            <h1 className="text-3xl font-black text-slate-900 dark:text-white">
              My Bookings
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              View and manage all your vehicle bookings.
            </p>

          </div>

        </div>

        {/* ============================
            Error Message
        ============================ */}

        {error && (
          <div className="mb-6 rounded-xl bg-red-100 dark:bg-red-900/30 p-4 text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        {/* ============================
            Search & Filter
        ============================ */}

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-5 mb-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Search */}

            <div className="relative">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search by vehicle name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            {/* Status Filter */}

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Bookings</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>

          </div>

        </div>

        {/* ============================
            Booking List
        ============================ */}

        {filteredBookings.length === 0 ? (

          <EmptyState
            title="No bookings found"
            description="No bookings match your current search or filter."
          />

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {filteredBookings.map((booking) => (

              <BookingCard
                key={booking._id}
                booking={booking}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  );

};

export default MyBookings;
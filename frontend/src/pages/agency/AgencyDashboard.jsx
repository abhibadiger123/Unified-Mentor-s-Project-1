// src/pages/agency/AgencyDashboard.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Car,
  CalendarDays,
  Clock3,
  Wallet,
  PlusCircle,
  CheckCircle2,
} from "lucide-react";

import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

import Loading from "../../components/Loading";
import EmptyState from "../../components/EmptyState";
import DashboardCard from "../../components/DashboardCard";

import { formatPrice, formatDate } from "../../utils/formatters";

import { getErrorMessage } from "../../utils/helpers";

const AgencyDashboard = () => {
  const { token, user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [vehicles, setVehicles] = useState([]);

  const [bookings, setBookings] = useState([]);

  const [error, setError] = useState("");

  const [stats, setStats] = useState({
    totalVehicles: 0,
    availableVehicles: 0,
    totalBookings: 0,
    pendingBookings: 0,
    earnings: 0,
  });

  // ============================
  // Fetch Dashboard Data
  // ============================

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const [vehicleRes, bookingRes] = await Promise.all([
        axios.get("/vehicles/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        axios.get("/bookings/agency", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const vehicleData = vehicleRes.data.vehicles || [];

      const bookingData = bookingRes.data.bookings || [];

      setVehicles(vehicleData);

      setBookings(bookingData);

      setStats({
        totalVehicles: vehicleData.length,

        availableVehicles: vehicleData.filter(
          (vehicle) => vehicle.status === "available",
        ).length,

        totalBookings: bookingData.length,

        pendingBookings: bookingData.filter(
          (booking) => booking.status === "pending",
        ).length,

        earnings: bookingData.reduce(
          (sum, booking) => sum + booking.totalCost,
          0,
        ),
      });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);
  if (loading) {
    return <Loading message="Loading agency dashboard..." />;
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
              Welcome, {user?.name}
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Manage your vehicles, bookings and business performance.
            </p>
          </div>

          <Link
            to="/agency/add-vehicle"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition"
          >
            <PlusCircle size={20} />
            Add Vehicle
          </Link>
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
            Dashboard Statistics
        ============================ */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
          <DashboardCard
            title="Total Vehicles"
            value={stats.totalVehicles}
            icon={Car}
          />

          <DashboardCard
            title="Available"
            value={stats.availableVehicles}
            icon={CheckCircle2}
          />

          <DashboardCard
            title="Bookings"
            value={stats.totalBookings}
            icon={CalendarDays}
          />

          <DashboardCard
            title="Pending"
            value={stats.pendingBookings}
            icon={Clock3}
          />

          <DashboardCard
            title="Revenue"
            value={formatPrice(stats.earnings)}
            icon={Wallet}
          />
        </div>

        {/* ============================
            Quick Actions
        ============================ */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <Link
            to="/agency/add-vehicle"
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <PlusCircle size={36} className="text-indigo-600 mb-4" />

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Add Vehicle
            </h2>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Register a new vehicle for customers.
            </p>
          </Link>

          <Link
            to="/agency/manage-vehicles"
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <Car size={36} className="text-green-600 mb-4" />

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Manage Vehicles
            </h2>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Edit, update or remove your vehicles.
            </p>
          </Link>

          <Link
            to="/agency/bookings"
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <CalendarDays size={36} className="text-orange-600 mb-4" />

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Agency Bookings
            </h2>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Review and manage customer bookings.
            </p>
          </Link>
        </div>

        {/* ============================
            Recent Bookings
        ============================ */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Recent Bookings
            </h2>

            <Link
              to="/agency/bookings"
              className="text-indigo-600 font-bold hover:underline"
            >
              View All
            </Link>
          </div>

          {bookings.length === 0 ? (
            <EmptyState
              title="No Bookings Yet"
              description="Customer bookings will appear here."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b dark:border-slate-700">
                    <th className="text-left py-3">Customer</th>
                    <th className="text-left py-3">Vehicle</th>
                    <th className="text-left py-3">Start</th>
                    <th className="text-left py-3">End</th>
                    <th className="text-left py-3">Status</th>
                    <th className="text-right py-3">Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.slice(0, 5).map((booking) => (
                    <tr
                      key={booking._id}
                      className="border-b dark:border-slate-800"
                    >
                      <td className="py-4">
                        {booking.customerId?.name || "Customer"}
                      </td>

                      <td>{booking.vehicleId?.name || "Vehicle"}</td>

                      <td>{formatDate(booking.startDate)}</td>

                      <td>{formatDate(booking.endDate)}</td>

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            booking.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : booking.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : booking.status === "completed"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-red-100 text-red-700"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>

                      <td className="text-right font-bold">
                        {formatPrice(booking.totalCost)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgencyDashboard;

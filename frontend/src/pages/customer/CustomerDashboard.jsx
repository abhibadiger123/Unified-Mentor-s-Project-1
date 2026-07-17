// src/pages/customer/CustomerDashboard.jsx

import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import { CalendarDays, Car, Clock3, CheckCircle2, Wallet } from "lucide-react";

import axios from "../../api/axios";

import useAuth from "../../hooks/useAuth";

import Loading from "../../components/Loading";
import EmptyState from "../../components/EmptyState";
import DashboardCard from "../../components/DashboardCard";

import { formatPrice, formatDate } from "../../utils/formatters";

import { getErrorMessage } from "../../utils/helpers";

const CustomerDashboard = () => {
  const { user, token } = useAuth();

  const [loading, setLoading] = useState(true);

  const [bookings, setBookings] = useState([]);

  const [error, setError] = useState("");

  const [stats, setStats] = useState({
    total: 0,

    pending: 0,

    approved: 0,

    completed: 0,

    spent: 0,
  });

  // ============================
  // Fetch Bookings
  // ============================

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);

      setError("");

      const response = await axios.get(
        "/bookings/my",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        const data = response.data.bookings || [];

        setBookings(data);

        setStats({
          total: data.length,

          pending: data.filter((booking) => booking.status === "pending")
            .length,

          approved: data.filter((booking) => booking.status === "approved")
            .length,

          completed: data.filter((booking) => booking.status === "completed")
            .length,

          spent: data.reduce(
            (sum, booking) => sum + Number(booking.totalCost || 0),

            0,
          ),
        });
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  if (loading) {
    return <Loading message="Loading your dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">
              Welcome, {user?.name}
            </h1>

            <p className="mt-2 text-slate-500">
              Manage your bookings and track your rentals.
            </p>
          </div>

          <Link
            to="/"
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold"
          >
            Browse Vehicles
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-100 text-red-700">
            {error}
          </div>
        )}

        {/* Statistics */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
          <DashboardCard
            title="Total Bookings"
            value={stats.total}
            icon={CalendarDays}
          />

          <DashboardCard title="Pending" value={stats.pending} icon={Clock3} />

          <DashboardCard
            title="Approved"
            value={stats.approved}
            icon={CheckCircle2}
          />

          <DashboardCard title="Completed" value={stats.completed} icon={Car} />

          <DashboardCard
            title="Total Spent"
            value={formatPrice(stats.spent)}
            icon={Wallet}
          />
        </div>

        {/* Quick Actions */}

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          <Link
            to="/"
            className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6"
          >
            <Car size={32} />

            <h3 className="mt-4 font-bold">Browse Vehicles</h3>
          </Link>

          <Link
            to="/customer/bookings"
            className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6"
          >
            <CalendarDays size={32} />

            <h3 className="mt-4 font-bold">My Bookings</h3>
          </Link>

          <Link
            to="/customer/profile"
            className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6"
          >
            <Wallet size={32} />

            <h3 className="mt-4 font-bold">Profile</h3>
          </Link>
        </div>

        {/* Recent Bookings */}

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-black">Recent Bookings</h2>

            <Link to="/customer/bookings" className="text-indigo-600">
              View All
            </Link>
          </div>

          {bookings.length === 0 ? (
            <EmptyState
              title="No bookings yet"
              description="Book your first vehicle."
            />
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Vehicle</th>

                  <th>Start</th>

                  <th>End</th>

                  <th>Status</th>

                  <th>Cost</th>
                </tr>
              </thead>

              <tbody>
                {bookings.slice(0, 5).map((booking) => (
                  <tr key={booking._id} className="border-b">
                    <td className="py-4">
                      {booking.vehicleId?.name || "Vehicle"}
                    </td>

                    <td>{formatDate(booking.startDate)}</td>

                    <td>{formatDate(booking.endDate)}</td>

                    <td className="capitalize">{booking.status}</td>

                    <td>{formatPrice(booking.totalCost)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;

// src/pages/admin/AdminDashboard.jsx

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
  Users,
  Car,
  CalendarDays,
  Wallet,
  Building2,
  ShieldCheck,
} from "lucide-react";

import axios from "../../api/axios";

import useAuth from "../../hooks/useAuth";

import Loading from "../../components/Loading";

import DashboardCard from "../../components/DashboardCard";

import { formatPrice, formatDate } from "../../utils/formatters";

import { getErrorMessage } from "../../utils/helpers";

const AdminDashboard = () => {
  const { token, user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [users, setUsers] = useState([]);

  const [vehicles, setVehicles] = useState([]);

  const [bookings, setBookings] = useState([]);

  const [stats, setStats] = useState({
    users: 0,

    customers: 0,

    agencies: 0,

    vehicles: 0,

    bookings: 0,

    revenue: 0,
  });

  // ============================
  // Fetch Admin Data
  // ============================

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const [usersRes, vehiclesRes, bookingsRes] = await Promise.all([
        axios.get(
          "/admin/users",

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),

        axios.get(
          "/admin/vehicles",

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),

        axios.get(
          "/admin/bookings",

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      ]);

      const userData = usersRes.data.users || [];

      const vehicleData = vehiclesRes.data.vehicles || [];

      const bookingData = bookingsRes.data.bookings || [];

      setUsers(userData);

      setVehicles(vehicleData);

      setBookings(bookingData);

      setStats({
        users: userData.length,

        customers: userData.filter((u) => u.role === "customer").length,

        agencies: userData.filter((u) => u.role === "agency").length,

        vehicles: vehicleData.length,

        bookings: bookingData.length,

        revenue: bookingData.reduce(
          (sum, b) => sum + b.totalCost,

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
    return <Loading message="Loading admin dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">
              Welcome Admin, {user?.name}
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Monitor and manage the complete rental platform.
            </p>
          </div>
        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-xl bg-red-100 dark:bg-red-900/30 p-4 text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        {/* Statistics */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 mb-10">
          <DashboardCard title="Users" value={stats.users} icon={Users} />

          <DashboardCard
            title="Customers"
            value={stats.customers}
            icon={Users}
          />

          <DashboardCard
            title="Agencies"
            value={stats.agencies}
            icon={Building2}
          />

          <DashboardCard title="Vehicles" value={stats.vehicles} icon={Car} />

          <DashboardCard
            title="Bookings"
            value={stats.bookings}
            icon={CalendarDays}
          />

          <DashboardCard
            title="Revenue"
            value={formatPrice(stats.revenue)}
            icon={Wallet}
          />
        </div>

        {/* Quick Actions */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <Link
            to="/admin/users"
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <Users size={36} className="text-indigo-600 mb-4" />

            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Manage Users
            </h2>

            <p className="mt-2 text-slate-500">
              View and manage customers and agencies.
            </p>
          </Link>

          <Link
            to="/admin/vehicles"
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <Car size={36} className="text-green-600 mb-4" />

            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Manage Vehicles
            </h2>

            <p className="mt-2 text-slate-500">Control vehicle listings.</p>
          </Link>

          <Link
            to="/admin/bookings"
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <ShieldCheck size={36} className="text-orange-600 mb-4" />

            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Manage Bookings
            </h2>

            <p className="mt-2 text-slate-500">
              Monitor all rental transactions.
            </p>
          </Link>
        </div>

        {/* Recent Users */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6 mb-10">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">
            Recent Users
          </h2>

          {users.length === 0 ? (
            <p className="text-slate-500">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-slate-700">
                    <th className="text-left py-3">Name</th>

                    <th className="text-left py-3">Email</th>

                    <th className="text-left py-3">Role</th>

                    <th className="text-left py-3">Joined</th>
                  </tr>
                </thead>

                <tbody>
                  {users.slice(0, 5).map((item) => (
                    <tr
                      key={item._id}
                      className="border-b dark:border-slate-800"
                    >
                      <td className="py-4 font-bold">{item.name}</td>

                      <td>{item.email}</td>

                      <td className="capitalize">{item.role}</td>

                      <td>{formatDate(item.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Bookings */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">
            Recent Bookings
          </h2>

          {bookings.length === 0 ? (
            <p className="text-slate-500">No bookings available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-slate-700">
                    <th className="text-left py-3">Vehicle</th>

                    <th className="text-left py-3">Customer</th>

                    <th className="text-left py-3">Date</th>

                    <th className="text-left py-3">Amount</th>

                    <th className="text-left py-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.slice(0, 5).map((booking) => (
                    <tr
                      key={booking._id}
                      className="border-b dark:border-slate-800"
                    >
                      <td className="py-4 font-bold">
                        {booking.vehicleId?.name || "Vehicle"}
                      </td>

                      <td>{booking.customerId?.name || "Customer"}</td>

                      <td>{formatDate(booking.createdAt)}</td>

                      <td className="font-bold text-indigo-600">
                        {formatPrice(booking.totalCost)}
                      </td>

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

export default AdminDashboard;

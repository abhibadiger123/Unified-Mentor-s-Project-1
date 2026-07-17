// src/pages/admin/Analytics.jsx

import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { TrendingUp, Users, Car, Wallet, CalendarDays } from "lucide-react";

import axios from "../../api/axios";

import useAuth from "../../hooks/useAuth";

import Loading from "../../components/Loading";

import { formatPrice } from "../../utils/formatters";

import { getErrorMessage } from "../../utils/helpers";

const Analytics = () => {
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [analytics, setAnalytics] = useState({
    revenue: [],

    bookings: [],

    users: [],

    vehicles: [],
  });

  const [summary, setSummary] = useState({
    revenue: 0,

    bookings: 0,

    users: 0,

    vehicles: 0,
  });

  // ============================
  // Fetch Analytics
  // ============================

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "/admin/analytics",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setAnalytics(response.data.analytics);

        setSummary(response.data.summary);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return <Loading message="Loading analytics..." />;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Analytics Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Track business growth and platform performance.
          </p>
        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-100 text-red-700">
            {error}
          </div>
        )}

        {/* Summary Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow p-6">
            <Wallet className="text-indigo-600 mb-3" />

            <p className="text-slate-500">Total Revenue</p>

            <h2 className="text-3xl font-black dark:text-white">
              {formatPrice(summary.revenue)}
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow p-6">
            <CalendarDays className="text-green-600 mb-3" />

            <p className="text-slate-500">Total Bookings</p>

            <h2 className="text-3xl font-black dark:text-white">
              {summary.bookings}
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow p-6">
            <Users className="text-orange-500 mb-3" />

            <p className="text-slate-500">Total Users</p>

            <h2 className="text-3xl font-black dark:text-white">
              {summary.users}
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow p-6">
            <Car className="text-blue-600 mb-3" />

            <p className="text-slate-500">Total Vehicles</p>

            <h2 className="text-3xl font-black dark:text-white">
              {summary.vehicles}
            </h2>
          </div>
        </div>

        {/* Revenue Chart */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="text-indigo-600" />

            <h2 className="text-xl font-black dark:text-white">
              Revenue Growth
            </h2>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={analytics.revenue}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line type="monotone" dataKey="amount" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Booking Chart */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-black dark:text-white mb-6">
            Booking Trends
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={analytics.bookings}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="count" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth Chart */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-black dark:text-white mb-6">
            User Growth
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={analytics.users}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line type="monotone" dataKey="count" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Vehicle Performance */}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Vehicle Chart */}

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6">
            <h2 className="text-xl font-black dark:text-white mb-6">
              Vehicle Performance
            </h2>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={analytics.vehicles}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="bookings" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Vehicle Distribution */}

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6">
            <h2 className="text-xl font-black dark:text-white mb-6">
              Vehicle Distribution
            </h2>

            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={analytics.vehicles}
                  dataKey="count"
                  nameKey="name"
                  outerRadius={120}
                  label
                >
                  {analytics.vehicles.map((item, index) => (
                    <Cell key={index} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

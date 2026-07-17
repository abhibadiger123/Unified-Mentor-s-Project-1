// src/pages/admin/Reports.jsx

import { useEffect, useMemo, useState } from "react";

import {
  FileText,
  Download,
  Search,
  CalendarDays,
  Users,
  Car,
  Wallet,
} from "lucide-react";

import axios from "../../api/axios";

import useAuth from "../../hooks/useAuth";

import Loading from "../../components/Loading";

import { formatDate, formatPrice } from "../../utils/formatters";

import { getErrorMessage } from "../../utils/helpers";

const Reports = () => {
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [reports, setReports] = useState([]);

  const [summary, setSummary] = useState({
    users: 0,

    vehicles: 0,

    bookings: 0,

    revenue: 0,
  });

  const [search, setSearch] = useState("");

  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");

  // ============================
  // Fetch Reports
  // ============================

  const fetchReports = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "/admin/reports",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setReports(response.data.reports);

        setSummary(response.data.summary);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // ============================
  // Filter Reports
  // ============================

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const text = search.toLowerCase();

      const name = report.vehicleName?.toLowerCase() || "";

      const customer = report.customerName?.toLowerCase() || "";

      const matchesSearch = name.includes(text) || customer.includes(text);

      const matchesStart = startDate
        ? new Date(report.createdAt) >= new Date(startDate)
        : true;

      const matchesEnd = endDate
        ? new Date(report.createdAt) <= new Date(endDate)
        : true;

      return matchesSearch && matchesStart && matchesEnd;
    });
  }, [reports, search, startDate, endDate]);

  // ============================
  // Export CSV
  // ============================

  const exportCSV = async () => {
    try {
      const response = await axios.get(
        "/admin/reports/export",

        {
          responseType: "blob",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;

      link.download = "admin-report.csv";

      document.body.appendChild(link);

      link.click();

      link.remove();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (loading) {
    return <Loading message="Loading reports..." />;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">
              Reports Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
              Analyze platform performance and transactions.
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-indigo-700"
          >
            <Download size={18} />
            Export CSV
          </button>
        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-100 text-red-700">
            {error}
          </div>
        )}

        {/* Summary Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow p-6">
            <Users className="text-indigo-600 mb-3" />

            <p className="text-slate-500">Total Users</p>

            <h2 className="text-3xl font-black dark:text-white">
              {summary.users}
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow p-6">
            <Car className="text-green-600 mb-3" />

            <p className="text-slate-500">Vehicles</p>

            <h2 className="text-3xl font-black dark:text-white">
              {summary.vehicles}
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow p-6">
            <CalendarDays className="text-orange-500 mb-3" />

            <p className="text-slate-500">Bookings</p>

            <h2 className="text-3xl font-black dark:text-white">
              {summary.bookings}
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow p-6">
            <Wallet className="text-blue-600 mb-3" />

            <p className="text-slate-500">Revenue</p>

            <h2 className="text-2xl font-black text-indigo-600">
              {formatPrice(summary.revenue)}
            </h2>
          </div>
        </div>

        {/* Filters */}

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-5 mb-8">
          <div className="grid md:grid-cols-3 gap-5">
            {/* Search */}

            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search report..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-style pl-11"
              />
            </div>

            {/* Start Date */}

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input-style"
            />

            {/* End Date */}

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input-style"
            />
          </div>
        </div>

        {/* Reports Table */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-slate-700">
                  <th className="p-5 text-left">Vehicle</th>

                  <th className="p-5 text-left">Customer</th>

                  <th className="p-5 text-left">Booking Date</th>

                  <th className="p-5 text-left">Amount</th>

                  <th className="p-5 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredReports.map((report) => (
                  <tr
                    key={report._id}
                    className="border-b dark:border-slate-800"
                  >
                    <td className="p-5 font-bold">{report.vehicleName}</td>

                    <td>{report.customerName}</td>

                    <td>{formatDate(report.createdAt)}</td>

                    <td className="font-bold text-indigo-600">
                      {formatPrice(report.amount)}
                    </td>

                    {/* Status */}

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold capitalize

                          ${
                            report.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : report.status === "approved"
                                ? "bg-blue-100 text-blue-700"
                                : report.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                          }

                          `}
                      >
                        {report.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

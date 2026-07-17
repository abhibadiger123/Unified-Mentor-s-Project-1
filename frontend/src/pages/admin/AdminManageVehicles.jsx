// src/pages/admin/ManageVehicles.jsx

import { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";

import { Search, Car, Trash2, CheckCircle, XCircle, Eye } from "lucide-react";

import axios from "../../api/axios";

import useAuth from "../../hooks/useAuth";

import Loading from "../../components/Loading";

import EmptyState from "../../components/EmptyState";

import { getErrorMessage } from "../../utils/helpers";

const ManageVehicles = () => {
  const { token } = useAuth();

  const [vehicles, setVehicles] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("all");

  const [type, setType] = useState("all");

  // ============================
  // Fetch Vehicles
  // ============================

  const fetchVehicles = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "/admin/vehicles",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setVehicles(response.data.vehicles);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // ============================
  // Filter Vehicles
  // ============================

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const vehicleName = vehicle.name?.toLowerCase() || "";

      const brand = vehicle.brand?.toLowerCase() || "";

      const searchText = search.toLowerCase();

      const matchesSearch =
        vehicleName.includes(searchText) || brand.includes(searchText);

      const matchesStatus = status === "all" || vehicle.status === status;

      const matchesType = type === "all" || vehicle.type === type;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [vehicles, search, status, type]);

  // ============================
  // Update Status
  // ============================

  const updateStatus = async (
    id,

    newStatus,
  ) => {
    try {
      await axios.put(
        `/admin/vehicles/${id}/status`,

        {
          status: newStatus,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchVehicles();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  // ============================
  // Delete Vehicle
  // ============================

  const deleteVehicle = async (id) => {
    const confirmDelete = window.confirm("Delete this vehicle?");

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `/admin/vehicles/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchVehicles();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };
  // Continue ManageVehicles.jsx

  if (loading) {
    return <Loading message="Loading vehicles..." />;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Manage Vehicles
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Review and control all vehicles listed on the platform.
          </p>
        </div>

        {/* Error Message */}

        {error && (
          <div className="mb-6 rounded-xl bg-red-100 dark:bg-red-900/30 p-4 text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

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
                placeholder="Search vehicle..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-style pl-11"
              />
            </div>

            {/* Status */}

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="input-style"
            >
              <option value="all">All Status</option>

              <option value="available">Available</option>

              <option value="booked">Booked</option>

              <option value="maintenance">Maintenance</option>

              <option value="inactive">Inactive</option>
            </select>

            {/* Type */}

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="input-style"
            >
              <option value="all">All Types</option>

              <option value="car">Car</option>

              <option value="bike">Bike</option>

              <option value="suv">SUV</option>

              <option value="van">Van</option>
            </select>
          </div>
        </div>

        {/* Vehicle List */}

        {filteredVehicles.length === 0 ? (
          <EmptyState
            title="No vehicles found"
            description="Vehicle listings will appear here."
          />
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-slate-700">
                    <th className="p-5 text-left">Vehicle</th>

                    <th className="p-5 text-left">Owner</th>

                    <th className="p-5 text-left">Type</th>

                    <th className="p-5 text-left">Status</th>

                    <th className="p-5 text-left">Price</th>

                    <th className="p-5 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredVehicles.map((vehicle) => (
                    <tr
                      key={vehicle._id}
                      className="border-b dark:border-slate-800"
                    >
                      {/* Vehicle */}

                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          {vehicle.image ? (
                            <img
                              src={vehicle.image}
                              alt={vehicle.name}
                              className="w-14 h-14 rounded-xl object-cover"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-xl bg-slate-200 flex items-center justify-center">
                              <Car size={25} />
                            </div>
                          )}

                          <div>
                            <p className="font-black">{vehicle.name}</p>

                            <p className="text-sm text-slate-500">
                              {vehicle.brand}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Owner */}

                      <td>{vehicle.ownerId?.name || "Agency"}</td>

                      {/* Type */}

                      <td className="capitalize">{vehicle.type}</td>

                      {/* Status */}

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold capitalize

                              ${
                                vehicle.status === "available"
                                  ? "bg-green-100 text-green-700"
                                  : vehicle.status === "booked"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                              }

                              `}
                        >
                          {vehicle.status}
                        </span>
                      </td>

                      {/* Price */}

                      <td className="font-bold text-indigo-600">
                        ₹{vehicle.pricing?.daily || 0}
                        /day
                      </td>

                      {/* Actions */}

                      <td>
                        <div className="flex items-center gap-3">
                          {/* View Details */}

                          <Link
                            to={`/vehicle/${vehicle._id}`}
                            className="p-2 rounded-xl bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                            title="View Vehicle"
                          >
                            <Eye size={18} />
                          </Link>

                          {/* Status Change */}

                          {vehicle.status === "available" ? (
                            <button
                              onClick={() =>
                                updateStatus(
                                  vehicle._id,

                                  "inactive",
                                )
                              }
                              className="p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200"
                              title="Disable Vehicle"
                            >
                              <XCircle size={18} />
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                updateStatus(
                                  vehicle._id,

                                  "available",
                                )
                              }
                              className="p-2 rounded-xl bg-green-100 text-green-600 hover:bg-green-200"
                              title="Approve Vehicle"
                            >
                              <CheckCircle size={18} />
                            </button>
                          )}

                          {/* Delete */}

                          <button
                            onClick={() => deleteVehicle(vehicle._id)}
                            className="p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200"
                            title="Delete Vehicle"
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


export default ManageVehicles;

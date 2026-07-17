// src/pages/VehicleDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Car,
  Calendar,
  Fuel,
  Settings,
  User,
  ArrowLeft,
  IndianRupee,
} from "lucide-react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import {
  formatPrice,
  formatVehicleName,
  getStatusColor,
} from "../utils/formatters";
import { getErrorMessage } from "../utils/helpers";

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState("");

  const [booking, setBooking] = useState({
    startDate: "",
    endDate: "",
  });

  const [totalCost, setTotalCost] = useState(0);

  // ============================
  // Fetch Vehicle Details
  // ============================
  const fetchVehicle = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`/vehicles/${id}`);
      if (response.data.success) {
        setVehicle(response.data.vehicle);
      }
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  // ============================
  // Booking Input Change
  // ============================
  const handleBookingChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  // ============================
  // Calculate Total Cost
  // ============================
  useEffect(() => {
    if (booking.startDate && booking.endDate && vehicle?.pricing?.daily) {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);

      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

      setTotalCost(days > 0 ? days * vehicle.pricing.daily : 0);
    } else {
      setTotalCost(0);
    }
  }, [booking, vehicle]);

  // ============================
  // Create Booking
  // ============================
  const handleBooking = async () => {
    setError("");

    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "customer") {
      setError("Only customers can book vehicles.");
      return;
    }

    if (!booking.startDate || !booking.endDate) {
      setError("Please select booking dates.");
      return;
    }

    if (totalCost <= 0) {
      setError("End date must be after the start date.");
      return;
    }

    try {
      setBookingLoading(true);

      await axios.post(
        "/bookings",
        {
          vehicleId: vehicle?._id,
          startDate: booking.startDate,
          endDate: booking.endDate,
          totalCost,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      navigate("/customer/bookings");
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Loading vehicle details..." />;
  }

  // Handle the edge case where loading is finished but no vehicle data was found
  if (!vehicle && error) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 px-6 py-10 flex items-center justify-center">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-md text-center max-w-md">
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <Link
            to="/"
            className="text-indigo-600 font-bold hover:underline flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} /> Back to Vehicles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-indigo-600 font-bold mb-8 hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Vehicles
        </Link>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-100 text-red-700 font-semibold">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vehicle Information */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl shadow-lg overflow-hidden">
            {/* FIXED VEHICLE IMAGE */}
            <div className="h-72 bg-slate-200 dark:bg-slate-800 overflow-hidden">
              {vehicle?.image ? (
                <img
                  src={vehicle.image}
                  alt={vehicle?.name || "Vehicle"}
                  className="w-full h-full object-cover"
                />
              ) : vehicle?.images?.length > 0 ? (
                <img
                  src={vehicle.images[0]}
                  alt={vehicle?.name || "Vehicle"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <Car size={120} className="text-indigo-500" />
                </div>
              )}
            </div>

            <div className="p-8">
              <div className="flex justify-between items-start gap-5">
                <div>
                  <h1 className="text-4xl font-black text-slate-900 dark:text-white">
                    {formatVehicleName(vehicle)}
                  </h1>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">
                    {vehicle?.brand} • {vehicle?.modelYear}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(
                    vehicle?.status,
                  )}`}
                >
                  {vehicle?.status || "Unknown"}
                </span>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <Fuel className="text-indigo-600" />
                  <p className="mt-2 text-sm text-slate-500">Fuel</p>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {vehicle?.fuelType || "N/A"}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <Settings className="text-indigo-600" />
                  <p className="mt-2 text-sm text-slate-500">Transmission</p>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {vehicle?.transmission || "N/A"}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <Car className="text-indigo-600" />
                  <p className="mt-2 text-sm text-slate-500">Type</p>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {vehicle?.type || "N/A"}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <IndianRupee className="text-indigo-600" />
                  <p className="mt-2 text-sm text-slate-500">Daily</p>
                  <p className="font-bold text-slate-900 dark:text-white">
                    ₹{vehicle?.pricing?.daily || 0}
                  </p>
                </div>
              </div>

              {/* Agency Details */}
              <div className="mt-8 p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20">
                <div className="flex items-center gap-3">
                  <User className="text-indigo-600" />
                  <div>
                    <p className="text-sm text-slate-500">Provided By</p>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {vehicle?.agencyId?.name || "Independent Owner"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6 h-fit">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Book Vehicle
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Select your rental period
            </p>

            <div className="mt-6 space-y-5">
              {/* Start Date */}
              <div>
                <label className="block mb-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={booking.startDate}
                  onChange={handleBookingChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block mb-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={booking.endDate}
                  onChange={handleBookingChange}
                  min={
                    booking.startDate || new Date().toISOString().split("T")[0]
                  }
                  className="w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              {/* Price Summary */}
              <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-5">
                <div className="flex justify-between mb-2 text-slate-700 dark:text-slate-300">
                  <span>Daily Rent</span>
                  <span className="font-bold">
                    {formatPrice(vehicle?.pricing?.daily || 0)}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-lg font-bold text-slate-900 dark:text-white">
                    Total Cost
                  </span>
                  <span className="text-2xl font-black text-indigo-600">
                    {formatPrice(totalCost)}
                  </span>
                </div>
              </div>

              {!user && (
                <div className="rounded-xl bg-yellow-100 p-4 text-yellow-800 text-sm font-medium">
                  Please login to book this vehicle.
                </div>
              )}

              {user && user.role !== "customer" && (
                <div className="rounded-xl bg-blue-100 p-4 text-blue-800 text-sm font-medium">
                  Only customers can create bookings.
                </div>
              )}

              {/* Book Button */}
              <button
                onClick={handleBooking}
                disabled={bookingLoading || vehicle?.status !== "available"}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {bookingLoading
                  ? "Booking..."
                  : vehicle?.status === "available"
                    ? "Book Now"
                    : "Vehicle Not Available"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;

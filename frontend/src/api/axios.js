// src/api/axios.js

import axios from "axios";

/**
 * Axios Instance
 */
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

/**
 * Request Interceptor
 * Automatically attaches JWT token.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Unauthorized or expired token
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    // Forbidden
    if (error.response?.status === 403) {
      console.error("Access denied.");
    }

    // Internal Server Error
    if (error.response?.status === 500) {
      console.error("Server error.");
    }

    return Promise.reject(error);
  }
);

/* -------------------------------------------------------------------------- */
/*                               AUTH API                                     */
/* -------------------------------------------------------------------------- */

export const registerUser = (userData) =>
  api.post("/auth/register", userData);

export const loginUser = (userData) =>
  api.post("/auth/login", userData);

export const getProfile = () =>
  api.get("/auth/profile");

/* -------------------------------------------------------------------------- */
/*                             VEHICLE API                                    */
/* -------------------------------------------------------------------------- */

export const getAllVehicles = () =>
  api.get("/vehicles");

export const getVehicleById = (id) =>
  api.get(`/vehicles/${id}`);

export const searchVehicles = (params) =>
  api.get("/vehicles/search", { params });

export const addVehicle = (vehicleData) =>
  api.post("/vehicles", vehicleData);

export const updateVehicle = (id, vehicleData) =>
  api.put(`/vehicles/${id}`, vehicleData);

export const changeVehicleStatus = (id, status) =>
  api.patch(`/vehicles/${id}/status`, { status });

export const deleteVehicle = (id) =>
  api.delete(`/vehicles/${id}`);

/* -------------------------------------------------------------------------- */
/*                              BOOKING API                                   */
/* -------------------------------------------------------------------------- */

export const createBooking = (bookingData) =>
  api.post("/bookings", bookingData);

export const getMyBookings = () =>
  api.get("/bookings/my");

export const getAllBookings = () =>
  api.get("/bookings");

export const updateBookingStatus = (id, status) =>
  api.put(`/bookings/${id}`, { status });

export const deleteBooking = (id) =>
  api.delete(`/bookings/${id}`);

/* -------------------------------------------------------------------------- */
/*                              EXPORT INSTANCE                               */
/* -------------------------------------------------------------------------- */

export default api;
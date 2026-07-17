// src/utils/constants.js


// ============================
// API Configuration
// ============================

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api";



// ============================
// User Roles
// ============================

export const USER_ROLES = {

  CUSTOMER: "customer",

  AGENCY: "agency",

  ADMIN: "admin",

};



// ============================
// Vehicle Types
// ============================

export const VEHICLE_TYPES = [

  {
    label: "Two Wheeler",
    value: "2W",
  },

  {
    label: "Four Wheeler",
    value: "4W",
  },

];



// ============================
// Fuel Types
// ============================

export const FUEL_TYPES = [

  {
    label: "Petrol",
    value: "Petrol",
  },

  {
    label: "Diesel",
    value: "Diesel",
  },

  {
    label: "Electric",
    value: "Electric",
  },

  {
    label: "CNG",
    value: "CNG",
  },

];



// ============================
// Transmission Types
// ============================

export const TRANSMISSION_TYPES = [

  {
    label: "Manual",
    value: "Manual",
  },

  {
    label: "Automatic",
    value: "Automatic",
  },

];



// ============================
// Vehicle Status
// ============================

export const VEHICLE_STATUS = [

  {
    label: "Available",
    value: "available",
  },

  {
    label: "Rented",
    value: "rented",
  },

  {
    label: "Maintenance",
    value: "maintenance",
  },

];



// ============================
// Booking Status
// ============================

export const BOOKING_STATUS = [

  {
    label: "Pending",
    value: "pending",
  },

  {
    label: "Approved",
    value: "approved",
  },

  {
    label: "Rejected",
    value: "rejected",
  },

  {
    label: "Completed",
    value: "completed",
  },

];



// ============================
// Routes
// ============================

export const ROUTES = {

  HOME: "/",

  LOGIN: "/login",

  REGISTER: "/register",



  CUSTOMER_DASHBOARD:
    "/customer/dashboard",



  CUSTOMER_BOOKINGS:
    "/customer/bookings",



  CUSTOMER_PROFILE:
    "/customer/profile",



  AGENCY_DASHBOARD:
    "/agency/dashboard",



  AGENCY_ADD_VEHICLE:
    "/agency/add-vehicle",



  AGENCY_VEHICLES:
    "/agency/vehicles",



  AGENCY_BOOKINGS:
    "/agency/bookings",



  ADMIN_DASHBOARD:
    "/admin/dashboard",

};



// ============================
// Local Storage Keys
// ============================

export const STORAGE_KEYS = {

  TOKEN: "token",

  USER: "user",

};



// ============================
// Pagination
// ============================

export const PAGINATION = {

  DEFAULT_PAGE: 1,

  DEFAULT_LIMIT: 10,

};



// ============================
// Application Messages
// ============================

export const MESSAGES = {

  LOGIN_SUCCESS:
    "Login successful.",


  REGISTER_SUCCESS:
    "Registration successful.",


  LOGOUT_SUCCESS:
    "Logged out successfully.",


  ERROR:
    "Something went wrong. Please try again.",


  UNAUTHORIZED:
    "You are not authorized to access this page.",

};
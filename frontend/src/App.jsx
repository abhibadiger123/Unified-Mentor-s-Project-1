// src/App.jsx

import { Routes, Route } from "react-router-dom";

// =========================
// Global Pages
// =========================


import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VehicleDetails from "./pages/VehicleDetails";
import NotFound from "./pages/NotFound";

// =========================
// Customer Pages
// =========================

import CustomerDashboard from "./pages/customer/CustomerDashboard";
import MyBookings from "./pages/customer/MyBookings";
import Profile from "./pages/customer/Profile";

// =========================
// Agency Pages
// =========================

import AgencyDashboard from "./pages/agency/AgencyDashboard";
import AddVehicle from "./pages/agency/AddVehicle";
import EditVehicle from "./pages/agency/EditVehicle";
import AgencyManageVehicles from "./pages/agency/ManageVehicles";
import AgencyBookings from "./pages/agency/AgencyBookings";

// =========================
// Admin Pages
// =========================

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import AdminManageVehicles from "./pages/admin/AdminManageVehicles";
import ManageBookings from "./pages/admin/ManageBookings";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminSettings from "./pages/admin/AdminSettings";
import Reports from "./pages/admin/Reports";
import Analytics from "./pages/admin/Analytics";

// =========================
// Components
// =========================

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// =========================
// Route Guards
// =========================

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import CustomerRoute from "./routes/CustomerRoute";
import AgencyRoute from "./routes/AgencyRoute";
import AdminRoute from "./routes/AdminRoute";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* PUBLIC */}

        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route path="/vehicles/:id" element={<VehicleDetails />} />

        {/* CUSTOMER */}

        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute>
              <CustomerRoute>
                <CustomerDashboard />
              </CustomerRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer/bookings"
          element={
            <ProtectedRoute>
              <CustomerRoute>
                <MyBookings />
              </CustomerRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer/profile"
          element={
            <ProtectedRoute>
              <CustomerRoute>
                <Profile />
              </CustomerRoute>
            </ProtectedRoute>
          }
        />

        {/* AGENCY */}

        <Route
          path="/agency/dashboard"
          element={
            <ProtectedRoute>
              <AgencyRoute>
                <AgencyDashboard />
              </AgencyRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/agency/add-vehicle"
          element={
            <ProtectedRoute>
              <AgencyRoute>
                <AddVehicle />
              </AgencyRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/agency/manage-vehicles"
          element={
            <ProtectedRoute>
              <AgencyRoute>
                <AgencyManageVehicles />
              </AgencyRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/agency/edit-vehicle/:id"
          element={
            <ProtectedRoute>
              <AgencyRoute>
                <EditVehicle />
              </AgencyRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/agency/bookings"
          element={
            <ProtectedRoute>
              <AgencyRoute>
                <AgencyBookings />
              </AgencyRoute>
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/vehicles"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminManageVehicles />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <ManageBookings />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminProfile />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminSettings />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <Reports />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <Analytics />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        {/* 404 */}

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

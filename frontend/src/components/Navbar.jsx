// src/components/Navbar.jsx

import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

import {
  Menu,
  X,
  User,
  LogOut,
  Sun,
  Moon,
  Car,
  LayoutDashboard,
  CalendarDays,
  PlusCircle,
  ClipboardList,
  Users,
  Settings,
  Home,
  Search,
} from "lucide-react";

import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    user,
    logout,
    isAuthenticated,
    isCustomer,
    isAgency,
    isAdmin,
  } = useAuth();

  /* ==========================================
     STATES
  ========================================== */

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const profileMenuRef = useRef(null);

  /* ==========================================
     THEME
  ========================================== */

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  /* ==========================================
     CLOSE PROFILE DROPDOWN
  ========================================== */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* ==========================================
     CLOSE MOBILE MENU ON ROUTE CHANGE
  ========================================== */

  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  }, [location.pathname]);

  /* ==========================================
     LOGOUT
  ========================================== */

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  /* ==========================================
     CUSTOMER NAVIGATION
  ========================================== */

  const customerLinks = [
    {
      title: "Home",
      path: "/",
      icon: Home,
    },
    {
      title: "Dashboard",
      path: "/customer/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Bookings",
      path: "/customer/bookings",
      icon: CalendarDays,
    },
    {
      title: "Profile",
      path: "/customer/profile",
      icon: User,
    },
  ];

  /* ==========================================
     AGENCY NAVIGATION
  ========================================== */

  const agencyLinks = [
    {
      title: "Dashboard",
      path: "/agency/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Add Vehicle",
      path: "/agency/add-vehicle",
      icon: PlusCircle,
    },
    {
      title: "Manage Vehicles",
      path: "/agency/manage-vehicles",
      icon: Car,
    },
    {
      title: "Bookings",
      path: "/agency/bookings",
      icon: ClipboardList,
    },
  ];

  /* ==========================================
     ADMIN NAVIGATION
  ========================================== */

  const adminLinks = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      title: "Vehicles",
      path: "/admin/vehicles",
      icon: Car,
    },
    {
      title: "Bookings",
      path: "/admin/bookings",
      icon: ClipboardList,
    },
  ];

  /* ==========================================
     PUBLIC NAVIGATION
  ========================================== */

  const guestLinks = [
    {
      title: "Home",
      path: "/",
      icon: Home,
    },
  ];

  /* ==========================================
     SELECT NAVIGATION
  ========================================== */

  let navigation = guestLinks;

  if (isCustomer) {
    navigation = customerLinks;
  }

  if (isAgency) {
    navigation = agencyLinks;
  }

  if (isAdmin) {
    navigation = adminLinks;
  }
    /* ==========================================
     DESKTOP NAVBAR
  ========================================== */

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">

            {/* ==========================================
                LOGO
            ========================================== */}

            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg">
                <Car
                  size={22}
                  className="text-white"
                />
              </div>

              <div className="hidden sm:block">
                <h1 className="text-xl font-black text-slate-900 dark:text-white">
                  RentiGo
                </h1>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Vehicle Rental System
                </p>
              </div>
            </Link>

            {/* ==========================================
                DESKTOP NAVIGATION
            ========================================== */}

            <div className="hidden lg:flex items-center gap-2">

              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-md"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`
                    }
                  >
                    <Icon size={18} />
                    {item.title}
                  </NavLink>
                );
              })}

            </div>

            {/* ==========================================
                RIGHT SECTION
            ========================================== */}

            <div className="flex items-center gap-3">

              {/* Search Button */}

              <button
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:scale-105 transition"
              >
                <Search size={18} />
              </button>

              {/* Theme Toggle */}

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:scale-105 transition"
              >
                {darkMode ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )}
              </button>

              {/* Guest Buttons */}

              {!isAuthenticated && (
                <div className="hidden md:flex items-center gap-3">

                  <Link
                    to="/login"
                    className="px-5 py-2 rounded-xl border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
                  >
                    Register
                  </Link>

                </div>
              )}

              {/* Logged In User */}

              {isAuthenticated && (

                <div
                  ref={profileMenuRef}
                  className="relative hidden md:block"
                >

                  <button
                    onClick={() =>
                      setProfileMenuOpen(!profileMenuOpen)
                    }
                    className="flex items-center gap-3 rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                  >

                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">

                      {user?.name?.charAt(0)?.toUpperCase()}

                    </div>

                    <div className="text-left">

                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">

                        {user?.name}

                      </h4>

                      <p className="text-xs text-slate-500 capitalize">

                        {user?.role}

                      </p>

                    </div>

                  </button>
                
                                  {/* ===============================
                      PROFILE DROPDOWN
                  =============================== */}

                  {profileMenuOpen && (
                    <div className="absolute right-0 mt-3 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">

                      {/* User Info */}

                      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800">

                        <p className="text-xs uppercase tracking-wider text-slate-500">
                          Logged in as
                        </p>

                        <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                          {user?.name}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {user?.email}
                        </p>

                        <span className="inline-flex mt-3 rounded-full bg-indigo-100 dark:bg-indigo-900/40 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300 capitalize">
                          {user?.role}
                        </span>

                      </div>

                      {/* Dashboard */}

                      {isCustomer && (
                        <Link
                          to="/customer/dashboard"
                          className="flex items-center gap-3 px-5 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <LayoutDashboard size={18} />
                          Dashboard
                        </Link>
                      )}

                      {isAgency && (
                        <Link
                          to="/agency/dashboard"
                          className="flex items-center gap-3 px-5 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <LayoutDashboard size={18} />
                          Dashboard
                        </Link>
                      )}

                      {isAdmin && (
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center gap-3 px-5 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <LayoutDashboard size={18} />
                          Dashboard
                        </Link>
                      )}

                      {/* Profile */}

                      <Link
                        to="/customer/profile"
                        className="flex items-center gap-3 px-5 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      >
                        <User size={18} />
                        My Profile
                      </Link>

                      {/* Settings */}

                      <button
                        className="w-full flex items-center gap-3 px-5 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-left"
                      >
                        <Settings size={18} />
                        Settings
                      </button>

                      {/* Logout */}

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>

                    </div>
                  )}

                </div>

              )}

              {/* ===============================
                  MOBILE MENU BUTTON
              =============================== */}

              <button
                onClick={() =>
                  setMobileMenuOpen(!mobileMenuOpen)
                }
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800"
              >
                {mobileMenuOpen ? (
                  <X size={22} />
                ) : (
                  <Menu size={22} />
                )}
              </button>

            </div>

          </div>
        </div>

        {/* ======================================
            MOBILE MENU STARTS HERE
        ====================================== */}

        {mobileMenuOpen && (

          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">

            <div className="px-5 py-5">

              {isAuthenticated && (

                <div className="flex items-center gap-4 mb-6">

                  <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">

                    {user?.name?.charAt(0).toUpperCase()}

                  </div>

                  <div>

                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {user?.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {user?.email}
                    </p>

                    <span className="capitalize text-xs text-indigo-600 font-semibold">
                      {user?.role}
                    </span>

                  </div>

                </div>

              )}

              {/* Mobile Navigation */}

              <div className="space-y-2">

             




                           {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                        isActive
                          ? "bg-indigo-600 text-white"
                          : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`
                    }
                  >
                    <Icon size={20} />
                    <span className="font-medium">
                      {item.title}
                    </span>
                  </NavLink>
                );
              })}
            </div>

            {/* ===========================
                MOBILE ACTIONS
            =========================== */}

            {!isAuthenticated ? (
              <div className="mt-6 space-y-3">

                <Link
                  to="/login"
                  className="block w-full text-center rounded-xl border border-indigo-600 px-4 py-3 font-semibold text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="block w-full text-center rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700 transition"
                >
                  Register
                </Link>

              </div>
            ) : (
              <div className="mt-6 space-y-3">

                {/* Profile */}

                {isCustomer && (
                  <Link
                    to="/customer/profile"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <User size={20} />
                    Profile
                  </Link>
                )}

                {/* Theme Toggle */}

                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="w-full flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  {darkMode ? (
                    <>
                      <Sun size={20} />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon size={20} />
                      Dark Mode
                    </>
                  )}
                </button>

                {/* Logout */}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                >
                  <LogOut size={20} />
                  Logout
                </button>

              </div>
            )}

          </div>

        </div>

        )}

      </nav>
    </>
  );
};

export default Navbar;
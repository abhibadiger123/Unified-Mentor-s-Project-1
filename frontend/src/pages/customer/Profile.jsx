// src/pages/customer/Profile.jsx

import { useEffect, useState } from "react";

import {
  User,
  Mail,
  Shield,
  Calendar,
  RefreshCw
} from "lucide-react";

import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

import Loading from "../../components/Loading";

import { getErrorMessage } from "../../utils/helpers";

const Profile = () => {

  const { token } = useAuth();

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ============================
  // Fetch Profile
  // ============================

  const fetchProfile = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await axios.get(
        "/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setProfile(response.data.user);
      }

    } catch (err) {

      setError(getErrorMessage(err));

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchProfile();
  }, []);
  
  if (loading) {
    return (
      <Loading message="Loading profile..." />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">

      <div className="max-w-4xl mx-auto">

        {/* ============================
            Header
        ============================ */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>

            <h1 className="text-3xl font-black text-slate-900 dark:text-white">
              My Profile
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              View your account information.
            </p>

          </div>

          <button
            onClick={fetchProfile}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-xl bg-red-100 dark:bg-red-900/30 p-4 text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        {/* ============================
            Profile Card
        ============================ */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-8">

          {/* Avatar */}

          <div className="flex flex-col items-center">

            <div className="w-28 h-28 rounded-full bg-indigo-600 flex items-center justify-center">

              <User
                size={56}
                className="text-white"
              />

            </div>

            <h2 className="mt-5 text-2xl font-black text-slate-900 dark:text-white">
              {profile?.name}
            </h2>

            <p className="text-slate-500 dark:text-slate-400">
              {profile?.email}
            </p>

          </div>

          {/* Information */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

            {/* Name */}

            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-5">

              <div className="flex items-center gap-3">

                <User
                  className="text-indigo-600"
                  size={22}
                />

                <div>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Full Name
                  </p>

                  <p className="font-bold text-slate-900 dark:text-white">
                    {profile?.name}
                  </p>

                </div>

              </div>

            </div>

            {/* Email */}

            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-5">

              <div className="flex items-center gap-3">

                <Mail
                  className="text-indigo-600"
                  size={22}
                />

                <div>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Email Address
                  </p>

                  <p className="font-bold text-slate-900 dark:text-white break-all">
                    {profile?.email}
                  </p>

                </div>

              </div>

            </div>

            {/* Role */}

            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-5">

              <div className="flex items-center gap-3">

                <Shield
                  className="text-indigo-600"
                  size={22}
                />

                <div>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Account Role
                  </p>

                  <p className="font-bold capitalize text-slate-900 dark:text-white">
                    {profile?.role}
                  </p>

                </div>

              </div>

            </div>

            {/* Created At */}

            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-5">

              <div className="flex items-center gap-3">

                <Calendar
                  className="text-indigo-600"
                  size={22}
                />

                <div>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Account Created
                  </p>

                  <p className="font-bold text-slate-900 dark:text-white">
                    {profile?.createdAt
                      ? new Date(profile.createdAt).toLocaleDateString()
                      : "Not Available"}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Information Notice */}

          <div className="mt-8 rounded-2xl bg-blue-50 dark:bg-blue-900/20 p-5">

            <p className="text-blue-700 dark:text-blue-300">

              Your current backend supports viewing your profile only.
              To edit your profile, add a backend endpoint like:

            </p>

            <code className="block mt-3 text-sm bg-slate-900 text-green-400 rounded-lg p-3 overflow-x-auto">
              PUT /api/auth/profile
            </code>

          </div>

        </div>

      </div>

    </div>
  );

};

export default Profile;
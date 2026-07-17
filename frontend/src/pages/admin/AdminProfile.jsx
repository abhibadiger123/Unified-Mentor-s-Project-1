// src/pages/admin/AdminProfile.jsx

import { useEffect, useState } from "react";

import { User, Mail, Lock, Save, Camera } from "lucide-react";

import axios from "../../api/axios";

import useAuth from "../../hooks/useAuth";

import Loading from "../../components/Loading";

import { getErrorMessage } from "../../utils/helpers";

const AdminProfile = () => {
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [profile, setProfile] = useState({
    name: "",

    email: "",

    image: "",
  });

  const [password, setPassword] = useState({
    oldPassword: "",

    newPassword: "",

    confirmPassword: "",
  });

  // Fetch Profile

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "/auth/profile",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setProfile(response.data.user);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Update Profile

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        "/auth/profile",

        profile,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSuccess("Profile updated successfully");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  // Change Password

  const changePassword = async (e) => {
    e.preventDefault();

    if (password.newPassword !== password.confirmPassword) {
      setError("Passwords do not match");

      return;
    }

    try {
      await axios.put(
        "/auth/change-password",

        password,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSuccess("Password changed successfully");

      setPassword({
        oldPassword: "",

        newPassword: "",

        confirmPassword: "",
      });
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };
  // Continue AdminProfile.jsx

  if (loading) {
    return <Loading message="Loading profile..." />;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Admin Profile
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage your account information and security settings.
          </p>
        </div>

        {/* Messages */}

        {error && (
          <div className="mb-5 p-4 rounded-xl bg-red-100 text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 p-4 rounded-xl bg-green-100 text-green-700">
            {success}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Profile Information */}

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                {profile.image ? (
                  <img
                    src={profile.image}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center">
                    <User size={40} />
                  </div>
                )}

                <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full">
                  <Camera size={16} />
                </button>
              </div>

              <div>
                <h2 className="text-xl font-black dark:text-white">
                  {profile.name}
                </h2>

                <p className="text-slate-500">Administrator</p>
              </div>
            </div>

            <form onSubmit={updateProfile} className="space-y-5">
              <div>
                <label className="text-sm font-bold">Name</label>

                <div className="relative mt-2">
                  <User
                    size={18}
                    className="absolute left-3 top-3 text-slate-400"
                  />

                  <input
                    type="text"
                    value={profile.name || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,

                        name: e.target.value,
                      })
                    }
                    className="input-style pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold">Email</label>

                <div className="relative mt-2">
                  <Mail
                    size={18}
                    className="absolute left-3 top-3 text-slate-400"
                  />

                  <input
                    type="email"
                    value={profile.email || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,

                        email: e.target.value,
                      })
                    }
                    className="input-style pl-10"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700"
              >
                <Save size={18} />
                Update Profile
              </button>
            </form>
          </div>

          {/* Change Password */}

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6">
            <h2 className="text-xl font-black dark:text-white mb-6">
              Change Password
            </h2>

            <form onSubmit={changePassword} className="space-y-5">
              <div>
                <label className="text-sm font-bold">Current Password</label>

                <input
                  type="password"
                  value={password.oldPassword}
                  onChange={(e) =>
                    setPassword({
                      ...password,

                      oldPassword: e.target.value,
                    })
                  }
                  className="input-style mt-2"
                />
              </div>

              <div>
                <label className="text-sm font-bold">New Password</label>

                <input
                  type="password"
                  value={password.newPassword}
                  onChange={(e) =>
                    setPassword({
                      ...password,

                      newPassword: e.target.value,
                    })
                  }
                  className="input-style mt-2"
                />
              </div>

              <div>
                <label className="text-sm font-bold">Confirm Password</label>

                <input
                  type="password"
                  value={password.confirmPassword}
                  onChange={(e) =>
                    setPassword({
                      ...password,

                      confirmPassword: e.target.value,
                    })
                  }
                  className="input-style mt-2"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-indigo-600 text-white py-3 rounded-xl font-bold"
              >
                <Lock size={18} />
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

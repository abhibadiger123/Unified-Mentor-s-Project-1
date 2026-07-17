// src/pages/admin/ManageUsers.jsx

import { useEffect, useMemo, useState } from "react";

import {
  Search,
  Users,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserX,
  Edit,
} from "lucide-react";

import axios from "../../api/axios";

import useAuth from "../../hooks/useAuth";

import Loading from "../../components/Loading";

import EmptyState from "../../components/EmptyState";

import { getErrorMessage } from "../../utils/helpers";

import { formatDate } from "../../utils/formatters";

const ManageUsers = () => {
  const { token } = useAuth();

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [role, setRole] = useState("all");

  // ============================
  // Fetch Users
  // ============================

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "/admin/users",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ============================
  // Filter Users
  // ============================

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const name = user.name?.toLowerCase() || "";

      const email = user.email?.toLowerCase() || "";

      const searchText = search.toLowerCase();

      const matchesSearch =
        name.includes(searchText) || email.includes(searchText);

      const matchesRole = role === "all" || user.role === role;

      return matchesSearch && matchesRole;
    });
  }, [users, search, role]);

  // ============================
  // Update Role
  // ============================

  const updateRole = async (id, newRole) => {
    try {
      await axios.put(
        `/admin/users/${id}/role`,

        {
          role: newRole,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchUsers();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  // ============================
  // Update User Status
  // ============================

  const updateStatus = async (id, currentStatus) => {
    try {
      await axios.put(
        `/admin/users/${id}/status`,

        {
          status: !currentStatus,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchUsers();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  // ============================
  // Delete User
  // ============================

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `/admin/users/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchUsers();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (loading) {
    return <Loading message="Loading users..." />;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Manage Users
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage customers, agencies and platform accounts.
          </p>
        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-xl bg-red-100 dark:bg-red-900/30 p-4 text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        {/* Search & Filter */}

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-5 mb-8">
          <div className="grid md:grid-cols-2 gap-5">
            {/* Search */}

            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search user..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-style pl-11"
              />
            </div>

            {/* Role Filter */}

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input-style"
            >
              <option value="all">All Roles</option>

              <option value="customer">Customer</option>

              <option value="agency">Agency</option>

              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {/* Users Table */}

        {filteredUsers.length === 0 ? (
          <EmptyState
            title="No users found"
            description="Registered users will appear here."
          />
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-slate-700">
                    <th className="text-left p-5">User</th>

                    <th className="text-left p-5">Email</th>

                    <th className="text-left p-5">Role</th>

                    <th className="text-left p-5">Status</th>

                    <th className="text-left p-5">Joined</th>

                    <th className="text-left p-5">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b dark:border-slate-800"
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <Users size={20} />
                          </div>

                          <span className="font-bold">{user.name}</span>
                        </div>
                      </td>

                      <td>{user.email}</td>

                      <td>
                        <select
                          value={user.role}
                          onChange={(e) =>
                            updateRole(
                              user._id,

                              e.target.value,
                            )
                          }
                          className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800"
                        >
                          <option value="customer">Customer</option>

                          <option value="agency">Agency</option>

                          <option value="admin">Admin</option>
                        </select>
                      </td>

                      {/* Status */}

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold

                              ${
                                user.isActive !== false
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }

                              `}
                        >
                          {user.isActive !== false ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Joined Date */}

                      <td>{formatDate(user.createdAt)}</td>

                      {/* Actions */}

                      <td>
                        <div className="flex items-center gap-3">
                          {/* Activate / Deactivate */}

                          <button
                            onClick={() =>
                              updateStatus(
                                user._id,

                                user.isActive !== false,
                              )
                            }
                            className={`p-2 rounded-xl transition

                                ${
                                  user.isActive !== false
                                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                                    : "bg-green-100 text-green-600 hover:bg-green-200"
                                }

                                `}
                            title={
                              user.isActive !== false
                                ? "Deactivate User"
                                : "Activate User"
                            }
                          >
                            {user.isActive !== false ? (
                              <UserX size={18} />
                            ) : (
                              <UserCheck size={18} />
                            )}
                          </button>

                          {/* Delete */}

                          <button
                            onClick={() => deleteUser(user._id)}
                            className="p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200"
                            title="Delete User"
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

export default ManageUsers;

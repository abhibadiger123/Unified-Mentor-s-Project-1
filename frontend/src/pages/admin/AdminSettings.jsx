// src/pages/admin/AdminSettings.jsx

import { useEffect, useState } from "react";

import {
  Settings,
  Save,
  Bell,
  Shield,
  CreditCard,
  CalendarDays,
  Wrench,
} from "lucide-react";

import axios from "../../api/axios";

import useAuth from "../../hooks/useAuth";

import Loading from "../../components/Loading";

import { getErrorMessage } from "../../utils/helpers";

const AdminSettings = () => {
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [settings, setSettings] = useState({
    bookingLimit: 10,

    advanceBookingDays: 30,

    cancellationAllowed: true,

    paymentEnabled: true,

    emailNotification: true,

    smsNotification: false,

    maintenanceMode: false,

    twoFactorAuth: false,
  });

  // ============================
  // Fetch Settings
  // ============================

  const fetchSettings = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "/admin/settings",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setSettings(response.data.settings);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // ============================
  // Save Settings
  // ============================

  const saveSettings = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await axios.put(
        "/admin/settings",

        settings,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSuccess("Settings saved successfully");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  // Continue AdminSettings.jsx

  if (loading) {
    return <Loading message="Loading settings..." />;
  }

  const updateSetting = (key, value) => {
    setSettings({
      ...settings,

      [key]: value,
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Admin Settings
          </h1>

          <p className="mt-2 text-slate-500">
            Configure platform-wide settings.
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

        <form onSubmit={saveSettings} className="space-y-8">
          {/* Booking Settings */}

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <CalendarDays className="text-indigo-600" />

              <h2 className="text-xl font-black dark:text-white">
                Booking Settings
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="font-bold">Maximum Booking Limit</label>

                <input
                  type="number"
                  value={settings.bookingLimit}
                  onChange={(e) =>
                    updateSetting(
                      "bookingLimit",

                      Number(e.target.value),
                    )
                  }
                  className="input-style mt-2"
                />
              </div>

              <div>
                <label className="font-bold">Advance Booking Days</label>

                <input
                  type="number"
                  value={settings.advanceBookingDays}
                  onChange={(e) =>
                    updateSetting(
                      "advanceBookingDays",

                      Number(e.target.value),
                    )
                  }
                  className="input-style mt-2"
                />
              </div>
            </div>

            <label className="flex items-center gap-3 mt-6">
              <input
                type="checkbox"
                checked={settings.cancellationAllowed}
                onChange={(e) =>
                  updateSetting(
                    "cancellationAllowed",

                    e.target.checked,
                  )
                }
              />
              Allow Booking Cancellation
            </label>
          </div>

          {/* Payment Settings */}

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-green-600" />

              <h2 className="text-xl font-black dark:text-white">
                Payment Settings
              </h2>
            </div>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.paymentEnabled}
                onChange={(e) =>
                  updateSetting(
                    "paymentEnabled",

                    e.target.checked,
                  )
                }
              />
              Enable Online Payments
            </label>
          </div>

          {/* Notification Settings */}

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="text-orange-500" />

              <h2 className="text-xl font-black dark:text-white">
                Notification Settings
              </h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.emailNotification}
                  onChange={(e) =>
                    updateSetting(
                      "emailNotification",

                      e.target.checked,
                    )
                  }
                />
                Email Notifications
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.smsNotification}
                  onChange={(e) =>
                    updateSetting(
                      "smsNotification",

                      e.target.checked,
                    )
                  }
                />
                SMS Notifications
              </label>
            </div>
          </div>

          {/* Security Settings */}

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-red-500" />

              <h2 className="text-xl font-black dark:text-white">
                Security Settings
              </h2>
            </div>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={(e) =>
                  updateSetting(
                    "twoFactorAuth",

                    e.target.checked,
                  )
                }
              />
              Enable Two-Factor Authentication
            </label>
          </div>

          {/* Maintenance Mode */}

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Wrench className="text-yellow-500" />

              <h2 className="text-xl font-black dark:text-white">
                System Maintenance
              </h2>
            </div>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) =>
                  updateSetting(
                    "maintenanceMode",

                    e.target.checked,
                  )
                }
              />
              Enable Maintenance Mode
            </label>

            <p className="text-sm text-slate-500 mt-3">
              Temporarily disable customer access during system updates.
            </p>
          </div>

          {/* Save Button */}

          <button
            type="submit"
            disabled={saving}
            className="w-full flex items-center justify-center gap-3 bg-indigo-600 text-white py-4 rounded-2xl font-black hover:bg-indigo-700 disabled:opacity-50"
          >
            <Save size={20} />

            {saving ? "Saving..." : "Save Settings"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;

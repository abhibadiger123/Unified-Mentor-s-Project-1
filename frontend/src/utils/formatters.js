// src/utils/formatters.js

// ============================
// Currency Formatter
// ============================

export const formatPrice = (price) => {
  if (price === undefined || price === null) {
    return "₹0";
  }

  return `₹${Number(price).toLocaleString("en-IN")}`;
};

// ============================
// Number Formatter
// ============================

export const formatNumber = (number) => {
  if (number === undefined || number === null) {
    return "0";
  }

  return Number(number).toLocaleString("en-IN");
};

// ============================
// Vehicle Display Name
// ============================

export const formatVehicleName = (vehicle) => {
  if (!vehicle) {
    return "Unknown Vehicle";
  }

  return `${vehicle.brand || ""} ${vehicle.name || ""}`.trim();
};

// ============================
// Vehicle Registration Number
// ============================

export const formatRegistrationNumber = (number) => {
  if (!number) {
    return "N/A";
  }

  return number.toUpperCase();
};

// ============================
// Vehicle Status Label
// ============================

export const formatVehicleStatus = (status) => {
  const statusMap = {
    available: "Available",
    rented: "Rented",
    maintenance: "Maintenance",
  };

  return statusMap[status] || "Unknown";
};

// ============================
// Booking Status Label
// ============================

export const formatBookingStatus = (status) => {
  const statusMap = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    completed: "Completed",
  };

  return statusMap[status] || "Unknown";
};

// ============================
// Status Badge Classes
// ============================

export const getStatusColor = (status) => {
  const colors = {
    available:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    rented: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    maintenance:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    pending:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    approved: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    completed:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  };

  return colors[status] || "bg-gray-100 text-gray-700";
};

// ============================
// Short Text
// ============================

export const truncateText = (text, length = 50) => {
  if (!text) {
    return "";
  }

  if (text.length <= length) {
    return text;
  }

  return text.substring(0, length) + "...";
};

// ============================
// Date Formatter (FIXES THE ERROR)
// ============================

export const formatDate = (date) => {
  if (!date) {
    return "N/A";
  }

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ============================
// Date + Time Formatter
// ============================

export const formatDateTime = (date) => {
  if (!date) {
    return "N/A";
  }

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ============================
// Image Formatter
// ============================

export const getImageUrl = (image) => {
  if (!image) {
    return "/src/assets/no-image.png";
  }

  return image;
};

// ============================
// Vehicle Details Summary
// ============================

export const getVehicleSummary = (vehicle) => {
  if (!vehicle) {
    return "";
  }

  return [
    vehicle.brand,
    vehicle.modelYear,
    vehicle.fuelType,
    vehicle.transmission,
  ]
    .filter(Boolean)
    .join(" • ");
};

// ============================
// Calculate Booking Days
// ============================

export const calculateDays = (startDate, endDate) => {
  if (!startDate || !endDate) {
    return 0;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const difference = end - start;

  return Math.ceil(difference / (1000 * 60 * 60 * 24));
};
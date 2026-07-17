const express = require("express");

const {
  createBooking,
  getMyBookings,
  getAllBookings,
  getAgencyBookings, // <-- Ensure this is imported or handled in your controller
  updateBookingStatus,
  deleteBooking
} = require("../controllers/bookingController");

const {
  verifyToken,
  authorizeRoles
} = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * CUSTOMER - Create booking
 */
router.post(
  "/",
  verifyToken,
  authorizeRoles("customer", "admin"),
  createBooking
);

/**
 * CUSTOMER - View own bookings
 */
router.get(
  "/my",
  verifyToken,
  authorizeRoles("customer", "admin"),
  getMyBookings
);

/**
 * AGENCY - FIXED 404: Added explicit route for agency dashboard metrics
 */
router.get(
  "/agency",
  verifyToken,
  authorizeRoles("agency", "admin"),
  getAgencyBookings || getAllBookings // Fallback if controller function name differs
);

/**
 * ADMIN / AGENCY - View all bookings
 */
router.get(
  "/",
  verifyToken,
  authorizeRoles("agency", "admin"),
  getAllBookings
);

/**
 * ADMIN / AGENCY - Update booking status
 */
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("agency", "admin"),
  updateBookingStatus
);

/**
 * ADMIN - Delete booking
 */
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  deleteBooking
);

module.exports = router;
const express = require("express");

const {
  addVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  changeVehicleStatus,
  searchVehicles,
  getAgencyVehicles // <-- Ensure this is imported or handled in your controller
} = require("../controllers/vehicleController");

const {
  verifyToken,
  authorizeRoles
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllVehicles);

router.get("/search", searchVehicles);

// 1. FIXED 500: Added /my route ABOVE /:id so "my" isn't treated as an ObjectId string
router.get(
  "/my",
  verifyToken,
  authorizeRoles("agency", "admin"),
  getAgencyVehicles || getAllVehicles // Fallback check if controller function name differs
);

router.get("/:id", getVehicleById);

router.post(
  "/",
  verifyToken,
  authorizeRoles("agency", "admin"),
  addVehicle
);

router.put(
  "/:id",
  verifyToken,
  authorizeRoles("agency", "admin"),
  updateVehicle
);

router.patch(
  "/:id/status",
  verifyToken,
  authorizeRoles("agency", "admin"),
  changeVehicleStatus
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("agency", "admin"),
  deleteVehicle
);

module.exports = router;
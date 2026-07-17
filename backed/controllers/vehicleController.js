const Vehicle = require("../models/Vehicle");

// =============================
// Add Vehicle
// =============================
const addVehicle = async (req, res) => {
  try {
    const {
      name,
      type,
      brand,
      modelYear,
      fuelType,
      transmission,
      registrationNumber,
      pricing,
      image,
    } = req.body;

    const existing = await Vehicle.findOne({
      registrationNumber: registrationNumber.toUpperCase(),
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Vehicle already exists.",
      });
    }

    const vehicle = await Vehicle.create({
      name,
      type,
      brand,
      modelYear,
      fuelType,
      transmission,
      registrationNumber: registrationNumber.toUpperCase(),
      pricing,
      image,
      status: "available",
      agencyId: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Vehicle added successfully.",
      vehicle,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Get All Vehicles
// =============================
const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find()
      .populate("agencyId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: vehicles.length,
      vehicles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Get Vehicle By ID
// =============================
const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate(
      "agencyId",
      "name email",
    );

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found.",
      });
    }

    return res.status(200).json({
      success: true,
      vehicle,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Update Vehicle
// =============================
const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found.",
      });
    }

    if (
      vehicle.agencyId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized.",
      });
    }

    const {
      name,
      type,
      brand,
      modelYear,
      fuelType,
      transmission,
      registrationNumber,
      pricing,
      image,
      status,
    } = req.body;

    if (name) vehicle.name = name;
    if (type) vehicle.type = type;
    if (brand) vehicle.brand = brand;
    if (modelYear) vehicle.modelYear = modelYear;
    if (fuelType) vehicle.fuelType = fuelType;
    if (transmission) vehicle.transmission = transmission;

    if (registrationNumber) {
      vehicle.registrationNumber = registrationNumber.toUpperCase();
    }

    if (pricing) vehicle.pricing = pricing;
    if (image) vehicle.image = image;

    if (status) {
      vehicle.status = status;
    }

    await vehicle.save();

    return res.status(200).json({
      success: true,
      message: "Vehicle updated successfully.",
      vehicle,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Delete Vehicle
// =============================
const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found.",
      });
    }

    if (
      vehicle.agencyId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized.",
      });
    }

    await vehicle.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Change Vehicle Status
// =============================
const changeVehicleStatus = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found.",
      });
    }

    if (
      vehicle.agencyId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized.",
      });
    }

    const { status } = req.body;

    const allowedStatus = ["available", "rented", "maintenance"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status.",
      });
    }

    vehicle.status = status;

    await vehicle.save();

    return res.status(200).json({
      success: true,
      message: "Vehicle status updated successfully.",
      vehicle,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Search Vehicles
// =============================
const searchVehicles = async (req, res) => {
  try {
    const { type, brand, fuelType, transmission, status, minPrice, maxPrice } =
      req.query;

    const filter = {};

    if (type) filter.type = type;
    if (brand) filter.brand = brand;
    if (fuelType) filter.fuelType = fuelType;
    if (transmission) filter.transmission = transmission;
    if (status) filter.status = status;

    if (minPrice || maxPrice) {
      filter["pricing.daily"] = {};

      if (minPrice) filter["pricing.daily"].$gte = Number(minPrice);

      if (maxPrice) filter["pricing.daily"].$lte = Number(maxPrice);
    }

    const vehicles = await Vehicle.find(filter)
      .populate("agencyId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: vehicles.length,
      vehicles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  changeVehicleStatus,
  searchVehicles,
};

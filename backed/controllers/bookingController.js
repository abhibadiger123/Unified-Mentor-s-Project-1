const Booking = require("../models/Booking");
const Vehicle = require("../models/Vehicle");

const createBooking = async (req, res) => {
  try {
    const { vehicleId, startDate, endDate, totalCost } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found."
      });
    }

    if (vehicle.status !== "available") {
      return res.status(400).json({
        success: false,
        message: "Vehicle is not available."
      });
    }

    const booking = await Booking.create({
      customerId: req.user._id,
      vehicleId,
      startDate,
      endDate,
      totalCost,
      status: "pending"
    });

    vehicle.status = "rented";
    await vehicle.save();

    return res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      booking
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      customerId: req.user._id
    }).populate("vehicleId");

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("vehicleId")
      .populate("customerId", "name email");

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found."
      });
    }

    booking.status = status;
    await booking.save();

    if (status === "completed") {
      const vehicle = await Vehicle.findById(booking.vehicleId);
      if (vehicle) {
        vehicle.status = "available";
        await vehicle.save();
      }
    }

    return res.status(200).json({
      success: true,
      message: "Booking updated successfully.",
      booking
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found."
      });
    }

    await booking.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully."
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  deleteBooking
};
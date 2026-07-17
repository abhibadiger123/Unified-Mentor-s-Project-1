const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ["2W", "4W"],
      required: true
    },
    brand: {
      type: String,
      required: true,
      trim: true
    },
    modelYear: {
      type: Number,
      required: true
    },
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "CNG"],
      required: true
    },
    transmission: {
      type: String,
      enum: ["Manual", "Automatic"],
      required: true
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true
    },
    pricing: {
      daily: {
        type: Number,
        required: true
      },
      weekly: {
        type: Number,
        required: true
      },
      monthly: {
        type: Number,
        required: true
      }
    },
    status: {
      type: String,
      enum: ["available", "rented", "maintenance"],
      default: "available"
    },
    agencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
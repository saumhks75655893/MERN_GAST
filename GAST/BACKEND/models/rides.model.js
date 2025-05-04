const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "captain",
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  status:{
    type: String,
    enum: ["pending", "confirmed","ongoing", "canceled", "completed"],
    default: "pending"
  }, 
  duration:{
    type: Number,
  },  // in seconds
  distance:{
    type: Number,
  }, // in meters
  paymentId:{
    type: String,
  }, 
  orderId:{
    type: String,
  }, 
  signature:{
    type: String,
  }, 
  otp:{
    type:String, 
    select:false,
    required: true,
    unique: true,
    minlength: [6, "OTP must be at least 6 characters long"],
    maxlength: [6, "OTP must be at most 6 characters long"] 
  }
});


module.exports = mongoose.model("ride", rideSchema);
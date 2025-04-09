const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// schema for captain
const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name at least 3 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "is invalid"],
    minlength: [5, "Email at least 5 characters long"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color at least 3 characters long"],
    },
    plate: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, "Plate at least 3 characters long"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity at least 1"],
    },
    vehicleType: {
      type: String,
      enum: ["car", "bike", "bicycle"],
      required: true,
    },
  },
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

// methods for captain schema

// method for token generation for captain 
captainSchema.methods.generateAuthToken = function() {
  const token =  jwt.sign({_id : this._id}, process.env.JWT_SECRET, {expiresIn:'24h'});

  return token; 
}

// method for password hashing for captain
captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// method for password matching for captain
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};



const captainModel = mongoose.model('captain', captainSchema);


module.exports = captainModel;
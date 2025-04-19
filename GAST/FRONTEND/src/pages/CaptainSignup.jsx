import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../logo/captainlogo.png";
import { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainSignup = () => {
  //for two way binding of input field
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      );
    
      //If we got here, it's 2xx
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("captainToken", data.token);
      navigate("/captainHome");
    } catch (error) {
      // Handle ALL errors here
      console.error(
        "Error while registering:",
        error.response?.data || error.message
      );
    }
    

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };

  return (
    <div
      className="p-7 flex flex-col justify-between min-h-screen font-semibold"
      style={{ backgroundColor: "#bee9e8" }}
    >
      {/* user login */}
      <div className="mb-4">
        <img src={logo} alt="logo" className="w-1/4 mb-2" />

        <form onSubmit={(e) => HandleSubmit(e)}>
          {/* user name */}
          <h3 className="text-lg mb-2 font-semibold">What's Captain Name </h3>
          <div className="flex gap-4">
            <input
              className="appearance-none bg-[#eeeeee] rounded-lg px-4 py-3 w-full text-lg text-gray-700 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-[#00b4d8] shadow-md mb-6"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              required
            />
            <input
              className="appearance-none bg-[#eeeeee] rounded-lg px-4 py-3 w-full text-lg text-gray-700 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-[#00b4d8] shadow-md mb-6"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name  "
              required
            />
          </div>
          {/* email input */}
          <h3 className="text-lg mb-2 font-semibold">
            What's Your Captain Email{" "}
          </h3>
          <input
            className="appearance-none bg-[#eeeeee] rounded-lg px-4 py-3 w-full text-lg text-gray-700 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-[#00b4d8] shadow-md mb-6"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          {/* password input */}
          <h3 className="text-lg mb-2 font-semibold">Enter Password</h3>
          <input
            className="appearance-none bg-[#eeeeee] rounded-lg px-4 py-3 w-full text-lg text-gray-700 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-[#00b4d8] shadow-md mb-6"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {/* vehicle color input */}
          <h3 className="text-lg mb-2 font-semibold">Vehicle Color</h3>
          <input
            className="appearance-none bg-[#eeeeee] rounded-lg px-4 py-3 w-full text-lg text-gray-700 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-[#00b4d8] shadow-md mb-6"
            type="text"
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
            placeholder="Vehicle Color"
            required
          />

          {/* vehicle plate input */}
          <h3 className="text-lg mb-2 font-semibold">Vehicle Plate</h3>
          <input
            className="appearance-none bg-[#eeeeee] rounded-lg px-4 py-3 w-full text-lg text-gray-700 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-[#00b4d8] shadow-md mb-6"
            type="text"
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
            placeholder="Vehicle Plate"
            required
          />

          {/* vehicle capacity input */}
          <h3 className="text-lg mb-2 font-semibold">Vehicle Capacity</h3>
          <input
            className="appearance-none bg-[#eeeeee] rounded-lg px-4 py-3 w-full text-lg text-gray-700 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-[#00b4d8] shadow-md mb-6"
            type="number"
            value={vehicleCapacity}
            onChange={(e) => setVehicleCapacity(e.target.value)}
            placeholder="Vehicle Capacity"
            required
          />

          {/* vehicle type input */}
          <h3 className="text-lg mb-2 font-semibold">Vehicle Type</h3>
          <select
            className="appearance-none bg-[#eeeeee] rounded-lg px-4 py-3 w-full text-lg text-gray-700 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-[#00b4d8] shadow-md mb-6"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Vehicle Type
            </option>
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="bicycle">Bicycle</option>
          </select>
          <button
            type="submit"
            className="appearance-none bg-[#e85d04] rounded-lg px-4 py-3 w-full text-lg font-bold placeholder:text-base focus:outline-none focus:ring-2 focus:ring-[#00b4d8] shadow-md mb-2"
          >
            Register As Captain
          </button>
        </form>
        <p className="font-bold text-center">
          Already have a account?
          <Link to={"/captainlogin"} className="text-[#4361ee] ">
            Login here{" "}
          </Link>
        </p>
      </div>

      {/*Captain sign in */}
      <div className="mt-6 font-bold">
        <p className="text-[10px] leading-tight">
          By proceeding, you consent to get calls, Whatsapp or SMS messages,
          including by automated means, from GAST and its affilitates to the
          email provided.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;

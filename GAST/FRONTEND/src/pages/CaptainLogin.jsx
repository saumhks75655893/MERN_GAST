import React from "react";
import { useState, useContext } from "react";
import logo from "../../logo/captainlogo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";


const CaptainLogin = () => {
  //for two way binding of input field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  //for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const captainData = ({
      email: email,
      password: password,
    });

    try{
      // Check if the email and password are empty
      if (!email || !password) {
        alert("Please fill in all fields.");
        return;
      }
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData); 

    if (response.status === 200) {
      const data = response.data;
      setCaptain(data.captain); // Set the captain data in context
      localStorage.setItem("captainToken", data.token); // Store the token in local storage

        navigate("/captainhome"); // Redirect to captain home page
      }
    }catch(error){
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }


    setEmail("");
    setPassword("");
  };
  return (
    <div
      className="p-7 flex flex-col justify-between h-screen font-semibold"
      style={{ backgroundColor: "#bee9e8" }}
    >
      {/* user login */}
      <div className="mb-4">
        <img src={logo} alt="logo" className="w-1/4 mb-2" />

        <form onSubmit={(e) => handleSubmit(e)}>
          <h3 className="text-xl mb-2 font-semibold">What's Your Email </h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 w-full border text-lg placeholder:text-base mb-7"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <h3 className="text-xl mb-2 font-semibold">Enter Password</h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 w-full border text-lg placeholder:text-base mb-7"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-[#111] text-white font-semibold rounded px-4 py-2 w-full text-lg placeholder:text-base mb-2"
          >
            Login As Captain{" "}
          </button>
        </form>
        <p className="font-bold text-center">
          Join a Fleet?
          <Link to={"/captainSignup"} className="text-[#4361ee] ">
            Register as a Captain{" "}
          </Link>
        </p>
      </div>

      {/*Captain sign in */}
      <div className="font-bold">
        <Link
          to={"/userlogin"}
          className="bg-[#e85d04] flex justify-center item-center text-white rounded px-4 py-2 w-full text-lg placeholder:text-base mb-5"
        >
          {" "}
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;

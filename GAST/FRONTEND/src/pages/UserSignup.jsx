import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import logo from "../../logo/logo1.png";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const Usersignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { setUser } = useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    if (response.status === 201) {
      const data = response.data

      setUser(data.user); 
      localStorage.setItem("userToken", data.token); // store user data in local storage


      navigate('/home'); 
    }

    setFirstName("");
    setLastName("");
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
          {/* user name */}
          <h3 className="text-lg mb-2 font-semibold">What's Your Name </h3>
          <div className="flex gap-4 mb-6">
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              required
            />
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2  text-lg placeholder:text-base"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name  "
              required
            />
          </div>
          {/* email input */}
          <h3 className="text-lg mb-2 font-semibold">What's Your Email </h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-base mb-6"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          {/* password input */}
          <h3 className="text-lg mb-2 font-semibold">Enter Password</h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-base mb-6"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <button
            type="submit"
            className="bg-[#111] text-white font-semibold rounded px-4 py-2 w-full text-base placeholder:text-sm mb-2"
          >
            Register
          </button>
        </form>
        <p className="font-bold text-center">
          Already have a account?
          <Link to={"/userlogin"} className="text-[#4361ee] ">
            Login here{" "}
          </Link>
        </p>
      </div>

      {/*Captain sign in */}
      <div className="font-bold">
        <p className="text-[10px] leading-tight">
          By proceeding, you consent to get calls, Whatsapp or SMS messages,
          including by automated means, from GAST and its affilitates to the
          email provided.
        </p>
      </div>
    </div>
  );
};

export default Usersignup;

import React, { useState } from "react";
import logo from "../../logo/logo1.png";
import { Link } from "react-router-dom";

const Userlogin = () => {
  //for two way binding of input field
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userData, setUserDataSet] = useState({});

  //for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here, such as calling an API or updating state

    setUserDataSet({
      email: email,
      password: password,
    });

    console.log("userData", userData);

    setEmail("");
    setPassword("");
  };

  //returning the JSX
  return (
    <div className="p-7 flex flex-col justify-between h-screen font-semibold" style={{backgroundColor: "#bee9e8"}}>
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
            Login
          </button>
        </form>
        <p className="font-bold text-center">
          New here?
          <Link to={"/usersignup"} className="text-[#4361ee] ">
             Creat New Account{" "}
          </Link>
        </p>
      </div>

      {/*Captain sign in */}
      <div className="font-bold">
        <Link
          to={"/captainlogin"}
          className="bg-[#007200] flex justify-center item-center text-white rounded px-4 py-2 w-full text-lg placeholder:text-base mb-5"
        >
          {" "}
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default Userlogin;

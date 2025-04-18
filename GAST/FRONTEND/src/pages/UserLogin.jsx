import React, {  useContext } from "react";
import logo from "../../logo/logo1.png";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Userlogin = () => {
  //for two way binding of input field
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // fetch data from the database
  const { setUser } = useContext(UserDataContext);

  //for navigation
  const navigate = useNavigate();

  //for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform login logic here, such as calling an API or updating state
    const userData = {
      email: email,
      password: password,
    };

    // send data to the server
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    );

    //login success
    if (response.status === 200) {
      const data = response.data;

      setUser(data.user); // set user data in context
      localStorage.setItem("token", data.token); // store user data in local storage
      navigate("/home"); // redirect to dashboard after login
    }

    setEmail("");
    setPassword("");
  };

  //returning the JSX
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

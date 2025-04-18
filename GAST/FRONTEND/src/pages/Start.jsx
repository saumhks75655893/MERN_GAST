import React from "react";
import logo from "../../logo/logo1.png"; // Adjust the path as necessary
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1669818479560-5dd687c0b8db?q=80&w=1929&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-6 flex justify-between flex-col w-full">
        <img src={logo} className="w-24 m-5 invert" alt="Description of image" />
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-3xl font-bold">Get Started with GAST</h2>
          <Link to={"/userlogin"} className="flex item-center justify-center w-full bg-black text-white py-3 rounded font-bold mt-5 text-xl">Continue</Link>
        </div>
      </div>
    </div>
  );
};

export default Start;

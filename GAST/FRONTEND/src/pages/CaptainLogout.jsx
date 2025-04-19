import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainLogout = () => {
  // get token from local storage
  const captainToken = localStorage.getItem("captainToken");
  // for navigation
  const navigate = useNavigate();

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
      headers: {
        Authorization: `Bearer ${captainToken}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("captainToken");
        navigate("/captainlogin");
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return <div></div>;
};

export default CaptainLogout;

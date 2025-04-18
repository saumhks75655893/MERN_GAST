import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  // get token from local storage
  const token = localStorage.getItem("token");
  // for navigation
  const navigate = useNavigate();

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/userlogin");
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return <div></div>;
};

export default UserLogout;

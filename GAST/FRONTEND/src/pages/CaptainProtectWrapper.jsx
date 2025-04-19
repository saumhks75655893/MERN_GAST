import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CaptainProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const captainToken = localStorage.getItem("captainToken");

  useEffect(() => {
    if (!captainToken) {
      navigate("/captainlogin");
    }
  }, [captainToken, navigate]);

  return captainToken ? children : null;
};

export default CaptainProtectWrapper;

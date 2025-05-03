import React, { createContext, useState, useEffect } from "react";

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);

  useEffect(() => {
    const storedCaptain = localStorage.getItem("captainData");
    if (storedCaptain) {
      console.log("Hydrating captain from localStorage:", storedCaptain); // debug
      setCaptain(JSON.parse(storedCaptain));
    }
  }, []);

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;

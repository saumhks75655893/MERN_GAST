import React, { createContext, useEffect, useState } from "react";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    // console.log(storedUser); 
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  return (
    <UserDataContext.Provider value={{user, setUser}}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;

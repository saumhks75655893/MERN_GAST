import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Userlogin from "./pages/Userlogin";
import Usersignup from "./pages/Usersignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";


const App = () => {
  return (
    <div>
      <Routes>
        {/* router path for Home */}
        <Route path="/" element={<Home />} />

        {/* router path for Userlogin */}
        <Route path="/userlogin" element={<Userlogin />} />

        {/* router path for Usersignup */}
        <Route path="/usersignup" element={<Usersignup />} />

        {/* router path for CaptainLogin */}
        <Route path="/captainlogin" element={<CaptainLogin />} />

        {/* router path for CaptainSignup */}
        <Route path="/captainsignup" element={<CaptainSignup />} />
      </Routes>
    </div>
  );
};

export default App;

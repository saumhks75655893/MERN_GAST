import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import Userlogin from "./pages/Userlogin";
import Usersignup from "./pages/Usersignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Home from "./pages/Home";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserLogout from "./pages/userLogout";
import CaptainHome from "./pages/captainHome";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";

const App = () => {
  return (
    <div>
      <Routes>
        {/* router path for start */}
        <Route path="/" element={<Start />} />

        {/* router path for Userlogin */}
        <Route path="/userlogin" element={<Userlogin />} />

        {/* router path for Usersignup */}
        <Route path="/usersignup" element={<Usersignup />} />

        {/* router path for CaptainLogin */}
        <Route path="/captainlogin" element={<CaptainLogin />} />

        {/* router path for CaptainSignup */}
        <Route path="/captainsignup" element={<CaptainSignup />} />

        {/* router path for Home */}
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />

        {/* router path for logout user */}
        <Route
          path="user/userlogout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />

        {/* router path for captain home */}
        <Route
          path="/captainhome"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

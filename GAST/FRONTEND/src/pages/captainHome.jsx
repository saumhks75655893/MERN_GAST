import React, { use, useContext, useEffect, useRef, useState } from "react";
import logo from "../../logo/logo1.png";
import { Link } from "react-router-dom";
import CaptainDetails from "../Components/CaptainDetails";
import ConfirmRidePopUp from "../Components/ConfirmRidePopUp";
import RidePopUp from "../Components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainHome = () => {
  const [ridePopPanel, setRidePopPanel] = useState(true);
  const ridePopPanelRef = useRef(null);
  const [ConfirmRidePopPanel, setConfirmRidePopPanel] = useState(false);
  const ConfirmRidePopPanelRef = useRef(null);
  const { sendMessage, receiveMessage } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (!captain || !captain._id) return;
    // console.log(user);
    sendMessage("join", { userType: "captain", userId: captain._id });
    console.log(captain._id);
  }, [captain]);

  // for ignore
  useGSAP(() => {
    if (ridePopPanel) {
      gsap.to(ridePopPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ridePopPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ridePopPanel]);

  // for confirm
  useGSAP(() => {
    if (ConfirmRidePopPanel) {
      gsap.to(ConfirmRidePopPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ConfirmRidePopPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ConfirmRidePopPanel]);
  return (
    <div className="flex flex-col justify-between w-screen h-screen">
      {/* for the upper portion of the captain */}
      <div className="h-3/5">
        <div>
          <img
            src={logo}
            className="fixed w-20 absolute left-5 top-5"
            alt="Description of image"
          />
          <Link
            to="/captainHome"
            className="fixed right-5 top-8 h-10 w-10 bg-white rounded-full flex items-center justify-center"
          >
            <i className="text-2xl text-gray-700 font-medium ri-logout-box-r-line"></i>
          </Link>
        </div>
        <img
          className="w-full h-full "
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        ></img>
      </div>

      {/* captain details */}
      <div className="h-2/5 p-3 mb-4">
        <CaptainDetails />
      </div>

      {/* pop window for captain requested rides */}
      <div
        ref={ridePopPanelRef}
        className="fixed w-full z-10 translate-y-full bg-white px-3 py-2 bottom-0"
      >
        <RidePopUp
          setRidePopPanel={setRidePopPanel}
          setConfirmRidePopPanel={setConfirmRidePopPanel}
        />
      </div>

      {/* pop window for captain to confirm the  rides */}
      <div
        ref={ConfirmRidePopPanelRef}
        className="fixed w-full h-screen z-10 translate-y-full bg-white px-3 py-2 bottom-0"
      >
        <ConfirmRidePopUp
          setRidePopPanel={setRidePopPanel}
          setConfirmRidePopPanel={setConfirmRidePopPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;

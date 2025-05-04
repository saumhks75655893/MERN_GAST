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
import axios from "axios";

const CaptainHome = () => {
  const [ridePopPanel, setRidePopPanel] = useState(false);
  const ridePopPanelRef = useRef(null);

  const [ConfirmRidePopPanel, setConfirmRidePopPanel] = useState(false);
  const ConfirmRidePopPanelRef = useRef(null);

  const { sendMessage, receiveMessage } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);

  const [ride, setRide] = useState(null)



  useEffect(() => {
    console.log("Effect triggered. Captain:", captain, "Socket:", socket);
    if (!captain || !captain._id || !socket) return;

    sendMessage("join", { userType: "captain", userId: captain._id });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log({
              userId: captain._id,
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            });

            socket.emit("update-location-captain", {
              userId: captain._id,
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            });
          },
          (error) => {
            console.error("Geolocation error:", error);
          }
        );
      } else {
        console.warn("Geolocation not supported.");
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
  }, [captain, socket]);



  // for showing the ride popup
  if (socket) {
    socket.on("newRide", (data) => {
      console.log("New ride received:", data);
      setRide(data); 
      setRidePopPanel(true);
    });
  }



// ride popup confirmRide 
async function confirmRide() {
  try {
    const token = localStorage.getItem("captainToken");

    console.log(token)
    if (!token || !ride || !ride._id || !captain || !captain._id) {
      console.error("Missing required data for confirming ride.");
      return;
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Ride confirmed:", response.data);
    setRidePopPanel(false);
    setConfirmRidePopPanel(true);
  } catch (error) {
    console.error("Failed to confirm ride:", error);
  }
}

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
          ride={ride}
          setRidePopPanel={setRidePopPanel}
          setConfirmRidePopPanel={setConfirmRidePopPanel}
          confirmRide= {confirmRide}
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

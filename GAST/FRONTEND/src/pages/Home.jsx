import React, { use, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../logo/logo1.png"; // Adjust the path as necessary
import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../Components/LocationSearchPanel";
import VehiclePanel from "../Components/VehiclePanel";
import ConfirmedVehicle from "../Components/ConfirmedVehicle";
import WaitForDriverResponse from "../Components/WaitForDriverResponse";
import LookingForDriver from "../Components/LookingForDriver";

const Home = () => {
  const [pickup, setPickup] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [panelOpen, setPanelOpen] = React.useState(false);
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const confirmedVehicleRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [vehiclePanel, setvehiclePanel] = useState(false);
  const [confirmedVehiclePanel, setConfirmedVehiclePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setwaitingForDriver] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  // for the location selection panel
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "67%",
        padding: 14,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        visibility: "visible",
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: 0,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
        visibility: "hidden",
      });
    }
  }, [panelOpen]);

  // for the vehicle selection panel
  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanel]);

  // for the confirmation of the selected vehicle
  useGSAP(() => {
    if (confirmedVehiclePanel) {
      gsap.to(confirmedVehicleRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmedVehicleRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmedVehiclePanel]);

  // for found the vehicle
  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicleFound]);

  //waiting for the driver response
  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriver]);

  // return value
  return (
    <div className="h-screen relative overflow-hidden">
      <img
        src={logo}
        className="w-20 absolute left-5 top-5"
        alt="Description of image"
      />

      <div className="w-screen h-screen">
        <img
          className="w-full h-full "
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        ></img>
      </div>

      {/* for the location selection */}
      <div className="w-full flex flex-col justify-end h-screen absolute top-0 rounded-lg">
        <div className="h-[33%] p-3 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="text-2xl absolute right-3 top-3 font-bold text-center mt-3"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>

          <h4 className="text-3xl font-semibold m-3">Find A Trip</h4>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="line absolute h-15 w-1 top-[50%] left-7 bg-gray-400 rounded-full"></div>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              type="text"
              placeholder="Add a pickup location"
              className="bg-[#eeeeee]  w-full focus:border-blue-500 rounded-lg px-8 py-3 mb-4 font-semibold mt-3"
            />
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              type="text"
              placeholder="Enter your destination"
              className="bg-[#eeeeee] w-full focus:border-blue-500 rounded-lg px-8 py-3 font-semibold"
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setvehiclePanel={setvehiclePanel}
          />
        </div>
      </div>

      {/* for the vehicle selection */}
      <div
        ref={vehiclePanelRef}
        className="fixed w-full translate-y-full  z-10 bg-white px-3 py-2 bottom-0"
      >
        <VehiclePanel
          setvehiclePanel={setvehiclePanel}
          setPanelOpen={setPanelOpen}
          setConfirmedVehiclePanel={setConfirmedVehiclePanel}
        />
      </div>

      {/* for confirmed vehicle panel */}
      <div
        ref={confirmedVehicleRef}
        className="fixed w-full translate-y-full  z-10 bg-white px-3 py-2 bottom-0"
      >
        <ConfirmedVehicle
          setvehiclePanel={setvehiclePanel}
          setConfirmedVehiclePanel={setConfirmedVehiclePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      {/* for the looking for the driver*/}
      <div
        ref={vehicleFoundRef}
        className="fixed w-full translate-y-full  z-10 bg-white px-3 py-2 bottom-0"
      >
        <LookingForDriver setVehicleFound={setVehicleFound}   setConfirmedVehiclePanel={setConfirmedVehiclePanel} />
      </div>

      {/* for the driver confirmation for the ride*/}
      <div ref={waitingForDriverRef} className="fixed w-full z-10 bg-white px-3 py-2 bottom-0">
        <WaitForDriverResponse waitingForDriver={waitingForDriver} />
      </div>
    </div>
  );
};

export default Home;

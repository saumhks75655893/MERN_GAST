import React, { use, useContext, useRef, useState } from "react";
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
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = React.useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
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
  const [suggestions, setSuggestions] = useState([]);
  const [fair, setFair] = useState({});
  const [vehicleType, setvehicleType] = useState(null);

  const { sendMessage, receiveMessage } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    if (!user || !user._id) return;
    // console.log(user);
    sendMessage("join", { userType: "user", userId: user._id });
    console.log(user._id); 
  }, [user]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  //pickup handleDestinationChange
  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      // Adjust this line based on actual structure
      setPickupSuggestions(response.data.suggestions);
    } catch (error) {
      // console.error("Error fetching pickup suggestions:", error);
    }
  };
  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      setDestinationSuggestions(response.data.suggestions);
    } catch (error) {
      // console.error("Error fetching destination suggestions:", error);
    }
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
  useEffect(() => {
    if (confirmedVehiclePanel && confirmedVehicleRef.current) {
      gsap.fromTo(
        confirmedVehicleRef.current,
        { transform: "translateY(100%)" },
        { transform: "translateY(0%)", duration: 0.5 }
      );
    }
  }, [confirmedVehiclePanel]);

  // for found the vehicle
  useEffect(() => {
    if (vehicleFound && vehicleFoundRef.current) {
      gsap.fromTo(
        vehicleFoundRef.current,
        { transform: "translateY(100%)" },
        { transform: "translateY(0%)", duration: 0.5 }
      );
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

  // for finding the new trip fair
  async function findTrip() {
    setvehiclePanel(true);
    setPanelOpen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fair`,
      {
        params: { pickup: pickup, destination: destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

    console.log(response.data);
    setFair(response.data);
  }

  // for the vehicle selection panel
  async function createRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        { pickup: pickup, destination: destination, vehicleType: vehicleType },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      // setVehiclePanel(false);
      // setConfirmedVehiclePanel(true);
      console.log(response.data);
    } catch (error) {
      console.error("Error creating ride:", error);
    }
  }
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
        <div className="h-[45%] p-3 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="text-2xl absolute right-3 top-3 font-bold text-center mt-3"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>

          <h4 className="text-3xl font-semibold m-3">Find A Trip</h4>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="line absolute h-15 w-1 top-[37%] left-7 bg-gray-400 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true), setActiveField("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
              type="text"
              placeholder="Add a pickup location"
              className="bg-[#eeeeee]  w-full focus:border-blue-500 rounded-lg px-8 py-3 mb-4 font-semibold mt-3"
            />
            <input
              onClick={() => {
                setPanelOpen(true), setActiveField("destination");
              }}
              value={destination}
              onChange={handleDestinationChange}
              type="text"
              placeholder="Enter your destination"
              className="bg-[#eeeeee] w-full focus:border-blue-500 rounded-lg px-8 py-3 font-semibold"
            />
          </form>

          <button
            onClick={() => findTrip()}
            className="mt-5 p-4 text-white border-none bg-black rounded-lg font-bold text-lg w-full"
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="bg-white">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPanelOpen={setPanelOpen}
            setvehiclePanel={setvehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      {/* for the vehicle selection */}
      <div
        ref={vehiclePanelRef}
        className="fixed w-full translate-y-full  z-10 bg-white px-3 py-2 bottom-0"
      >
        <VehiclePanel
          selectVehicle={setvehicleType}
          setvehiclePanel={setvehiclePanel}
          setPanelOpen={setPanelOpen}
          fair={fair}
          setConfirmedVehiclePanel={setConfirmedVehiclePanel}
        />
      </div>

      {/* for confirmed vehicle panel */}
      {confirmedVehiclePanel && (
        <div
          ref={confirmedVehicleRef}
          className="fixed w-full z-10 bg-white px-3 py-2 bottom-0"
        >
          <ConfirmedVehicle
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fair={fair}
            vehicleType={vehicleType}
            setvehiclePanel={setvehiclePanel}
            setConfirmedVehiclePanel={setConfirmedVehiclePanel}
            setVehicleFound={setVehicleFound}
          />
        </div>
      )}

      {/* for the looking for the driver*/}
      {vehicleFound && (
        <div
          ref={vehicleFoundRef}
          className="fixed w-full z-10 bg-white px-3 py-2 bottom-0"
        >
          <LookingForDriver
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fair={fair}
            vehicleType={vehicleType}
            setVehicleFound={setVehicleFound}
            setConfirmedVehiclePanel={setConfirmedVehiclePanel}
          />
        </div>
      )}

      {/* for the driver confirmation for the ride*/}
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bg-white px-3 py-2 bottom-0"
      >
        <WaitForDriverResponse waitingForDriver={waitingForDriver} />
      </div>
    </div>
  );
};

export default Home;

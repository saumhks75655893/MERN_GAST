import React, { useRef, useState } from "react";
import logo from "../../logo/logo1.png";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../Components/FinishRide";

const CaptainRiding = () => {
  const [finishRidePanel, setfinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  // for ignore
  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [finishRidePanel]);

  return (
    <div className="flex flex-col justify-between w-screen h-screen">
      {/* for the upper portion of the captain */}
      <div className="h-4/5">
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
      <div className="h-1/5 py-3 w-full bg-[#52b69a] flex flex-col items-center justify-center">
        <h5>
          <i className="text-3xl font-bold text-gray-600 ri-arrow-up-wide-line"></i>
        </h5>
        <div
          onClick={() => {
            setfinishRidePanel(true);
          }}
          className="flex w-full p-4 items-center justify-between"
        >
          <h3 className="text-2xl font-bold text-white">4 KM. Away</h3>
          <button className="shadow w-1/2 text-white-600 border-gray-700 bg-yellow-400 rounded-xl text-xl font-bold p-4 rounded-lg>Complete Ride">
            Complete Ride
          </button>
        </div>
      </div>

      {/* pop window for captain to confirm the  rides */}
      <div
        ref={finishRidePanelRef}
        className="fixed w-full h-screen z-10 translate-y-full bg-white px-3 py-2 bottom-0"
      >
        <FinishRide setfinishRidePanel={setfinishRidePanel}/>
      </div>
    </div>
  );
};

export default CaptainRiding;

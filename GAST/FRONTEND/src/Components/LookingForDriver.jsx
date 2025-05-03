import React from "react";

const LookingForDriver = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          // props.setvehiclePanel(true);
          props.setConfirmedVehiclePanel(true);
          props.setVehicleFound(false)
        }}
        className="text-center p-2 text-gray-200 text-3xl"
      >
        <i className="ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl font-bold -mb-5"> Looking for a Driver </h3>
      <div className="flex flex-col gap-2 justify-between items-center mt-5">
        {/* vehicle image */}
        <img
          className="h-40"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
        ></img>
        {/* location for the ride */}
        <div className="w-full my-3 px-4 shadow py-2">
          <div className="flex items-center gap-5">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
               {props.pickup}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full mb-3 px-4 shadow py-2">
          <div className="flex items-center gap-5">
            <i className="text-lg ri-user-location-line"></i>
            <div>
              <h3 className="text-lg font-medium">{props.destination}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                BHOPAL INTERNATION SCHOOL, BHOPAL
              </p>
            </div>
          </div>
        </div>

        {/* Amount for the ride */}
        <div className="w-full mb-3 px-4 shadow py-2">
          <div className="flex items-center gap-5">
            <i className="text-lg ri-bank-card-fill"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.fair[props.vehicleType]}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;

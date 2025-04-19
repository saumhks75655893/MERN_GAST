import React from "react";

const ConfirmedVehicle = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setvehiclePanel(true);
          props.setConfirmedVehiclePanel(false);
          props.setPanelOpen(false);
        }}
        className="text-center p-2 text-gray-200 text-3xl"
      >
        <i className="ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl font-bold -mb-5">
        {" "}
        Confirm Your Ride{" "}
      </h3>
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
                Kankariya Talab, Bhopal
              </p>
            </div>
          </div>
        </div>

        <div className="w-full mb-3 px-4 shadow py-2">
          <div className="flex items-center gap-5">
            <i className="text-lg ri-user-location-line"></i>
            <div>
              <h3 className="text-lg font-medium">12A, NEWAR KUMAR'S COFFEE</h3>
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
              <h3 className="text-lg font-medium">₹196.20</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        {/* button for confirm the ride */}
        <button onClick={() => {
          props.setVehicleFound(true)
          props.setConfirmedVehiclePanel(false)
        }} className="w-full shadow text-white border-green-500 bg-green-500 text-xl font-bold p-3 rounded-lg mt-5">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmedVehicle;

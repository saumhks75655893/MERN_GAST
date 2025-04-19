import React from "react";

const VehiclePanel = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setvehiclePanel(false);
        }}
        className="text-center p-2 text-gray-200 text-3xl"
      >
        <i className="ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl font-bold mb-5"> Choose A Vehicle </h3>

      <div
        onClick={() => {
          props.setConfirmedVehiclePanel(true);
        }}
        className="flex border-2 shadow border-white active:border-black mb-4 rounded-xl w-full p-3 items-center justify-between"
      >
        <img
          className="h-20"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
        ></img>
        <div
          onClick={() => {
            props.setConfirmedVehiclePanel(true);
            props.setvehiclePanel(false);
          }}
          className="w-1/2 "
        >
          <h4 className="text-base font-semibold">
            {" "}
            CAR
            <span>
              {" "}
              <i className="ri-user-2-fill">4</i>
            </span>
          </h4>
          <h5 className="text-sm font-medium">2 Mins away</h5>
          <p className="text-xs font-medium">Affodable, Compact rides</p>
        </div>
        <h2 className="text-lg font-bold">₹193.20</h2>
      </div>

      <div
        onClick={() => {
          props.setConfirmedVehiclePanel(true);
          props.setvehiclePanel(false);
        }}
        className="flex border-2 shadow border-white active:border-black mb-4 rounded-xl w-full p-3 items-center justify-between"
      >
        <img
          className="h-20 px-3"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfZk9YnqF1LyugOEqiW3Wot1QKVZhVw202uQ&s"
        ></img>
        <div className="w-1/2 ">
          <h4 className="text-base font-semibold">
            {" "}
            BIKE
            <span>
              {" "}
              <i className="ri-user-2-fill"></i>2
            </span>
          </h4>
          <h5 className="text-sm font-medium">2 Mins away</h5>
          <p className="text-xs font-medium">Affodable, Bike rides</p>
        </div>
        <h2 className="text-lg font-bold">₹87.20</h2>
      </div>

      <div
        onClick={() => {
          props.setConfirmedVehiclePanel(true);
          props.setvehiclePanel(false);
        }}
        className="flex border-2 shadow border-white active:border-black mb-4 rounded-xl w-full p-2 items-center justify-between"
      >
        <img
          className="h-20 "
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0RK6TaUxHcDadqvEeT4ZlYcg7gmx5vhbT8g&s"
        ></img>
        <div className="w-1/2 ">
          <h4 className="text-base font-semibold">
            {" "}
            BICYCLE
            <span>
              {" "}
              <i className="ri-user-2-fill"></i>2
            </span>
          </h4>
          <h5 className="text-sm font-medium">2 Mins away</h5>
          <p className="text-xs font-medium">Affodable, Bicycle rides</p>
        </div>
        <h2 className="text-lg font-bold">₹56.60</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;

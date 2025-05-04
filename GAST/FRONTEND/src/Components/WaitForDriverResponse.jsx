import React from "react";

const WaitForDriverResponse = (props) => {
  return (
    <div>
      <h5
        onClick={(props) => {
          props.setVehicleFound(false);
        }}
        className="text-center p-2 text-gray-200 text-3xl"
      >
        <i className="ri-arrow-down-wide-fill"></i>
      </h5>

      <div className="flex items-center justify-around">
        <img className="h-30 border-gray-100 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnY8k4uXKv429FJkjP00thphr81cWXccfeNg&s"></img>
        <div className="flex flex-col text-right ">
          <h2 className="text-lg font-medium">{props.ride?.captain.fullname.firstname}</h2>
          <h4 className="text-2xl font-bold -mt-1 -mb-1">{props.ride?.captain.vehicle.plate}</h4>
          <p className="text-base font-medium text-gray-500"> Maruti Suzuki Alto</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 justify-between items-center mt-5">
        {/* vehicle image */}

        {/* location for the ride */}
        <div className="w-full my-3 px-4 shadow py-2">
          <div className="flex items-center gap-5">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
               {props.ride?.pickup}
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
                {props.ride?.destination}
              </p>
            </div>
          </div>
        </div>

        {/* Amount for the ride */}
        <div className="w-full mb-3 px-4 shadow py-2">
          <div className="flex items-center gap-5">
            <i className="text-lg ri-bank-card-fill"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitForDriverResponse;

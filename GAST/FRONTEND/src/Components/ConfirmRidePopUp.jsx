import React, { useState } from "react";

const ConfirmRidePopUp = ({
  ride,
  setRidePopPanel,
  setConfirmRidePopPanel,
  confirmRide,
}) => {
  const [otp, setOtp] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    confirmRide(otp); // Call confirmRide with OTP
  };

  if (!ride) return null;

  return (
    <div>
      <h5
        onClick={() => {
          setRidePopPanel(true);
          setConfirmRidePopPanel(false);
        }}
        className="text-center p-2 text-gray-200 text-3xl"
      >
        <i className="ri-arrow-down-wide-fill"></i>
      </h5>

      <h3 className="text-2xl font-bold mb-4">Confirm The Ride To Start!</h3>

      <div className="px-3 py-1 bg-yellow-400 rounded-lg flex justify-between items-center">
        <div className="flex items-center justify-center gap-2">
          <img
            className="h-25 border-gray-100 rounded-full p-4"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQqsaBK2hz-19t1HQnwjqPxgADLONZdFH3fg&s"
            alt="User"
          />
          <h2 className="text-xl font-semibold">
            {ride.user?.fullname?.firstname} {ride.user?.fullname?.lastname}
          </h2>
        </div>
        <h4 className="text-xl font-bold -mt-1 -mb-1">
          {ride.distance || "N/A"} KM
        </h4>
      </div>

      <div className="flex flex-col gap-2 justify-between items-center mt-5">
        <div className="w-full my-3 px-4 shadow py-2">
          <div className="flex items-center gap-5">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm -mt-1 text-gray-600">{ride.pickup}</p>
            </div>
          </div>
        </div>

        <div className="w-full mb-3 px-4 shadow py-2">
          <div className="flex items-center gap-5">
            <i className="text-lg ri-user-location-line"></i>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm -mt-1 text-gray-600">{ride.destination}</p>
            </div>
          </div>
        </div>

        <div className="w-full mb-3 px-4 shadow py-2">
          <div className="flex items-center gap-5">
            <i className="text-lg ri-bank-card-fill"></i>
            <div>
              <h3 className="text-lg font-medium">₹{ride.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>

        <div className="w-full mt-6">
          <form onSubmit={submitHandler}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              className="bg-[#eee] px-6 font-mono py-4 w-full text-lg rounded-lg mb-6"
              placeholder="Enter OTP"
            />

            <div className="w-full flex flex-row-reverse items-center justify-between gap-2">
              <button
                type="submit"
                className="flex justify-center w-1/2 shadow text-white border-green-500 bg-green-500 text-xl font-bold p-4 rounded-lg mb-1"
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmRidePopPanel(false)}
                className="w-1/2 shadow text-white p-4 bg-red-500 text-xl font-bold rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
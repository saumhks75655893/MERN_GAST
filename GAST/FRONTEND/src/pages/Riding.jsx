import React from "react";
import logo from "../../logo/logo1.png"
import { Link } from "react-router-dom";

const Riding = () => {
  return (
    <div>
      <img
        src={logo}
        className="w-20 absolute left-5 top-5"
        alt="Description of image"
      />
      <Link to='/home' className="fixed right-5 top-5 h-10 w-10 bg-white rounded-full flex items-center justify-center"><i className="text-xl text-gray-700 font-medium ri-home-4-line"></i></Link>
      <div className="w-screen h-screen">
        <div className="h-1/2">
          <img
            className="w-full h-full "
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          ></img>
        </div>
        <div className="h-1/2 p-4 mb-4">
          <div className="flex items-center justify-around">
            <img
              className="h-30 border-gray-100 rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnY8k4uXKv429FJkjP00thphr81cWXccfeNg&s"
            ></img>
            <div className="flex flex-col text-right ">
              <h2 className="text-lg font-medium">Raghav Raj</h2>
              <h4 className="text-2xl font-bold -mt-1 -mb-1">UP 65 AN 1929</h4>
              <p className="text-base font-medium text-gray-500">
                {" "}
                Maruti Suzuki Alto
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 justify-between items-center mt-5">
            {/* vehicle image */}

            {/* location for the ride */}
            <div className="w-full mb-3 px-4 shadow py-2">
              <div className="flex items-center gap-5">
                <i className="text-lg ri-user-location-line"></i>
                <div>
                  <h3 className="text-lg font-medium">
                    12A, NEWAR KUMAR'S COFFEE
                  </h3>
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
          </div>

          <button className="text-lg font-bold text-white bg-green-600 w-full rounded-lg p-2 mb-3 mt-3">
            {" "}
            Make a Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Riding;

import React from 'react'
import { Link } from 'react-router-dom';

const FinishRide = (props) => {
  return (
    <div className="">
    {/* pop-out the window */}
    <h5
      onClick={() => {
        props.setfinishRidePanel(false); 
      }}
      className="text-center p-2 text-gray-200 text-3xl"
    >
      <i className="ri-arrow-down-wide-fill"></i>
    </h5>

    {/* Info about the new ride */}
    <h3 className="text-2xl font-bold mb-4"> Finish the Ride! </h3>

    {/* info about the captain and the amount and the distance */}
    <div className="px-3 py-1 bg-yellow-400 rounded-lg flex justify-between items-center">
      <div className="flex items-center justify-center gap-2">
        <img
          className="h-25 border-gray-100 rounded-full p-4"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQqsaBK2hz-19t1HQnwjqPxgADLONZdFH3fg&s"
        ></img>
        <h2 className="text-xl font-semibold">Rina Kumari</h2>
      </div>
      <h4 className="text-xl font-bold -mt-1 -mb-1">2.2 KM</h4>
    </div>
    <div className="flex flex-col gap-2 justify-between items-center mt-5">
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

      <div className="w-full mt-20">
        <Link to='/CaptainHome' className='w-full mt-4 text-xl flex justify-center bg-green-500 text-white font-semibold p-3 rounded-lg'>Finish The Ride</Link>
      </div>
    </div>
  </div>
  )
}

export default FinishRide

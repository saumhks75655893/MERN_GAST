import React from "react";

const CaptainDetails = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          <img
            className="h-20 border-gray-100 rounded-full p-4"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnY8k4uXKv429FJkjP00thphr81cWXccfeNg&s"
          ></img>
          <h2 className="text-xl font-semibold">Raghav Raj</h2>
        </div>
        <div className="flex flex-col text-right ">
          <h4 className="text-2xl font-semibold -mt-1 -mb-1">₹245.90</h4>
          <h4 className="text-lg text-gray-400 font-medim -mt-1 -mb-1">
            Earned
          </h4>
        </div>
      </div>

      <div className="flex p-3 mt-6 bg-gray-100 rounded-xl justify-center gap-5 items-start font-bold">
        <div className="text-center">
          <i className="text-3xl mb-2 font-medium ri-timer-2-line"></i>
          <h2 className="text-lg font-medium">10.2</h2>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-medium ri-timer-2-line"></i>
          <h2 className="text-lg font-medium">10.2</h2>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-medium ri-booklet-line"></i>
          <h2 className="text-lg font-medium">10.2</h2>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;

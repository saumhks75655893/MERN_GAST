import React from "react";

const LocationSearchPanel = (props) => {
  // console.log(props);
  
  // sample array for location
  const locations = [
    "24B, GREEN FLAG ROAD, CHUNAR , NAYI BASTI",
    "21B, NEAR SINGHARNIA'S CAFFE, NEW MARKET , NEW DELHI",
    "11N, SAKALDIHA MARKET, CHANDAULI",
    "12A, NEWAR KUMAR'S CAFFE, BHOPAL INTERNATION SCHOOL, BHOPAL",
  ];

  return (
    <div>
      {locations.map(function (elem) {
        return (

          <div onClick={() => { props.setvehiclePanel(true); props.setPanelOpen(false); }} key={elem} className="flex gap-4 items-center border-2 border-white active:border-black  justify-start w-full bg-white p-2 rounded-lg shadow mb-4">
            <h2 className="bg-[#eee] h-11 flex items-center justify-center w-12 rounded-full shrink-0">
              <i className="ri-map-pin-2-fill text-red-400 text-lg"></i>
            </h2>
            <h4 className="text-base font-semibold mb-4">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;

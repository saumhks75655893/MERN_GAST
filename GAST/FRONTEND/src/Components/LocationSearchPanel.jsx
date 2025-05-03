import React from "react";

const LocationSearchPanel = ({ 
  suggestions, 
  setPanelOpen, 
  setvehiclePanel, 
  setPickup, 
  setDestination, 
  activeField 
}) => {

  const handleLocationSelect = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion.description);
    } else if (activeField === "destination") {
      setDestination(suggestion.description);
    }
    
    // setPanelOpen(false);
    // setvehiclePanel(true);
  };
  return (
    <div>
      {suggestions && suggestions.map((suggestion) => (
        <div 
          onClick={() => handleLocationSelect(suggestion)} 
          key={suggestion.place_id} 
          className="flex gap-4 items-center border-2 border-white active:border-black justify-start w-full bg-white p-2 rounded-lg shadow mb-4"
        >
          <h2 className="bg-[#eee] h-11 flex items-center justify-center w-12 rounded-full shrink-0">
            <i className="ri-map-pin-2-fill text-red-400 text-lg"></i>
          </h2>
          <h4 className="text-base font-semibold">{suggestion.description}</h4>
        </div>
      ))}
      
      {(!suggestions || suggestions.length === 0) && (
        <div className="text-center text-gray-500 p-4">
          No suggestions available
        </div>
      )}
    </div>
  );
};

export default LocationSearchPanel;
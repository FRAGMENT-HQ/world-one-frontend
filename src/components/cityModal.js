import React from "react";
import Modal from "@mui/material/Modal";
import Select from "react-dropdown-select";

const options = [
  { label: " New Delhi", value: "New Delhi" },
  { label: "Gurgaon", value: "Gurgaon" },
  { label: "Noida", value: "Noida" },
  { label: "Kolkata", value: "Kolkata" },
  { label: "Mumbai", value: "Mumbai" },
  { label: "Chandigarh", value: "Chandigarh" },
  { label: "Hyderabad", value: "Hyderabad" },
  { label: "Vadodara", value: "Vadodara" },
  { label: "Lucknow", value: "Lucknow" },
  { label: "Bangalore", value: "Bangalore" },
  { label: "Kochi", value: "Kochi" },
  { label: "Chennai", value: "Chennai" },
  { label: "Ludhiana", value: "Ludhiana" },
  { label: "Jalandhar", value: "Jalandhar" },
  { label: "Amritsar", value: "Amritsar" },
  { label: "Ahmedabad", value: "Ahmedabad" },
  { label: "Trichy", value: "Trichy" },
  { label: "Pune", value: "Pune" },
  { label: "Calicut", value: "Calicut" },
];

const style = {
  // position: "absolute",
  top: "50%",
  left: "40%",
  transform: "translate(-30%, -70%)",
  bgcolor: "#FFF",
  p: 4,
  borderRadius: "32px",
  boxShadow: 24,

};

function CityModal({ open, onClose, onCitySelect, city,onClick,redirectTo }) {
  
  return (
    <>
    {/* blur the background */}
      <Modal
      
      
      style={style} open={open} onClose={onClose}>
        <div className=" flex flex-col items-center min-w-[60vw] h-[33.5rem] relative shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] rounded-[32px] bg-white overflow-y-auto overflow-x-hidden text-[1.5rem] text-secondary font-button-large mq762:h-auto mq762:min-h-[536]">
          <div className=" mt-8 box-border flex flex-row items-center justify-between  text-center text-[2rem] text-text3 ">
            Select City
          </div>

          <div className="flex flex-row flex-wrap items-center w-full py-[3rem] px-[1.437rem]  justify-around overflow-y-scroll ">
            {/* <div className=" w-[7rem] h-[6.5rem] shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-2xl bg-white overflow-hidden flex flex-col items-center justify-center py-[1rem] px-[1.656rem]">
              New Delhi
            </div> */}
            {options.map((option) => {
              
              return (
                <div
                  key={option.value}
                  onClick={() => onCitySelect(option)}
                  className={`w-[7.5rem] mt-4 ml-2 mr-2 h-[6.5rem] cursor-pointer shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-2xl  overflow-hidden flex flex-col items-center justify-center py-[1rem] px-[1.656rem] ${
                    city.value == option.value ? "!bg-darkslateblue-100" : "bg-white"
                  }`}
                >
                  {option.label}
                </div>
              );
            })}
          </div>
          <button
        onClick={onClick}
          className="cursor-pointer [border:none] py-[0.8rem] pr-[1.968rem] pl-[2.468rem] mb-4 bg-secondary w-[13.813rem] shadow-[0px_8px_24px_rgba(57,_26,_0,_0.15)] rounded-2xl overflow-hidden shrink-0 flex flex-row items-center justify-center box-border gap-[1rem]"
          // onClick={onCustomerDetailsClick}
        >
         
          <div className="flex-1 relative text-[1.5rem] leading-[2rem] font-body-small text-white text-left mq450:text-[1.188rem] mq450:leading-[1.625rem]">
            Continue
          </div>
          <img
            className="h-[2rem] w-[2rem] relative overflow-hidden shrink-0 min-h-[2rem]"
            alt=""
            src="/fiarrowright.svg"
          />
        </button>
        </div>
      </Modal>
    </>
  );
}

export default CityModal;

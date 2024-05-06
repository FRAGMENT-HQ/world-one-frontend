import React, { useRef } from "react";

const FrameComponent5 = ({
  pan,
  setPan,
  passportFront,
  setPassportFront,
  passportBack,
  setPassportBack,
  airTicket,
  setAirTicket,
  visa,
  setVisa,
}) => {
  const panRef = useRef(null);
  const passportFrontRef = useRef(null);
  const passportBackRef = useRef(null);
  const airTicketRef = useRef(null);
  const visaRef = useRef(null);


  return (
    <div className="self-stretch flex flex-col items-start justify-center gap-[1.5rem] text-left text-[1.25rem] text-text1 font-avenir-next-lt-pro">
      <div className=" relative leading-[2rem] font-medium inline-block mq450:text-[1rem] mq450:leading-[1.625rem]">
        Documents Required
      </div>
      <div className="  flex flex-row items-center justify-center gap-[2rem] mq900:gap-[1.5rem] flex-wrap">
        <button
          onClick={() => {
            panRef.current.click();
          }}
          className="cursor-pointer [border:none] py-[2.125rem] px-[1.825rem] bg-white  shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-3xl flex flex-row items-center justify-center box-border gap-[1rem] whitespace-nowrap hover:bg-gainsboro"
        >
          <img
            className="h-[3rem] w-[3rem] relative overflow-hidden shrink-0"
            alt=""
            src="/id-card.svg"
          />
          <div className="flex-1 relative text-[1.25rem] leading-[1.5rem] font-medium font-avenir-next-lt-pro text-text1 text-left">
            Upload Pan Card
          </div>
          <input
            
            onChange={(e) => {
              setPan(e.target.files[0]);
            }}
            ref={panRef}
            type="file"
            className="hidden"
          />
        </button>
        <button
          onClick={() => {
            passportFrontRef.current.click();
          }}
          className="cursor-pointer [border:none] py-[2.125rem] px-[1.981rem] bg-white shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-3xl flex flex-row items-center justify-center gap-[1rem] whitespace-nowrap hover:bg-gainsboro"
        >
          <img
            className="h-[3rem] w-[3rem] relative overflow-hidden shrink-0 min-h-[3rem]"
            alt=""
            src="/passport.svg"
          />
          <div className="relative text-[1.25rem] leading-[1.5rem] font-medium font-avenir-next-lt-pro text-text1 text-left">
            <p className="m-0">Upload Passport</p>
            <p className="m-0">(Front)</p>
          </div>
          <input
            onChange={(e) => {
              setPassportFront(e.target.files[0]);
            }}
            ref={passportFrontRef}
            type="file"
            className="hidden"
          />
        </button>
        <div
          onClick={() => {
            passportBackRef.current.click();
          }}
          className="shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-3xl bg-white flex flex-row items-center justify-center py-[2.125rem] px-[2rem] gap-[1rem]"
        >
          <img
            className="h-[3rem] w-[3rem] relative overflow-hidden shrink-0 min-h-[3rem]"
            loading="lazy"
            alt=""
            src="/passport.svg"
          />
          <div className="relative leading-[1.5rem] font-medium mq450:text-[1rem] mq450:leading-[1.188rem]">
            <p className="m-0">Upload Passport</p>
            <p className="m-0">(Back)</p>
          </div>
          <input
            onChange={(e) => {
              setPassportBack(e.target.files[0]);
            }}
            ref={passportBackRef}
            type="file"
            className="hidden"
          />
        </div>
        <div
          onClick={() => {
            airTicketRef.current.click();
          }}
          className="shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-3xl bg-white flex flex-row items-center justify-center py-[2.125rem] px-[1.75rem] box-border gap-[1rem]    whitespace-nowrap"
        >
          <img
            className="h-[3rem] w-[3rem] relative overflow-hidden shrink-0"
            loading="lazy"
            alt=""
            src="/air.svg"
          />
          <div className="flex-1 relative leading-[1.5rem] font-medium">
            Upload Air Ticket
          </div>
          <input
            onChange={(e) => {
              setAirTicket(e.target.files[0]);
            }}
            ref={airTicketRef}
            type="file"
            className="hidden"
          />
        </div>
        <button
          onClick={() => {
            visaRef.current.click();
          }}
          className="cursor-pointer [border:none] py-[2.125rem] px-[1.687rem] bg-white  shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-3xl flex flex-row items-center justify-center box-border gap-[1rem]    whitespace-nowrap hover:bg-gainsboro"
        >
          <img
            className="h-[3rem] w-[3rem] relative overflow-hidden shrink-0"
            alt=""
            src="/passport-2.svg"
          />
          <div className="flex-1 relative text-[1.25rem] leading-[1.5rem] font-medium font-avenir-next-lt-pro text-text1 text-left">
            Upload Valid Visa
          </div>
          <input
            onChange={(e) => {
              setVisa(e.target.files[0]);
            }}
            ref={visaRef}
            type="file"
            className="hidden"
          />
        </button>
      </div>
    </div>
  );
};
export default FrameComponent5;

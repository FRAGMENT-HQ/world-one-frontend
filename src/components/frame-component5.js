import React, { useRef, useState,useEffect } from "react";
import Switch from "@mui/material/Switch";
import "react-dropdown/style.css";
import { TailSpin } from 'react-loader-spinner'


const Loading = () => {
  return (
    <TailSpin
      color="#CFEEFF"
      height={50}
      width={50}
      timeout={2500} //3 secs
      ariaLabel="tail-spin-loading"
      radius="1"
    />
  );
};


const FrameComponent5 = ({
  pan,
  setPan,
  cPan,
  setCPan,
  passportFront,
  setPassportFront,
  passportBack,
  setPassportBack,
  airTicket,
  setAirTicket,
  visa,
  setVisa,
  checked,
  setChecked,
  airTicketState,
  extraFile,
  setExtraFile,
  purpous,
  setPurpous,
  name,
  orderData,
  showPan=true,
}) => {
  const panRef = useRef(null);
  const passportFrontRef = useRef(null);
  const passportBackRef = useRef(null);
  const airTicketRef = useRef(null);
  const visaRef = useRef(null);
  const extraFileRef = useRef(null);
  const cPanRef = useRef(null);
  // const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const [status, setStatus] = useState(true);
  const [Citzen, setCitzen] = useState();
  const [loading, setLoading] = useState(false);
  const [passportFLoading, setPassportFLoading] = useState(false);
  const [passportBLoading, setPassportBLoading] = useState(false);
  const [airTicketLoading, setAirTicketLoading] = useState(false);
  const [visaLoading, setVisaLoading] = useState(false);
  const [extraFileLoading, setExtraFileLoading] = useState(false);
  const [cPanLoading, setCPanLoading] = useState(false);


  useEffect(() => {
    let timeoutId;

    // Simulating an async operation (e.g., fetching data)
    if (loading === true) {
    const fetchData = () => {
      setLoading(true);
      timeoutId = setTimeout(() => {

        setLoading(false);
      }, 2500); // Simulate a 1 second delay
    };

    fetchData();
  }
  if(passportFLoading === true){
    const fetchData = () => {
      setPassportFLoading(true);
      timeoutId = setTimeout(() => {
        setPassportFLoading(false);
      }, 2500); // Simulate a 1 second delay
    };

    fetchData();
  }
  if(passportBLoading === true){
    const fetchData = () => {
      setPassportBLoading(true);
      timeoutId = setTimeout(() => {
        setPassportBLoading(false);
      }, 2500); // Simulate a 1 second delay
    };

    fetchData();
  }

  if(airTicketLoading === true){
    const fetchData = () => {
      setAirTicketLoading(true);
      timeoutId = setTimeout(() => {
        setAirTicketLoading(false);
      }, 2500); // Simulate a 1 second delay
    };
    
    fetchData();
  }
  if(visaLoading === true){
    const fetchData = () => {
      setVisaLoading(true);
      timeoutId = setTimeout(() => {
        setVisaLoading(false);
      }, 2500); // Simulate a 1 second delay
    };

    fetchData();
  }
  if(extraFileLoading === true){
    const fetchData = () => {
      setExtraFileLoading(true);
      timeoutId = setTimeout(() => {
        setExtraFileLoading(false);
      }, 2500); // Simulate a 1 second delay
    };

    fetchData();
  }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [loading,passportFLoading,passportBLoading,airTicketLoading,visaLoading,extraFileLoading,cPanLoading]);




  useEffect(() => {
 
    if (orderData?.citizinShip != "Indian/NRI") {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [orderData?.citizinShip])
  
  useEffect(() => {
    // console.log(orderData.purpous);
    setPurpous(purpous ? purpous : orderData?.purpous);
    
  }, [orderData?.purpous,])
  

  return (
    <div className="self-stretch flex flex-col items-start justify-center gap-[1.5rem] text-left text-[1.25rem] text-text1 font-avenir-next-lt-pro">
      

      {/* {status && (
        <div className="self-stretch flex flex-row flex-wrap items-center justify-start gap-[3rem] max-w-full shrink-0 mq900:gap-[1.5rem]">
          <div className="relative leading-[2rem] font-normal mq450:text-[1rem] mq450:leading-[1.625rem]">
            Citizenship status
          </div>
          <div className="flex-1 rounded-lg bg-white box-border  flex flex-row items-center justify-between  min-w-[55.875rem] [row-gap:20px] max-w-full gap-[0rem] text-text3 border-[0px] border-solid border-text4 mq1275:min-w-full mq1600:flex-wrap">
            <div className="w-[80.938rem] flex flex-row items-center justify-start gap-[1rem] max-w-full">
              <Select
                options={options}
                isSearchable={true}
                classNames={{
                  container: () =>
                    "w-full text-white !rounded-3xl border-none self-stretch rounded-lg bg-gray-100  ",
                  control: () =>
                    "py-1 self-stretch bg-transparent border-none !rounded-xl",
                  menuList: () => "bg-midnightblue",
                }}
                value={Citzen}
                onChange={setCitzen}
              />
            </div>
          </div>
        </div>
      )} */}
      <section className="self-stretch flex flex-col items-start justify-center gap-[1.5rem] max-w-full shrink-0 text-left text-[1.25rem] text-text1 font-avenir-next-lt-pro mq900:gap-[1rem]">
      <div className=" relative leading-[2rem] font-normal inline-block mq450:text-[1rem] mq450:leading-[1.625rem]">
        Documents Required
      </div>
        <div className="self-stretch rounded-3xl bg-darkslateblue-600 overflow-hidden flex flex-row flex-wrap items-center justify-start py-[1.5rem] px-[2rem] box-border gap-[1.5rem] max-w-full">
          <img
            className="h-[2rem] w-[2rem] relative overflow-hidden shrink-0"
            loading="lazy"
            alt=""
            src="/clipboard.svg"
          />
          <div className="flex-1 text-sm relative leading-[1.5rem] font-normal inline-block min-w-[59.5rem] max-w-full mq1275:min-w-full">
            Please upload the documents shown below. You may upload all the
            required documents after completing your booking as well. Your
            documents are safe and watermarked with order reference number to
            protect from misuse.
          </div>
        </div>
        { orderData?.type !== "Transfer Money Abroad" &&  <div className="self-stretch flex flex-col items-start justify-center gap-[1.5rem] max-w-full text-left text-[1rem] text-text1 font-avenir-next-lt-pro">
          <div className="w-[50.063rem] flex flex-row flex-wrap items-center justify-start gap-[4.5rem] max-w-full text-[1.25rem] text-text2 mq900:gap-[2.25rem] mq450:gap-[1.125rem]">
            <div className="flex-1 relative leading-[2rem] font-normal inline-block min-w-[25.688rem] max-w-full mq900:min-w-full mq450:text-[1rem] mq450:leading-[1.625rem]">
              In case you do not require a Visa or if you will receive a Visa on
              arrival
            </div>
            <Switch size="large" checked={checked} onChange={handleChange} />
          </div>
        </div>}

        {/* <FrameComponent1 />
        <FrameComponent /> */}
      </section>
      
      <div className="w-full flex flex-row items-center justify-around gap-5 flex-wrap">
        {(!status || Citzen?.value == "NRI" ) && (
          <button
            onClick={() => {
              panRef.current.click();
            }}
            className={`max-w-full sm:max-w-[340px] cursor-pointer flex-1 mb-4 [border:none] py-[2.125rem] px-[1.2rem] ${pan === null ? "bg-white text-text1 " : "bg-[#27357E] text-white"}   shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-3xl flex flex-row items-center justify-center box-border gap-[1rem] whitespace-nowrap hover:bg-gainsboro`}
          >
           { loading ? <Loading /> : <img
              className="h-[3rem] w-[3rem] relative overflow-hidden shrink-0"
              alt=""
              src={pan === null ? "/id-card.svg" : "/upload-icon.svg"}
            />}
            <div className="flex-1 relative text-[1.25rem] leading-[1.5rem] font-normal font-avenir-next-lt-pro  text-left">
              {`Upload${!loading ? `${pan !== null ? "ed" :"" } Pan Card` : "ing..."}`}
            </div>
            <input
              onChange={(e) => {
                setPan(e.target.files[0]);
                setLoading(true);
              }}
              ref={panRef}
              accept="application/pdf, image/* "
              type="file"
              className="hidden"
            />
          </button>
        )}
        { orderData?.type !== "Transfer Money Abroad" &&  <> <button
          onClick={() => {
            passportFrontRef.current.click();
          }}
          className={`flex-1 sm:max-w-[340px] mb-4 cursor-pointer [border:none] py-[2.125rem] px-[1.2rem] ${passportFront === null ? "bg-white text-text1 " : "bg-[#27357E] text-white"}   shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-3xl flex flex-row items-center justify-start box-border gap-[1rem] whitespace-nowrap hover:bg-gainsboro`}
        >
          { passportFLoading ? <Loading/> : <img
            className="h-[3rem] w-[3rem] relative overflow-hidden shrink-0 min-h-[3rem]"
            alt=""
            src={passportFront === null ? "/passport.svg" : "/upload-icon.svg"}
          />  }
          <div className="relative text-[1.25rem] leading-[1.5rem] font-normal font-avenir-next-lt-pro text-left">
            <p className="m-0">
              {/* {`Upload${passportFront === null ? " Passport" : "ed"}`}{" "} */}
              {`Upload${!passportFLoading ? `${passportFront !== null ? "ed" :"" } Passport` : "ing..."}`}
            </p>
            <p className="m-0">{(passportFront === null && !passportFLoading ) && "Front"}</p>
          </div>
          <input
            onChange={(e) => {
              setPassportFront(e.target.files[0]);
              setPassportFLoading(true);
            }}
            ref={passportFrontRef}
            type="file"
            className="hidden"
            accept="application/pdf, image/* "
          />
        </button>
        <div
          onClick={() => {
            passportBackRef.current.click();
          }}
          className={`flex-1 max-w-full sm:max-w-[340px] mb-4 cursor-pointer [border:none] py-[2.125rem] px-[1.2rem] ${passportBack === null ? "bg-white text-text1 " : "bg-[#27357E] text-white"}   shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-3xl flex flex-row items-center justify-start box-border gap-[1rem] whitespace-nowrap hover:bg-gainsboro`}
        >
          { passportBLoading? <Loading /> : <img
            className="h-[3rem] w-[3rem] relative overflow-hidden shrink-0 min-h-[3rem]"
            loading="lazy"
            alt=""
            src={passportBack === null ? "/passport.svg" : "/upload-icon.svg"}
          />}
          <div className="relative leading-[1.5rem] font-normal mq450:text-[1rem] mq450:leading-[1.188rem]">
            <p className="m-0">
              {/* {`Upload${passportBack === null ? " Passport" : "ed"}`}{" "} */}
              {`Upload${!passportBLoading ? `${passportBack !== null ? "ed" :"" } Passport` : "ing..."}`}
              
            </p>
            <p className="m-0">{passportBack === null && "(Back)"}</p>
          </div>
          <input
            onChange={(e) => {
              setPassportBack(e.target.files[0]);
              setPassportBLoading(true);
            }}
            ref={passportBackRef}
            type="file"
            className="hidden"
            accept="application/pdf, image/* "
          />
        </div> </>}
        {airTicketState && (
          <div
            onClick={() => {
              airTicketRef.current.click();
            }}
            className={`flex-1 max-w-full sm:max-w-[340px] mb-4 cursor-pointer [border:none] py-[2.125rem] px-[1.2rem] ${airTicket === null ? "bg-white text-text1 " : "bg-[#27357E] text-white"}   shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-3xl flex flex-row items-center justify-center box-border gap-[1rem] whitespace-nowrap hover:bg-gainsboro`}
          >
            { airTicketLoading ? <Loading /> :
             <img
              className="h-[3rem] w-[3rem] relative overflow-hidden shrink-0"
              loading="lazy"
              alt=""
              src={airTicket === null ? "/air.svg" : "/upload-icon.svg"}
            />}
            <div className="flex-1 relative leading-[1.5rem] font-normal">
              <p className="m-0">
                {/* {`Upload${airTicket === null ? " Air Ticket" : "ed"}`}{" "} */}
                {`Upload${!airTicketLoading ? `${airTicket !== null ? "ed" :"" } Air Ticket` : "ing..."}`}
                
              </p>
            </div>
            <input
              onChange={(e) => {
                setAirTicket(e.target.files[0]);
                setAirTicketLoading(true);
              }}
              ref={airTicketRef}
              type="file"
              className="hidden"
              accept="application/pdf, image/* "
            />
          </div>
        )}
        {checked == false && (
          <button
            onClick={() => {
              visaRef.current.click();
            }}
            className={`flex-1 max-w-full sm:max-w-[340px] mb-4 cursor-pointer [border:none] py-[2.125rem] px-[1.2rem] ${visa === null ? "bg-white text-text1 " : "bg-[#27357E] text-white"}   shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-3xl flex flex-row items-center justify-center box-border gap-[1rem] whitespace-nowrap hover:bg-gainsboro`}
          >
            { visaLoading ? <Loading /> : <img
              className="h-[3rem] w-[3rem] relative overflow-hidden shrink-0"
              alt=""
              src={visa === null ? "/passport-2.svg" : "/upload-icon.svg"}
            />}
            <div className="flex-1 relative text-[1.25rem] leading-[1.5rem] font-normal font-avenir-next-lt-pro text-left">
              <p className="m-0">
                {/* {`Upload${visa === null ? " Valid Visa" : "ed"}`}{" "} */}
                {`Upload${!visaLoading ? `${visa !== null ? "ed" :"" } Valid Visa` : "ing..."}`}

              </p>
            </div>
            <input
              onChange={(e) => {
                setVisa(e.target.files[0]);
                setVisaLoading(true);
              }}
              ref={visaRef}
              type="file"
              className="hidden"
              accept="application/pdf, image/* "
            />
          </button>
        )}

        {name && (
          <button
            onClick={() => {
              extraFileRef.current.click();
            }}
            className={`max-w-[100vw] sm:max-w-[340px] flex-1 mb-4 cursor-pointer [border:none] py-[2.125rem] px-[1.2rem] ${extraFile === null ? "bg-white text-text1 " : "bg-[#27357E] text-white"}   shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-3xl flex flex-row items-center justify-center box-border gap-[1rem] whitespace-nowrap hover:bg-gainsboro`}
          >
            { extraFileLoading ? <Loading/> : <img
              className="h-[3rem] w-[3rem] relative overflow-hidden shrink-0"
              alt=""
              src={extraFile === null ? "/passport-2.svg" : "/upload-icon.svg"}
            />}
            <div className="flex-1 relative text-[1.25rem] leading-[1.5rem] font-normal font-avenir-next-lt-pro text-left">
              <p className="m-0">
                {/* {`Upload${extraFile === null ? `` : "ed"} ${name}`}{" "} */}
                {`Upload${!extraFileLoading ? `${extraFile !== null ? "ed" :"" } ${name}` : "ing..."}`}

              </p>
            </div>
            <input
              onChange={(e) => {
                setExtraFile(e.target.files[0]);
                setExtraFileLoading(true);
              }}
              ref={extraFileRef}
              type="file"
              className="hidden"
              accept="application/pdf, image/* "
            />
          </button>
        )}
        {purpous == "Business" && (
          <button
            onClick={() => {
              cPanRef.current.click();
            }}
            className={`max-w-[100vw] sm:max-w-[340px] flex-1 mb-4 cursor-pointer [border:none] py-[2.125rem] px-[1.2rem] ${cPan === null ? "bg-white text-text1 " : "bg-[#27357E] text-white"}   shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-3xl flex flex-row items-center justify-center box-border gap-[1rem] whitespace-nowrap hover:bg-gainsboro`}
          >
            <img
              className="h-[3rem] w-[3rem] relative overflow-hidden shrink-0"
              alt=""
              src={cPan === null ? "/passport-2.svg" : "/upload-icon.svg"}
            />
            <div className="flex-1 relative text-[1.25rem] leading-[1.5rem] font-normal font-avenir-next-lt-pro text-left">
              <p className="m-0">
                {`${cPan === null ? ` Company Pan Card` : "Uploaded"}`}{" "}
              </p>
            </div>
            <input
              onChange={(e) => {
                setCPan(e.target.files[0]);
              }}
              ref={cPanRef}
              type="file"
              className="hidden"
              accept="application/pdf, image/* "
            />
          </button>
        )}
      </div>
    </div>
  );
};
export default FrameComponent5;

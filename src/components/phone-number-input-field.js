import FrameComponent3 from "./frame-component3";

const PhoneNumberInputField = ({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
}) => {
  return (
    <form className="m-0 self-stretch flex flex-row flex-wrap items-center justify-center gap-[3rem] max-w-full mq900:flex-col mq900:gap-[1.5rem]">
      <FrameComponent3
        travelersName="Traveler’s name"
        Placeholder="Enter full name"
        iconsarrowDropDown24px="/iconsarrow-drop-down-24px11.svg"
        value={name}
        setValue={setName}
      />
      <div className="flex-1 flex flex-col items-start justify-center gap-[0.75rem] min-w-[95%] sm:min-w-[23.125rem] max-w-full mq900:min-w-full mq900:flex-[unset] mq900:self-stretch">
        <div className=" relative text-[1.25rem] leading-[2rem] font-medium font-body-small text-text2 text-left inline-block mq450:text-[1rem] mq450:leading-[1.625rem]">
          Phone Number
        </div>
        <div className="self-stretch flex flex-row items-center justify-start gap-[0.75rem] max-w-full mq900:flex-wrap">
          <button className="cursor-pointer py-[0.625rem] px-[0.937rem] bg-white rounded-lg box-border overflow-hidden shrink-0 flex flex-row items-center justify-start gap-[0.5rem] border-[1px] border-solid border-text4 mq900:text-center mq900:flex-1 mq900:min-w-[158]">
            <div className="flex-1 flex flex-row items-center justify-start gap-[1rem]">
              
              <div className="flex-1 relative text-[1.25rem] leading-[2rem] font-medium font-body-small text-text3 text-left whitespace-nowrap mq450:text-[1rem] mq450:leading-[1.625rem]">
                +91
              </div>
            </div>
            {/* <img
              className="h-[2rem] w-[2rem] relative min-h-[2rem]"
              alt=""
              src="/iconsarrow-drop-down-24px.svg"
            /> */}
          </button>
          <div className="flex-1 rounded-lg bg-white box-border overflow-hidden flex flex-row items-center justify-start py-[0.625rem] pr-[0rem] pl-0 xs:pl-[1.5rem] gap-[0.5rem]  max-w-full border-[1px] border-solid border-text4">
            <input
              className=" w-[65%] sm:w-[42.75rem] [border:none] [outline:none] bg-[transparent] h-[2rem] flex flex-row items-center justify-start font-body-small font-medium text-[1.25rem] text-text3 max-w-[231%] shrink-0 "
              placeholder="Enter phone number"
              type="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {/* <img
              className="h-[2rem] w-[2rem] relative hidden min-h-[2rem]"
              alt=""
              src="/iconsarrow-drop-down-24px.svg"
            /> */}
          </div>
        </div>
      </div>
      <FrameComponent3
        travelersName="Email Address"
        frame18Placeholder="Enter email address"
        iconsarrowDropDown24px="/iconsarrow-drop-down-24px11.svg"
        propMinWidth="23.125rem"
        propWidth="8.25rem"
        propGap="14.956rem"
        value={email}
        setValue={setEmail}
      />
    </form>
  );
};

export default PhoneNumberInputField;

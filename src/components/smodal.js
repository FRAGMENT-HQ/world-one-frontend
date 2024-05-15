import { useCallback } from "react";
import { useRouter } from "next/router";
import Modal from '@mui/material/Modal';
import { useAtom } from "jotai";
import { user,order } from "@/states/storage";
const Smodal = ({open,handleClose}) => {
  const router = useRouter();

  const [orderData, setOrderData] = useAtom(order);
  const [userData, setUserData] = useAtom(user);

  const onFrameContainer5Click = ()=>{
    router.push("/");
}
const style = {
  // position: "absolute",
  // top: "50%",

  
  // transform: "translate(-30%, -70%)",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  bgcolor: "#FFF",
  p: 4,
  borderRadius: "32px",
  width:"100vw"
  // boxShadow: 24,

};

  return (
    <Modal style={style} onClose={handleClose} open={open} handleClose={handleClose}  >
    <div
      className="sm:w-[822px] w-[95vw] shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] rounded-13xl bg-white max-w-full overflow-hidden flex flex-col items-start justify-start py-[100px] px-[67px] box-border gap-[39px] leading-[normal] tracking-[normal] cursor-pointer text-center text-5xl text-text3 font-body-small mq450:gap-[19px] mq450:pl-5 mq450:pr-5 mq450:box-border"
      onClick={onFrameContainer5Click}
    >
      <div className="self-stretch flex flex-row items-start justify-center text-left text-13xl text-secondary">
        <div className="relative leading-[40px] mq450:text-lgi mq450:leading-[24px] mq750:text-7xl mq750:leading-[32px]">
          <span>{`Thank You ! `}</span>
          <span className="text-primary">{userData?.name}</span>
        </div>
      </div>
      <div className="self-stretch relative leading-[36px] font-medium mq450:text-lgi mq450:leading-[29px]">
        <p className="m-0">
          Your {orderData?.product} request has been submitted successfully.
        </p>
        <p className="m-0">we will revert you back.</p>
      </div>
      <div className="self-stretch flex flex-row items-start justify-center max-w-full">
        <div className="w-[489px] relative inline-block max-w-full mq450:text-lgi">
          <span className="leading-[36px] font-medium">{`Your Email ID : `}</span>
          <span className="leading-[40px] text-secondary">
            {userData?.email}
          </span>
        </div>
      </div>
      <div className="self-stretch flex flex-row items-start justify-start py-0 px-[76px] box-border max-w-full mq750:pl-[38px] mq750:pr-[38px] mq750:box-border">
        <button className="cursor-pointer [border:none] py-[18px] px-5 bg-secondary flex-1 shadow-[0px_8px_24px_rgba(57,_26,_0,_0.15)] rounded-2xl overflow-hidden flex flex-row items-start justify-center box-border gap-[16px] max-w-full hover:bg-darkslateblue-800">
          <img
            className="h-8 w-8 relative overflow-hidden shrink-0 hidden min-h-[32px]"
            alt=""
            src="/ushoppingcart.svg"
          />
          <div className="relative text-5xl leading-[32px] font-body-small text-white text-left inline-block min-w-[61px] mq450:text-lgi mq450:leading-[26px]">
            Done
          </div>
        </button>
      </div>
    </div>
    </Modal>
  );
};

export default Smodal;
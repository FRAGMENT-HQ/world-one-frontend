import Modal from '@mui/material/Modal';
import { useAtom } from "jotai";
import { user,order } from "@/states/storage";
const WarningModal = ({open,handleClose,message}) => {


const style = {

  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  bgcolor: "#FFF",
  p: 4,
  borderRadius: "32px",
  width:"100vw"
};

  return (
    <Modal style={style} onClose={handleClose} open={open} handleClose={handleClose}  >
    <div
      className="sm:w-[822px] w-[95vw] shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] rounded-13xl bg-white max-w-full overflow-hidden flex flex-col items-start justify-start py-[100px] px-[67px] box-border gap-[39px] leading-[normal] tracking-[normal] cursor-pointer text-center text-5xl text-text3 font-body-small mq450:gap-[19px] mq450:pl-5 mq450:pr-5 mq450:box-border"
      onClick={onFrameContainer5Click}
    >
    {message}
    </div>
    </Modal>
  );
};

export default WarningModal;
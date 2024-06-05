import { useRouter } from "next/router";
import { listOrdersMutation } from "@/hooks/prod";
import Smodal from "@/components/smodal";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { authUser } from "@/states/storage";
import Select from "react-select";
import Navbar from "@/components/navbar";
const options = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "highest", label: "Highest" },
  { value: "lowest", label: "Lowest" },
];

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

const BuySell = ({ type }) => {
  return (
    <div
      className={` font-semibold ${type == "BUY" ? "text-[#38B000]" : "text-[#FF3F2C]"}`}
    >
      {type}
    </div>
  );
};

const Status = ({ status }) => {
  return (
    <div className="">
      <img
        src={
          status == 0
            ? "/pending.svg"
            : status == 1
              ? "/approved.svg"
              : "/rejected.svg"
        }
      />
    </div>
  );
};

const BlockTime = ({ date = "May 22, 2024", time = "22:30" }) => {
  return (
    <div className="flex flex-col gap-2">
      <div> {date} </div> <div> {time}</div>
    </div>
  );
};

const Frame11 = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useAtom(authUser);
  const [data, setData] = useState([]);
  const router = useRouter();
  const size = useWindowSize();
  const { mutate: listOrders } = listOrdersMutation(
    (res) => {
      setData(res.data);
    },
    (err) => {
      toast.error(err.message);
    }
  );
  useEffect(() => {
    listOrders(user?.email);
  }, [user?.email]);

  


  return (
    <div className="w-full relative bg-background flex flex-col items-center justify-start pt-[3rem] px-[8%] laptop:px-[120px] pb-[10rem] box-border gap-[2.75rem] leading-[normal] tracking-[normal] mq900:gap-[1.375rem]">
      <Smodal open={open} setOpen={setOpen} />
      {/* <InputArray /> */}
      <Navbar />

      <section className=" flex  flex-row items-start justify-start gap-[2%] min-w-full">
        <div className="w-[23%] text-white min-w-[300px] h-96 bg-[#3C498B] rounded-xl pt-10 pb-2 flex flex-col items-center">
          <div className="w-24 h-24 bg-[#FF9135] text-center align-middle text-white font-semibold flex justify-center items-center text-[4rem] rounded-full">
            <div>{user?.name[0]}</div>
          </div>
          <div className="font-normal text-lg tracking-wide mt-4">
          {user?.name}
          </div>
          {/* <div className="font-medium mt-2">9833250066</div> */}
          <div className="font-medium mt-2">{user?.email}</div>
          <div className="flex-1"></div>
          <div className="">
            {" "}
            <img src="/logout.svg" />{" "}
          </div>
        </div>
        <div className="w-[75%] shadow-[0px_6px_48px_-4px_rgba(18,_25,_56,_0.1)] rounded-13xl bg-white flex flex-col items-start justify-center py-[4rem] px-[5%] sm:px-[1rem] box-border gap-[1rem] max-w-full mq900:gap-[1.5rem] mq900:pt-[2.625rem] mq900:pb-[2.625rem] mq900:box-border mq1325:pl-[1.625rem] mq1325:pr-[1.625rem] mq1325:box-border">
          <div className="w-full flex justify-between">
            <div className="text-5xl text-secondary font-semibold">
              All Transactions
            </div>
            <div className="flex gap-5">
              <Select
                options={options}
                classNames={{
                  container: () =>
                    " w-full  flex-1 min-w-36 text-white border-solid border-2 border-[#000] !rounded-xl bg-gray-100 py-0.5  ",
                  control: () =>
                    "self-stretch !bg-transparent !outline-none !border-none !mx-2",
                  menuList: () => "!bg-secondary min-w-18",
                  menu: () => "!bg-secondary min-w-18 py-2 rounded-xl",
                  option: () =>
                    "text-white hover:text-midnightblue min-w-18 hover:text-secondary",
                  input: () => "text-white !outline-none",
                  singleValue: () => "!text-[#333] !text-base",
                  indicatorSeparator: () => "hidden",
                }}
              />
              <input placeholder="search" className="w-48 rounded-xl px-4 " />
            </div>
          </div>
          <table
            className="w-full border-collapse gap-12 border-spacing-2.5 border border-slate-400 "
            // style={{
            //   borderSpacing: "0 12rem",
            // }}
          >
            <tr className="!border-b-2 border-t-0 border-x-0 py-5 !border-secondary !border-solid ">
              <td className="">Time</td>
              <td className="py-4">Type</td>
              <td>Product</td>
              <td>Currency</td>
              <td>Rate</td>
              <td>Forex Amount</td>
              <td>INR Amount</td>
              <td>Status</td>
              <td></td>
            </tr>

            { 
            
            data.map((item) => (
              <tr className="!text-xs !border-b border-t-0 border-x-0 py-5 !border-[#BDBDBD] !border-solid ">
                <td className="py-4">
                  <BlockTime date={item?.date} time={item?.time} />
                </td>
                <td>
                  <BuySell type={item?.bs} />
                </td>
                <td>{item?.product}</td>
                <td>{item?.currency}</td>
                <td>1 {item?.currency} = {item?.forex_rate}</td>
                <td>{item?.forex_amount}</td>
                <td>{item?.inr_amount}</td>
                <td>
                  <Status status={item?.status} />
                </td>
                <td>
                  <div className="text-secondary px-2 py-2 rounded-xl border-solid border">
                    Repeat Order
                  </div>
                </td>
              </tr>
            ))

            }

            
            {/* <tr className="!text-xs !border-b border-t-0 border-x-0 py-5 !border-[#BDBDBD] !border-solid ">
              <td className="py-4">
                <BlockTime />
              </td>
              <td>
                <BuySell type={"BUY"} />
              </td>
              <td>Currency Notes</td>
              <td>USD</td>
              <td>1 USD = ₹ 83.17</td>
              <td>1000000</td>
              <td>1000000</td>
              <td>
                <Status status={"PENDING"} />
              </td>
              <td>
                <div className="text-secondary px-2 py-2 rounded-xl border-solid border">
                  Repeat Order
                </div>
              </td>
            </tr>
            <tr className="!text-xs !border-b border-t-0 border-x-0 py-5 !border-[#BDBDBD] !border-solid ">
              <td className="py-4">
                <BlockTime />
              </td>
              <td>
                <BuySell type={"SELL"} />
              </td>
              <td>Currency Notes</td>
              <td>USD</td>
              <td>1 USD = ₹ 83.17</td>
              <td>1000000</td>
              <td>1000000</td>
              <td>
                <Status status={"COMPLETED"} />
              </td>
              <td>
                <div className="text-secondary px-2 py-2 rounded-xl border-solid border">
                  Repeat Order
                </div>
              </td>
            </tr>
            <tr className="!text-xs !border-b border-t-0 border-x-0 py-5 !border-[#BDBDBD] !border-solid ">
              <td className="py-4">
                <BlockTime />
              </td>
              <td>
                <BuySell type={"BUY"} />
              </td>
              <td>Currency Notes</td>
              <td>USD</td>
              <td>1 USD = ₹ 83.17</td>
              <td>1000000</td>
              <td>1000000</td>
              <td>
                <Status status={"PENDING"} />
              </td>
              <td>
                <div className="text-secondary px-2 py-2 rounded-xl border-solid border">
                  Repeat Order
                </div>
              </td>
            </tr>
            <tr className="!text-xs !border-b border-t-0 border-x-0 py-5 !border-[#BDBDBD] !border-solid ">
              <td className="py-4">
                <BlockTime />
              </td>
              <td>
                <BuySell type={"BUY"} />
              </td>
              <td>Currency Notes</td>
              <td>USD</td>
              <td>1 USD = ₹ 83.17</td>
              <td>1000000</td>
              <td>1000000</td>
              <td>
                <Status status={"PENDING"} />
              </td>
              <td>
                <div className="text-secondary px-2 py-2 rounded-xl border-solid border">
                  Repeat Order
                </div>
              </td>
            </tr>
            <tr className="!text-xs !border-b border-t-0 border-x-0 py-5 !border-[#BDBDBD] !border-solid ">
              <td className="py-4">
                <BlockTime />
              </td>
              <td>
                <BuySell type={"BUY"} />
              </td>
              <td>Currency Notes</td>
              <td>USD</td>
              <td>1 USD = ₹ 83.17</td>
              <td>1000000</td>
              <td>1000000</td>
              <td>
                <Status status={"PENDING"} />
              </td>
              <td>
                <div className="text-secondary px-2 py-2 rounded-xl border-solid border">
                  Repeat Order
                </div>
              </td>
            </tr> */}
          </table>
        </div>
      </section>
    </div>
  );
};

export default Frame11;

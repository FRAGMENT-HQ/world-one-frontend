import { useState, useEffect } from "react";
import { order } from "@/states/storage";
import FrameComponent2 from "./frame-component2";
import FrameComponent1 from "./frame-component1";
import FrameComponent from "./frame-component";
import LinkFunction from "./link-function";
import Counter from "./counter";
import "react-multi-carousel/lib/styles.css";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { getRateMutation } from "@/hooks/prod";
import CityModal from "./cityModal";
import CurrencyCard from "./currancyCard";
import { getRateCardMutation } from "@/hooks/prod";
import Select from "react-select";

const options = [
  {value:"Exchange Currency",label:"Exchange Currency"},
  {value:"Transfer Money Abroad",label:"Transfer Money Abroad"},
  {value:"Forex Card",label:"Forex Card"},
  {value:"Travel Insurance",label:"Travel Insurance"},
]

const dispMap = {
  "Exchange Currency":
    "Exchange major world currencies with competitive rates and exceptional service, ensuring seamless transactions for your convenience. Whether for travel or business, trust us for swift and reliable currency conversions.",
  "Transfer Money Abroad":
    "Sending money internationally is made easy with Worldone Forex's money transfer services. Whether you need to support family members overseas or conduct business transactions, our secure and efficient transfer options ensure that your funds reach their destination safely and on time.",
  "Forex Card":
    "Our pre-loaded travel currency cards offer convenience and security for your international travels. With Worldone Forex, you can easily reload your card with additional funds or unload remaining balances upon your return, ensuring financial flexibility and peace of mind while you're on the go.",
  "Travel Insurance":
    "Travel with confidence knowing that you're protected with Worldone Forex's travel insurance coverage. Our comprehensive travel insurance plans offer peace of mind by providing coverage for medical emergencies, trip cancellations, lost luggage, and more, ensuring a worry-free travel experience.",
};

const HomeExchangeCurrency = () => {
  const [selected, setSelected] = useState(true);

  const [intialCurrency, setIntialCurrency] = useState({
    label: "INR",
    value: "INR",
  });
  const [finalCurrency, setFinalCurrency] = useState({
    label: "USD",
    value: "USD",
  });
  const [amount, setAmount] = useState();
  const router = useRouter();
  const [Order, setOrder] = useAtom(order);
  const [rate, setRate] = useState(1);
  const [factor, setFactor] = useState(1.005);
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState("");
  const [rates, setRates] = useState([]);
  const [powerFactor, setPowerFactor] = useState(1);
  const [prod, setprod] = useState({
    label: "Exchange Currency",
    value: "Exchange Currency",
  
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { mutate: getRate } = getRateMutation(
    (res) => {
      setRate(1 / res.data.rate);
    },
    (err) => {
      console.log(err);
    }
  );
  useEffect(() => {
    setFactor(selected ? 1.005 : 0.995);
    setPowerFactor(selected ? 1 : -1);
  }, [selected]);

  useEffect(() => {
    setSelected(true);
  }, [prod]);

  useEffect(() => {
    getRate(finalCurrency.value);
  }, [finalCurrency]);

  const { mutate: getRateCard } = getRateCardMutation(
    (res) => {
      setRates(res.data);
    },
    (err) => {
      console.log(err);
    }
  );
  useEffect(() => {
    getRate(finalCurrency.value);
    getRateCard();
  }, []);

  const handleOrder = () => {
    setOrder({
      intialCurrency: selected ? intialCurrency : finalCurrency,
      finalCurrency: selected ? finalCurrency : intialCurrency,
      amount: (amount * (rate * factor) ** powerFactor).toFixed(2),
      forexAmount: selected
        ? amount
        : (amount * (rate * factor) ** powerFactor).toFixed(2),
      inrAmount: selected
        ? (amount * (rate * factor) ** powerFactor).toFixed(2)
        : amount,
      rate: (rate * factor).toFixed(2),
      city: city,
      product: prod.value,
      bs: selected ? "Buy" : "Sell",
    });
    router.push("/summary/");
  };
  return (
    <div className=" bg-background w-full overflow-hidden flex flex-col items-start justify-start">
      <CityModal
        onClick={handleOrder}
        open={open}
        handleClose={handleClose}
        city={city}
        onCitySelect={setCity}
      />
      <section className="self-stretch  bg-black flex flex-col items-start justify-start pt-4 px-0 pb-0 box-border relative gap-[82px] max-w-full text-left text-xl text-white font-body-small mq825:gap-[20px_82px] mq825:pt-5 mq825:box-border mq1275:gap-[41px_82px] mq1275:pt-[31px] mq1275:box-border">
        <img
          className="w-full h-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full object-cover"
          alt=""
          src="/bg-grad.png"
        />
        <img className="w-full absolute !m-[0] z-[1]" alt="" />
        <div className="self-stretch flex flex-row items-start justify-center py-0 pr-[22px] pl-5 box-border max-w-full">
          <div className=" flex flex-col items-end justify-start gap-[50px] max-w-full mq825:gap-[49px_98px] mq450:gap-[24px_98px]">
            <div className="invisible sm:visible w-[90%] mr-[5%] h-[4vw] min-h-[55px] mt-5  rounded-3xl bg-darkslateblue-200 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] flex flex-row items-center justify-between py-[26px] px-16 box-border top-[0] z-[99] sticky gap-[20px] max-w-full mq1275:pl-8 mq1275:pr-8 mq1275:box-border">
              <img
                className="h-[25.5px] w-[99px] relative"
                loading="lazy"
                alt=""
                src="/w-o-f.svg"
              />
              <div className="w-[75%] flex flex-row items-center justify-center text-[15px] font-semibold mq825:hidden">
                <div className="flex gap-[15%] ">
                  <div className=" flex flex-row items-center justify-center py-1 ">
                    <div className="relative leading-[32px] inline-block ">
                      About
                    </div>
                  </div>
                  <div className="  shrink-0 flex flex-row items-center justify-center py-1  box-border">
                    <div className="relative leading-[32px]">Services</div>
                  </div>
                  <div className=" flex flex-row items-center justify-center py-1 ">
                    <div className="relative leading-[32px] inline-block ">
                      Support
                    </div>
                  </div>
                  <div className="  shrink-0 flex flex-row items-center justify-center py-1  box-border">
                    <div className="relative leading-[32px]">Blogs</div>
                  </div>
                </div>
              </div>
              <div className="flex h-16 gap-[5%] flex-row-reverse" >
                <div className=" h-10 mt-3 rounded-2xl bg-darkslateblue-400 overflow-hidden flex flex-row items-center justify-start py-2 pr-[18px] pl-4 box-border gap-[12px]">
                  <img
                    className="h-6 w-6 relative overflow-hidden shrink-0"
                    alt=""
                    src="/ulocationpinalt.svg"
                  />
                  <div className="relative text-base  inline-block ">
                    Location
                  </div>
                </div>
                <button className="cursor-pointer [border:none] py-1 px-[29px] bg-[transparent] overflow-hidden flex flex-row items-center justify-center">
                  <div className="relative text-base leading-[32px] font-body-small text-primary text-left inline-block min-w-[52px]">
                    Login
                  </div>
                </button>
              </div>
            </div>
            <div className="self-stretch  w-full flex flex-row items-start justify-between laptop:gap-[3%] gap-[5%] max-w-full text-[64px] text-text5 mq825:gap-[173px_43px] mq450:gap-[173px_22px] mq1275:gap-[173px_86px] mq1575:flex-wrap">
              <form className="m-0 w-[48%] tablet:min-w-[600px] laptop:min-w-[640px] flex-1 ml-[3%] rounded-13xl bg-darkslateblue-200 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] overflow-hidden flex flex-col items-center justify-start pt-8 px-2 sm:px-8 pb-12 box-border gap-[56px]  max-w-full z-[2] mq825:pt-[21px] mq825:pb-[31px] mq825:box-border ">
                <div className="text-[25%] h-0 sm:h-auto invisible sm:visible  px-[10px] w-full rounded-3xl bg-darkslateblue-100 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] overflow-x-auto flex flex-row items-center justify-evenly py-6 px-8 gap-[1px]">
                  <div
                    onClick={() => {
                      setprod({label:"Exchange Currency",value:"Exchange Currency"});
                    }}
                    className="cursor-pointer [border:none] py-4 px-2 bg-[transparent]  shadow-[0px_8px_16px_rgba(39,_53,_126,_0.1)] box-border shrink-0 flex flex-col items-center justify-center border-b-[4px] border-solid border-primary hover:bg-chocolate-200"
                  >
                    <div
                      className={`relative text-medium  font-body-small ${prod.value == "Exchange Currency" ? "" : "font-medium   "} text-white text-center`}
                    >
                      Exchange Currency
                    </div>
                    {prod.value== "Exchange Currency" && (
                      <div className="w-full h-1 rounded-xl mt-2 -mb-2 bg-[#FF9135]"></div>
                    )}
                  </div>
                  <div
                    onClick={() => {
                      setprod({label:"Transfer Money Abroad",value:"Transfer Money Abroad"});
                    }}
                    className="cursor-pointer [border:none] py-4 px-2 bg-[transparent]  shadow-[0px_8px_16px_rgba(39,_53,_126,_0.1)] box-border shrink-0 flex flex-col items-center justify-center border-b-[4px] border-solid border-primary hover:bg-chocolate-200"
                  >
                    <div
                      className={`relative text-medium  font-body-small ${prod.value== "Transfer Money Abroad" ? "" : "font-medium   "} text-white text-center`}
                    >
                      Transfer Money Abroad
                    </div>
                    {prod.value== "Transfer Money Abroad" && (
                      <div className="w-full h-1 rounded-xl mt-2 -mb-2 bg-[#FF9135]"></div>
                    )}
                  </div>
                  <div
                    onClick={() => {
                      setprod({label:"Forex Card",value:"Forex Card"});
                    }}
                    className="cursor-pointer [border:none] py-4 px-2 bg-[transparent]  shadow-[0px_8px_16px_rgba(39,_53,_126,_0.1)] box-border shrink-0 flex flex-col items-center justify-center border-b-[4px] border-solid border-primary hover:bg-chocolate-200"
                  >
                    <div
                      className={`relative text-medium font-body-small ${prod.value== "Forex Card" ? "" : "font-medium   "} text-white text-center`}
                    >
                      Forex Card
                    </div>
                    {prod.value== "Forex Card" && (
                      <div className="w-full h-1 rounded-xl mt-2 -mb-2 bg-[#FF9135]"></div>
                    )}
                  </div>
                  <div
                    onClick={() => {
                      setprod({label:"Travel Insurance",value:"Travel Insurance"});
                    }}
                    className="cursor-pointer [border:none] py-4 px-2 bg-[transparent]  shadow-[0px_8px_16px_rgba(39,_53,_126,_0.1)] box-border shrink-0 flex flex-col items-center justify-center border-b-[4px] border-solid border-primary hover:bg-chocolate-200"
                  >
                    <div
                      className={`relative text-medium  font-body-small ${prod.value== "Travel Insurance" ? "" : "font-medium   "} text-white text-center`}
                    >
                      Travel Insurance
                    </div>
                    {prod.value== "Travel Insurance" && (
                      <div className="w-full h-1 rounded-xl mt-2 -mb-2 bg-[#FF9135]"></div>
                    )}
                  </div>
                </div>
                <div className="self-stretch flex -mt-8 flex-col items-center justify-center gap-[32px] max-w-full mq450:gap-[16px_32px]">
                  {prod.value== "Exchange Currency" && (
                    <div className="self-stretch rounded-2xl bg-gray-100 shadow-[-2px_2px_8px_rgba(14,_21,_56,_0.2)_inset,_-4px_4px_16px_rgba(15,_20,_45,_0.15)_inset] flex flex-row items-start justify-start max-w-full [row-gap:20px] mq825:flex-wrap">
                      <div
                        onClick={() => {
                          setSelected(true);
                        }}
                        className={` w-[50%] cursor-pointer [border:none] py-3 px-5 ${selected ? "bg-primary" : ""} rounded-2xl overflow-hidden flex flex-row items-center justify-center box-border whitespace-nowrap max-w-full hover:font-semibold`}
                      >
                        <div
                          className={`relative text-xl ${selected ? "font-semibold" : "font-medium"} hover:font-semibold font-lato text-white text-left inline-block min-w-[123px] `}
                        >
                          Buy Currency
                        </div>
                      </div>
                      <div className="  w-[50%] flex-1 overflow-hidden flex flex-row items-center justify-center box-border ">
                        <div
                          onClick={() => {
                            setSelected(false);
                          }}
                          className={` cursor-pointer [border:none] py-3 px-2 sm:px-5 ${!selected ? "bg-primary" : ""} flex-1 rounded-2xl overflow-hidden flex flex-row items-center justify-center box-border  whitespace-nowrap max-w-full hover:font-semibold`}
                        >
                          <div
                            className={`relative text-xl ${!selected ? "font-semibold" : "font-medium"} hover:font-semibold font-lato text-white text-left inline-block min-w-[123px]`}
                          >
                            Sell Currency
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex-1 w-[100%] flex flex-col items-start justify-start gap-[16px] min-w-[240px] max-w-full text-left text-xl text-text5 font-body-small">
 
      <Select
        defaultValue={prod}
        value={prod}
        isSearchable={true}
        onChange={setprod}
        options={options}
        classNames={{
          container: () => "w-full  text-white !rounded-xl !border-none  rounded-lg bg-gray-100 py-2 ",
          control: () => "self-stretch !bg-transparent !border-none ",
          menuList: () => "!bg-midnightblue",
          option: () => "text-white",
          input: () => "text-white",
          singleValue: () => "!text-white",
        }}
      />
    </div>
                  <div className="self-stretch flex flex-col items-start justify-between gap-[24px] max-w-full">
                    <div className="self-stretch flex flex-row items-start justify-between gap-[4%] max-w-full mq825:flex-wrap">
                      <FrameComponent2
                        selectedOption={intialCurrency}
                        setSelectedOption={setIntialCurrency}
                        currencyYouHave={
                          selected ? "Currency you Have" : "Currency you Want"
                        }
                      />
                      <FrameComponent2
                        fixed={true}
                        selectedOption={finalCurrency}
                        setSelectedOption={setFinalCurrency}
                        currencyYouHave={
                          selected ? "Currency you Want" : "Currency you Have"
                        }
                      />
                    </div>

                    <div className="self-stretch flex flex-col  xs:flex-row flex-wrap items-start justify-start gap-[24px] max-w-full flex-wrap">
                      <div className="flex-1 min-w-0 xs:min-w-[300px] rounded-lg bg-gray-100 overflow-hidden flex flex-row items-center justify-between py-3 px-2 sm:px-6 box-border [row-gap:20px] max-w-full gap-[0px] mq825:flex-wrap">
                        <input
                          className="text-white w-[80%] max-w-[419px]  [border:none] [outline:none] bg-[transparent] h-8 flex flex-row items-center justify-start font-body-small font-medium text-xl text-text5 "
                          placeholder="Forex Amount"
                          type="text"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                        <img
                          className="h-8 w-8 relative overflow-hidden shrink-0 min-h-[32px]"
                          alt=""
                          src="/uinfocircle.svg"
                        />
                      </div>
                      <div className="w-[239px] rounded-2xl bg-informative box-border overflow-hidden shrink-0 flex flex-row items-center justify-center py-4 px-[26px] whitespace-nowrap border-[2px] border-solid border-secondary">
                        <div className="flex-1 relative text-5xl leading-[32px] font-body-small text-white text-left">
                          1 {finalCurrency?.value} ={" "}
                          {(rate * factor).toFixed(2)} {intialCurrency?.value}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch -mt-8 flex flex-row items-end justify-between gap-[56px] max-w-full mq825:flex-wrap mq450:gap-[56px_28px]">
                  <div className="flex flex-col items-start justify-center gap-[8px]">
                    <div className="w-[181px] relative text-7xl leading-[32px] font-body-small text-accent text-left inline-block mq825:text-7xl mq825:leading-[26px] mq450:text-lgi mq450:leading-[19px]">
                      {selected ? intialCurrency?.value : finalCurrency?.value}{" "}
                      Amount
                    </div>
                    <h1 className="m-0 relative text-29xl leading-[56px] font-normal font-body-small text-white text-left mq825:text-19xl mq825:leading-[45px] mq450:text-10xl mq450:leading-[34px]">
                      {`${(amount * (rate * factor) ** powerFactor).toFixed(2)}`}
                    </h1>
                  </div>
                  <div
                    onClick={() => {
                      handleOpen();
                    }}
                    className="cursor-pointer w-[40%] flex-1 [border:none] py-5 bg-white  rounded-3xl shadow-[0px_8px_24px_rgba(57,_26,_0,_0.15)] overflow-hidden flex flex-row items-center justify-center box-border gap-[16px] min-w-[163px] whitespace-nowrap max-w-full hover:bg-gainsboro-100"
                  >
                    <img
                      className="h-8 w-8 relative overflow-hidden shrink-0 min-h-[32px]"
                      alt=""
                      src="/ushoppingcart.svg"
                    />
                    <div className="relative text-5xl  leading-[32px] font-medium font-body-small text-text1 text-left">
                      Add To Cart
                    </div>
                  </div>
                </div>
              </form>
              <div className="w-[38%] desktop:w-[35%] flex flex-col items-start justify-start pt-[84px] px-10 pb-0 box-border  max-w-full mq825:min-w-full mq450:pt-[55px] mq450:box-border mq1575:flex-1">
                <div className="self-stretch flex flex-col items-start justify-start gap-[64px] z-[2] mq825:gap-[32px_64px] mq450:gap-[16px_64px]">
                  <h1 className="m-0 self-stretch relative text-[3.2rem] font-semibold font-inherit mq825:text-[51px] mq825:leading-[58px] mq450:text-19xl mq450:leading-[43px]">
                    {prod?.value}
                  </h1>
                  <div className="self-stretch relative text-[1.25rem] leading-[30px] font-medium text-white mq450:text-lgi mq450:leading-[29px]">
                    {dispMap[prod?.value]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch bg-darkslateblue-300 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] overflow-hidden flex flex-col items-center justify-start py-12 px-8 box-border relative gap-[56px] max-w-full z-[2] mq825:gap-[28px_56px] mq450:pt-[31px] mq450:pb-[31px] mq450:box-border">
          <div className=" flex w-full gap-5">
            {rates.slice(4).map((rate, index) => (
              <CurrencyCard key={index} rate={rate} />
            ))}
          </div>
          <button
            onClick={() => {
              router.push("/rates");
            }}
            className="cursor-pointer [border:none] py-4 px-[38.5px] bg-background h-16 rounded-2xl shadow-[0px_8px_24px_rgba(57,_26,_0,_0.15)] overflow-hidden shrink-0 flex flex-row items-center justify-center box-border gap-[14px] whitespace-nowrap hover:bg-gainsboro-200"
          >
            <img
              className="h-8 w-8 relative overflow-hidden shrink-0 min-h-[32px]"
              alt=""
              src="/gglist.svg"
            />
            <div className="relative text-base leading-[32px] font-semibold font-lato text-secondary text-left">
              See Full Rate Card
            </div>
          </button>
        </div>
      </section>
      <section className="self-stretch bg-background overflow-hidden flex flex-col items-start justify-center py-40 px-[120px] box-border max-w-full text-left text-29xl text-text1 font-body-small mq825:py-[104px] mq825:px-[30px] mq825:box-border mq450:pt-[68px] mq450:pb-[68px] mq450:box-border mq1275:pl-[60px] mq1275:pr-[60px] mq1275:box-border">
        <div className="self-stretch flex flex-row items-center justify-start gap-[5%] max-w-full mq825:gap-[111px_55px] mq450:gap-[111px_28px] mq1575:flex-wrap">
          <div className=" flex flex-col items-start justify-start  w-[50%] mq825:min-w-full ">
            <div className=" box-border flex flex-row items-center justify-center py-0 px-[21px] border-l-[5px] border-0 border-solid border-secondary">
              <h1 className="m-0  relative text-29xl  font-bold  inline-block mq825:text-19xl mq825:leading-[45px] mq450:text-10xl mq450:leading-[34px]">
                About Us
              </h1>
            </div>
            <div className="self-stretch font-semibold mt-8 relative text-lg tablet:text-[1.2vw] font-medium text-text2 inline-block mq450:text-lgi mq450:leading-[29px]">
              <p className="m-0">
              World One Forex was incorporated in 2013 and was granted AD CAT II license as well as Import of Foreign Currencies Licence in FY 2019-20.

              </p>
        
              <br />
              <p className="m-0 whitespace-pre-wrap">{`We have offices in 12 cities (Delhi NCR, Mumbai, Kolkata, Bangalore, Chennai, Kochi, Ludhiana, Chandigarh) and an employee base of 85 professionals.  In addition to the regular forex services where we serve about 25,000 retail and 4,000 corporate clients, WorldOne has been regularly supporting international students with their fee remittances. We have worked with about 18,000 students till date and have closed remittances close to USD 40 million. We make a significant effort in ensuring a professional and efficient service to your clients that has led to >90% customer retention rate.`}</p>
            </div>
          </div>
          <img
            className=" w-[45%] h-full relative rounded-3xl object-cover max-w-full mq1575:flex-1"
            loading="lazy"
            alt=""
            src="/unsplash8nppe0ylmn8@2x.png"
          />
        </div>
        <Counter />
      </section>
      {/* <section className="w-full bg-background overflow-hidden flex flex-wrap flex-col sm:flex-row items-evenely sm:items-start gap-8  mb-5 box-border max-w-full text-left text-29xl text-text1 font-body-small ">
        <div className="sm:w-[60%] w-full px-[5%] h-36 bg-red-400 flex flex-col items-center justify-start ">
          <div className="w-full h-full flex flex-col gap-[3vw] sm:gap-[2vw] bg-blue-400  ">
            <div className=" text-[2rem] sm:text-[2.8vw] font-bold">
              Welcome to World One Forex
            </div>
            <div className="text-[1.5rem] sm:text-[2vw] font-semibolt">
              Where your foreign exchange needs are met with expertise and care.
            </div>
            <div className="text-[2.6vw] sm:text-[1.4vw] font-[480]">
              Established in 2013, World One Forex has become a leading name in
              reliable and efficient foreign exchange services. We are a
              licensed operator, holding both the AD CAT II and Import of
              Foreign Currencies Licence, ensuring you safe and secure
              transactions.
            </div>
          </div>
          <div className="w-full bg-blue-100 h-12 mb-12 "> </div>
          
        </div>
        <div className="sm:w-[36%] w-full h-36 bg-green-400 flex flex-col items-center justify-start gap-[5%]">
          <img className="w-full" src="/unsplash8nppe0ylmn8@2x.png" />
        </div>
      </section> */}
      <section className="self-stretch bg-secondary overflow-hidden flex flex-row items-start justify-center py-[120px] px-5 box-border relative gap-[8px] max-w-full text-left text-29xl text-text5 font-body-small mq825:pt-[51px] mq825:pb-[51px] mq825:box-border mq1275:pt-[78px] mq1275:pb-[78px] mq1275:box-border">
        <img
          className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full object-cover"
          alt=""
          src="/conditional-branch@2x.png"
        />
        <div className="w-full px-[5%] flex flex-row items-start justify-start max-w-full z-[1] mq825:gap-[120px_60px] mq450:gap-[120px_30px]">
          <div className="flex-1  flex flex-col items-start justify-start gap-[56px] max-w-full mq825:gap-[28px_56px]">
            <div className="w-full  box-border flex flex-row items-start justify-start py-0 px-[21px] max-w-full text-white border-0 border-l-[5px] border-solid border-accent">
              <h1 className="m-0 flex-1 relative text-inherit leading-[56px] font-normal font-inherit inline-block max-w-full mq825:text-19xl mq825:leading-[45px] mq450:text-10xl mq450:leading-[34px]">
                Products Offered
              </h1>
            </div>
            <div className="self-stretch relative text-5xl leading-[36px] font-medium mq450:text-lgi mq450:leading-[29px]">{`World One Forex was incorporated in 2013 and was granted AD CAT II license as well as Import of Foreign Currencies Licence in FY 2019-20.
We have offices in 12 cities (Delhi NCR, Mumbai, Kolkata, Bangalore, Chennai, Kochi, Ludhiana, Chandigarh) and an employee base of 85 professionals. `}</div>
            <div className=" w-full min-h-[616px] flex flex-row  flex-wrap items-center justify-evenly relative gap-[1%_1%] max-w-full text-13xl font-lato">
              <FrameComponent
                currency="/currency.svg"
                exchangeCurrency="Exchange Currency"
              />
              <FrameComponent
                currency="/send-money.svg"
                exchangeCurrency="Transfer Money Abroad"
              />
              <FrameComponent
                currency="/mdilightcreditcard.svg"
                exchangeCurrency="Transfer Money Abroad"
              />
              <FrameComponent
                currency="/phairplanetakeofflight.svg"
                exchangeCurrency="Transfer Money Abroad"
              />
            </div>
          </div>
        </div>
      </section>
      {/* <section className="self-stretch bg-background overflow-hidden flex flex-col items-start justify-start p-[120px] box-border gap-[56px] max-w-full text-left text-29xl text-text1 font-body-small mq825:gap-[28px_56px] mq825:py-[51px] mq825:px-[30px] mq825:box-border mq1275:py-[78px] mq1275:px-[60px] mq1275:box-border">
        <div className="box-border flex flex-row items-start justify-start py-0 px-[21px] max-w-full border-l-[5px] border-0 border-solid border-secondary">
          <h1 className="m-0 flex-1 relative text-inherit leading-[56px] font-normal font-inherit mq825:text-19xl mq825:leading-[45px] mq450:text-10xl mq450:leading-[34px]">
            How It Works
          </h1>
        </div>
        <div className="self-stretch flex flex-row flex-wrap items-start justify-between max-w-full text-center text-13xl">
          <div className="w-[43vw] flex flex-col items-start justify-start gap-[3%] max-w-full ">
            <div className="w-[96%] rounded-13xl mb-4 bg-white shadow-[-2px_-4px_16px_rgba(93,_101,_143,_0.15)_inset] overflow-hidden flex flex-row items-start justify-start p-8 box-border relative gap-[32px] max-w-full ">
              <div className="!m-[0] right-[-99.5px]  rounded-[50%] [filter:blur(200px)] opacity-[0.5]" />
              <div className=" flex flex-col items-start justify-start pt-1.5 px-0 pb-0 box-border">
                <div className="self-stretch align-middle relative">
                 
                  <div className="flex items-center justify-center font-semibold inline-block w-12 h-12 text-center align-middle align-center z-[1] rounded-full border-[2px] border-solid border-text1  mq450:text-lgi ">
                    <div>01</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-start gap-[16px]  max-w-full z-[1] text-left mq825:min-w-full">
              <div className=" relative font-semibold inline-block text-[2.2vw] desktop:text-5xl">
                  Select your currency
                </div>
                <div className="self-stretch relative text-[1.8vw] desktop:text-5xl  font-medium text-text2 mq450:text-lgi ">
                  Lorem ipsum dolor sit amet consectetur.
                </div>
              </div>
            </div>
            <div className="w-[98%] rounded-13xl mb-4 bg-white shadow-[-2px_-4px_16px_rgba(93,_101,_143,_0.15)_inset] overflow-hidden flex flex-row items-start justify-start p-8 box-border relative gap-[32px] max-w-full mq825:flex-wrap mq450:gap-[32px_16px]">
              <div className="!m-[0] right-[-99.5px]  rounded-[50%] [filter:blur(200px)] opacity-[0.5]" />
              <div className=" flex flex-col items-start justify-start pt-1.5 px-0 pb-0 box-border">
                <div className="self-stretch align-middle relative">
                 
                  <div className="flex items-center justify-center font-semibold inline-block w-12 h-12 text-center align-middle align-center z-[1] rounded-full border-[2px] border-solid border-text1  mq450:text-lgi ">
                    <div>02</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-start gap-[16px]  max-w-full z-[1] text-left mq825:min-w-full">
              <div className=" relative font-semibold inline-block text-[2.2vw] desktop:text-5xl">
                  Select your currency
                </div>
                <div className="self-stretch relative text-[1.8vw] desktop:text-5xl  font-medium text-text2 mq450:text-lgi ">
                  Lorem ipsum dolor sit amet consectetur.
                </div>
              </div>
            </div>
            <div className="w-[98%] rounded-13xl mb-4 bg-white shadow-[-2px_-4px_16px_rgba(93,_101,_143,_0.15)_inset] overflow-hidden flex flex-row items-start justify-start p-8 box-border relative gap-[32px] max-w-full mq825:flex-wrap mq450:gap-[32px_16px]">
              <div className="!m-[0] right-[-99.5px]  rounded-[50%] [filter:blur(200px)] opacity-[0.5]" />
              <div className=" flex flex-col items-start justify-start pt-1.5 px-0 pb-0 box-border">
                <div className="self-stretch align-middle relative">
                 
                  <div className="flex items-center justify-center font-semibold inline-block w-12 h-12 text-center align-middle align-center z-[1] rounded-full border-[2px] border-solid border-text1  mq450:text-lgi ">
                    <div>03</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-start gap-[16px]  max-w-full z-[1] text-left mq825:min-w-full">
              <div className=" relative font-semibold inline-block text-[2.2vw] desktop:text-5xl">
                  Select your currency
                </div>
                <div className="self-stretch relative text-[1.8vw] desktop:text-5xl  font-medium text-text2 mq450:text-lgi ">
                  Lorem ipsum dolor sit amet consectetur.
                </div>
              </div>
            </div>
            <div className="w-[98%] rounded-13xl mb-4 bg-white shadow-[-2px_-4px_16px_rgba(93,_101,_143,_0.15)_inset] overflow-hidden flex flex-row items-start justify-start p-8 box-border relative gap-[32px] max-w-full mq825:flex-wrap mq450:gap-[32px_16px]">
              <div className="!m-[0] right-[-99.5px]  rounded-[50%] [filter:blur(200px)] opacity-[0.5]" />
              <div className=" flex flex-col items-start justify-start pt-1.5 px-0 pb-0 box-border">
                <div className="self-stretch align-middle relative">
                 
                  <div className="flex items-center justify-center font-semibold inline-block w-12 h-12 text-center align-middle align-center z-[1] rounded-full border-[2px] border-solid border-text1  mq450:text-lgi ">
                    <div>04</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-start gap-[16px]  max-w-full z-[1] text-left mq825:min-w-full">
                <div className=" relative font-semibold inline-block text-[2.2vw] desktop:text-5xl">
                  Select your currency
                </div>
                <div className="self-stretch relative text-[1.8vw] desktop:text-5xl  font-medium text-text2 mq450:text-lgi ">
                  Lorem ipsum dolor sit amet consectetur.
                </div>
              </div>
            </div>
            
            
          </div>
          <div className="h-[100%] flex-1 bg-red-400 relative rounded-13xl shrink-0 flex items-center justify-center">
            <img
              className="h-[40vw] w-full min-w-[300px]  overflow-hidden  max-w-full object-contain absolute left-[0px] top-[12px] [transform:scale(1.151)] "
              loading="lazy"
              alt=""
              src="/macbookpro16@2x.png"
            />
          </div>
        </div>
      </section> */}
      <section className="self-stretch flex flex-row items-start justify-start max-w-full text-left text-29xl text-text1 font-body-small">
        <div className="flex-1 bg-background overflow-hidden flex flex-col items-start justify-center py-40 px-[120px] box-border max-w-full mq825:pl-[30px] mq825:pr-[30px] mq825:box-border mq450:pt-[68px] mq450:pb-[68px] mq450:box-border mq1275:py-[104px] mq1275:px-[60px] mq1275:box-border">
          <div className="self-stretch flex flex-col items-start justify-start gap-[111px] max-w-full mq825:gap-[55px_111px] mq450:gap-[28px_111px]">
            <div className="self-stretch flex flex-col items-start justify-start gap-[56px] max-w-full mq825:gap-[28px_56px]">
              <div className="w-[724px] box-border flex flex-row items-center justify-center py-0 px-[21px] max-w-full border-l-[5px] border-0 border-solid border-secondary">
                <div className="flex-1 relative leading-[56px] inline-block max-w-full mq825:text-19xl mq825:leading-[45px] mq450:text-10xl mq450:leading-[34px]">
                  Why Choose Worldone Forex?
                </div>
              </div>
              <div className="self-stretch relative text-5xl leading-[36px] font-medium text-text2 mq450:text-lgi mq450:leading-[29px]">
                Embark on a journey of seamless currency exchange with Worldone
                Forex. Here's why our users love us:
              </div>
            </div>
            <div className=" overflow-x-hidden flex flex-row flex-wrap items-center justify-evenly gap-[2vw] w-full ">
              <LinkFunction
                reliability="Reliability"
                trustOurExperienceAndSecu="Trust our experience and secure transactions."
                imgSrc="/relablity.svg"
              />
              <LinkFunction
                reliability="Competitive Rates"
                trustOurExperienceAndSecu="Maximize currency value with our rates.
"               imgSrc="/crates.svg"
              />
              <LinkFunction
                reliability="Convenience"
                trustOurExperienceAndSecu="Experience hassle-free currency exchange online."
                imgSrc="/Convenience.svg"
              />
              <LinkFunction
                reliability="Security"
                trustOurExperienceAndSecu="Rest assured with our stringent measures."
                imgSrc={"/security.svg"}
              />
            </div>
          </div>
        </div>
      </section>
      {/* <section className="self-stretch [background:radial-gradient(50%_50%_at_50%_50%,_#1e2962,_#4058d1)] overflow-hidden flex flex-col items-center justify-start pt-[114.5px] px-5 pb-[122.5px] box-border relative gap-[64px] max-w-full text-left text-29xl text-white font-body-small mq825:gap-[32px_64px] mq825:pt-[74px] mq825:pb-20 mq825:box-border mq450:gap-[16px_64px]">
        <img
          className="w-full h-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full object-contain"
          alt=""
          src="/7-1@2x.png"
        />
        <div className="w-[1685px] flex flex-row items-start justify-center max-w-full">
          <div className="w-[323px] flex flex-row items-start justify-start py-0 px-6 box-border max-w-full z-[1]">
            <h1 className="m-0 flex-1 relative text-inherit leading-[56px] font-normal font-inherit mq825:text-19xl mq825:leading-[45px] mq450:text-10xl mq450:leading-[34px]">
              Testimonials
            </h1>
          </div>
        </div>
        <div className="w-[1685px] overflow-x-auto flex flex-row items-start justify-start relative gap-[72px] max-w-full z-[1] text-5xl text-text5 mq825:gap-[72px_36px] mq450:gap-[72px_18px]">
          <Component />
          <Component propMarginLeft="unset" />
          <div className="w-[1109px] rounded-13xl bg-darkslateblue-600 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] overflow-hidden shrink-0 flex flex-row items-start justify-start py-0 pr-8 pl-0 box-border gap-[48px] [debug_commit:f6aba90]">
            <img
              className="h-96 w-72 relative object-cover"
              alt=""
              src="/rectangle-515-2@2x.png"
            />
            <div className="flex-1 flex flex-col items-start justify-start pt-16 px-0 pb-0 box-border max-w-full">
              <div className="self-stretch flex flex-col items-start justify-center gap-[32px] max-w-full">
                <div className="self-stretch relative leading-[36px] font-medium shrink-0 mq450:text-lgi mq450:leading-[29px]">
                  Lorem ipsum dolor sit amet consectetur. Gravida tellus neque
                  enim dictum commodo. Facilisis odio pulvinar risus id nunc
                  consectetur. Nisi et facilisi condimentum id imperdiet ac duis
                  rutrum faucibus.
                </div>
                <img
                  className="w-[387px] h-1 relative max-w-full"
                  alt=""
                  src="/vector-9-2.svg"
                />
                <div className="self-stretch flex flex-col items-start justify-center gap-[8px] shrink-0 text-13xl text-white">
                  <div className="self-stretch relative leading-[40px] mq825:text-7xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
                    Kathryn Murphy
                  </div>
                  <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 pr-[453px] pl-0 gap-[16px] text-5xl text-text5">
                    <div className="flex-1 relative leading-[36px] font-medium inline-block min-w-[103px] mq450:text-lgi mq450:leading-[29px]">
                      IT Professional
                    </div>
                    <img
                      className="h-9 w-0.5 relative min-h-[36px]"
                      alt=""
                      src="/vector-10-2.svg"
                    />
                    <div className="relative leading-[36px] font-medium inline-block min-w-[95px] mq450:text-lgi mq450:leading-[29px]">
                      Age - 28
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Component propMarginLeft="unset" />
          <Component propMarginLeft="unset" />
          <img
            className="h-16 w-16 absolute !m-[0] top-[calc(50%_-_32px)] left-[76px] overflow-hidden shrink-0 object-contain z-[1]"
            alt=""
            src="/uanglerightb-2.svg"
          />
          <img
            className="h-16 w-16 absolute !m-[0] top-[calc(50%_-_32px)] right-[76px] overflow-hidden shrink-0 object-contain z-[1]"
            loading="lazy"
            alt=""
            src="/uangleleftb.svg"
          />
        </div>
      </section> */}
      {/* <section className="self-stretch overflow-hidden flex flex-row items-start justify-center py-[120px] px-5 box-border min-h-[828px] max-w-full text-left text-29xl text-text1 font-body-small mq825:pt-[78px] mq825:pb-[78px] mq825:box-border mq450:pt-[51px] mq450:pb-[51px] mq450:box-border">
        <div className=" flex flex-col items-start justify-start gap-[56px] max-w-full mq825:gap-[28px_56px]">
          <div className=" box-border border-0 flex flex-row items-start justify-start py-0 px-[21px] max-w-full border-l-[5px] border-solid border-secondary">
            <h1 className="m-0 flex-1 relative text-inherit leading-[56px] font-normal font-inherit inline-block max-w-full mq825:text-19xl mq825:leading-[45px] mq450:text-10xl mq450:leading-[34px]">
              Frequently Asked Questions
            </h1>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-[39.5px] max-w-full text-13xl text-text3 mq825:gap-[20px_39.5px]">
            <div className="self-stretch h-12 overflow-hidden shrink-0 flex flex-row items-start justify-start gap-[24px] max-w-full">
              <div className="w-10 relative leading-[40px] inline-block shrink-0 mq825:text-7xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
                01
              </div>
              <div className="flex-1 flex flex-col items-start justify-start gap-[16px] max-w-[calc(100%_-_136px)] shrink-0 text-text1">
                <div className="self-stretch relative leading-[40px] mq825:text-7xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">{`Lorem ipsum dolor sit amet consectetur. Quisque nec mattis congue cursus velit habitasse `}</div>
                <div className="self-stretch h-9 relative text-5xl leading-[36px] font-medium text-text2 inline-block mq450:text-lgi mq450:leading-[29px]">
                  Lorem ipsum dolor sit amet consectetur. Quisque nec mattis
                  congue cursus velit habitasse semper morbi.
                </div>
              </div>
              <img
                className="h-12 w-12 relative overflow-hidden shrink-0 object-cover"
                alt=""
                src="/eiarrowright-4@2x.png"
              />
            </div>
            <div className="self-stretch h-px flex flex-row items-start justify-start py-0 px-16 box-border max-w-full mq1275:pl-8 mq1275:pr-8 mq1275:box-border">
              <img
                className="h-px flex-1 relative max-w-full overflow-hidden"
                alt=""
                src="/vector-11.svg"
              />
            </div>
            <div className="self-stretch h-12 overflow-hidden shrink-0 flex flex-row items-start justify-start gap-[24px] max-w-full">
              <div className="w-10 relative leading-[40px] inline-block shrink-0 mq825:text-7xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
                01
              </div>
              <div className="flex-1 flex flex-col items-start justify-start gap-[16px] max-w-[calc(100%_-_136px)] shrink-0 text-text1">
                <div className="self-stretch relative leading-[40px] mq825:text-7xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">{`Lorem ipsum dolor sit amet consectetur. Quisque nec mattis congue cursus velit habitasse `}</div>
                <div className="self-stretch h-9 relative text-5xl leading-[36px] font-medium text-text2 inline-block mq450:text-lgi mq450:leading-[29px]">
                  Lorem ipsum dolor sit amet consectetur. Quisque nec mattis
                  congue cursus velit habitasse semper morbi.
                </div>
              </div>
              <img
                className="h-12 w-12 relative overflow-hidden shrink-0 object-cover"
                alt=""
                src="/eiarrowright-4@2x.png"
              />
            </div>
            <div className="self-stretch h-px flex flex-row items-start justify-start py-0 px-16 box-border max-w-full mq1275:pl-8 mq1275:pr-8 mq1275:box-border">
              <img
                className="h-px flex-1 relative max-w-full overflow-hidden"
                alt=""
                src="/vector-11.svg"
              />
            </div>
            <div className="self-stretch h-12 overflow-hidden shrink-0 flex flex-row items-start justify-start gap-[24px] max-w-full">
              <div className="w-10 relative leading-[40px] inline-block shrink-0 mq825:text-7xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
                01
              </div>
              <div className="flex-1 flex flex-col items-start justify-start gap-[16px] max-w-[calc(100%_-_136px)] shrink-0 text-text1">
                <div className="self-stretch relative leading-[40px] mq825:text-7xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">{`Lorem ipsum dolor sit amet consectetur. Quisque nec mattis congue cursus velit habitasse `}</div>
                <div className="self-stretch h-9 relative text-5xl leading-[36px] font-medium text-text2 inline-block mq450:text-lgi mq450:leading-[29px]">
                  Lorem ipsum dolor sit amet consectetur. Quisque nec mattis
                  congue cursus velit habitasse semper morbi.
                </div>
              </div>
              <img
                className="h-12 w-12 relative overflow-hidden shrink-0 object-cover"
                alt=""
                src="/eiarrowright-4@2x.png"
              />
            </div>
            <div className="self-stretch h-px flex flex-row items-start justify-start py-0 px-16 box-border max-w-full mq1275:pl-8 mq1275:pr-8 mq1275:box-border">
              <img
                className="h-px flex-1 relative max-w-full overflow-hidden"
                alt=""
                src="/vector-11.svg"
              />
            </div>
            <div className="self-stretch h-12 overflow-hidden shrink-0 flex flex-row items-start justify-start gap-[24px] max-w-full">
              <div className="w-10 relative leading-[40px] inline-block shrink-0 mq825:text-7xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
                01
              </div>
              <div className="flex-1 flex flex-col items-start justify-start gap-[16px] max-w-[calc(100%_-_136px)] shrink-0 text-text1">
                <div className="self-stretch relative leading-[40px] mq825:text-7xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">{`Lorem ipsum dolor sit amet consectetur. Quisque nec mattis congue cursus velit habitasse `}</div>
                <div className="self-stretch h-9 relative text-5xl leading-[36px] font-medium text-text2 inline-block mq450:text-lgi mq450:leading-[29px]">
                  Lorem ipsum dolor sit amet consectetur. Quisque nec mattis
                  congue cursus velit habitasse semper morbi.
                </div>
              </div>
              <img
                className="h-12 w-12 relative overflow-hidden shrink-0 object-cover"
                alt=""
                src="/eiarrowright-4@2x.png"
              />
            </div>
          </div>
        </div>
      </section> */}
      {/* <section className="overflow-hidden flex flex-col items-start justify-start p-[120px] box-border relative gap-[56px] max-w-full text-left text-29xl text-white font-body-small mq825:gap-[28px_56px] mq825:py-[51px] mq825:px-[30px] mq825:box-border mq1275:py-[78px] mq1275:px-[60px] mq1275:box-border">
        <img
          className="w-full h-[1798px] absolute !m-[0] top-[-776px] right-[0px] left-[0px] max-w-full overflow-hidden shrink-0 object-cover"
          alt=""
          src="/shape-trimmer@2x.png"
        />
        <div className="w-[272px] box-border border-0 flex flex-row items-start justify-start py-0 px-[21px] z-[1] border-l-[5px] border-solid border-accent">
          <h1 className="m-0 w-56 relative text-inherit leading-[56px] font-normal font-inherit inline-block mq825:text-19xl mq825:leading-[45px] mq450:text-10xl mq450:leading-[34px]">
            Our Blogs
          </h1>
        </div>
        <div className="w-[1680px] overflow-x-auto flex flex-row items-start justify-start gap-[48px] max-w-full z-[1] mq825:gap-[48px_24px]">
          <ColorAdjustor
            unsplash3PyBkxgTiL0="/unsplash3pybkxgtil0@2x.png"
            welcomeToWorldOneForexBlo="Welcome to WorldOne Forex Blog !"
          />
          <ColorAdjustor
            unsplash3PyBkxgTiL0="/image-14@2x.png"
            welcomeToWorldOneForexBlo="How to exchange currency in India?"
          />
          <ColorAdjustor
            unsplash3PyBkxgTiL0="/unsplashvp4wmibxvcy@2x.png"
            welcomeToWorldOneForexBlo="Forex Trading In India"
          />
        </div>
      </section> */}
      <section className="self-stretch bg-midnightblue overflow-hidden flex flex-col items-center justify-start pt-[30px] px-5 pb-12 box-border gap-[100px] max-w-full text-left text-13xl text-white font-lato mq825:gap-[50px_100px] mq825:pt-[51px] mq825:pb-5 mq825:box-border mq450:gap-[25px_100px] mq1275:pt-[78px] mq1275:pb-[31px] mq1275:box-border">
        <div className="w-full flex flex-row items-start justify-evenly max-w-full gap-[20px] mq1275:flex-wrap">
          <div className="flex text-center flex-col items-center sm:items-start justify-center sm:justify-start gap-[35px] mq450:gap-[17px_35px]">
            <b className="relative leading-[40px] inline-block text-5xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
              Services
            </b>
            <div className="flex overflow-hidden text-center flex-col tems-center sm:items-start justify-start gap-[16px] text-xl text-text5">
              <div className="flex flex-row items-center justify-center py-2 px-[7px]">
                <div className="relative text-center leading-[32px] mq450:text-lgi mq450:leading-[26px]">
                  Exchange Currency
                </div>
              </div>
              <div className="flex flex-row items-center justify-center py-2 px-[7px]">
                <div className="relative leading-[32px] mq450:text-lgi mq450:leading-[26px]">
                  Transfer Money Abroad
                </div>
              </div>
              <div className="flex flex-row items-center justify-center py-2 px-[7px]">
                <div className="relative leading-[32px] inline-block min-w-[117px] mq450:text-lgi mq450:leading-[26px]">
                  Forex Card
                </div>
              </div>
              <div className="flex flex-row items-center justify-center py-2 px-[7px]">
                <div className="relative leading-[32px] mq450:text-lgi mq450:leading-[26px]">
                  Travel Insurance
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-start text-center justify-start gap-[35px]">
            <b className="relative leading-[40px] text-5xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
              Quick Links
            </b>
            <div className="flex flex-col items-start justify-start gap-[16px] text-xl text-text5">
              <div className="flex flex-row items-center justify-center p-2">
                <div className="relative leading-[32px] inline-block min-w-[99px] mq450:text-lgi mq450:leading-[26px]">
                  About Us
                </div>
              </div>
              <div className="flex flex-row items-center justify-center py-2 px-1.5">
                <div className="relative leading-[32px] inline-block min-w-[84px] mq450:text-lgi mq450:leading-[26px]">
                  Careers
                </div>
              </div>
              <div className="flex flex-row items-center justify-center py-2 px-[7px]">
                <div className="relative leading-[32px] inline-block min-w-[80px] mq450:text-lgi mq450:leading-[26px]">
                  Outlets
                </div>
              </div>
              <div className="flex flex-row items-center justify-center p-2">
                <div className="relative leading-[32px] inline-block min-w-[48px] mq450:text-lgi mq450:leading-[26px]">
                  FAQ
                </div>
              </div>
              <div className="flex flex-row items-center justify-center p-2">
                <div className="relative leading-[32px] inline-block min-w-[94px] mq450:text-lgi mq450:leading-[26px]">
                  Site Map
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col text-center sm:text-left items-center sm:items-start justify-start  gap-[30px] max-w-full text-5xl text-text5">
            <b className="relative text-5xl leading-[40px] inline-block text-white min-w-[118px] mq825:text-7xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
              Address
            </b>
            <div className=" flex flex-col items-start text-xl justify-start gap-[8px]">
              <b className=" relative leading-[32px] mq450:text-lgi mq450:leading-[26px]">
                World One India Forex Private Limited.
              </b>
              <div className=" relative leading-[32px] text-xl mq450:text-lgi mq450:leading-[26px]">
                Shop No. 1, S-1, Ground Floor, <br/>
                American Plaza, Eros Hostel, <br/>
                Nehru Place, New Delhi, Delhi - 110019, India
              </div>
            </div>
            <div className="h-12 flex flex-row items-center justify-start py-0  pl-0 box-border gap-[8px] max-w-full mq825:pr-[146px] mq825:box-border mq450:pr-5 mq450:box-border">
              <img
                className="h-6 w-6 relative overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="/fimail.svg"
              />
              <div className="flex flex-row items-center justify-start py-2 px-1.5 box-border max-w-[calc(100%_-_32px)]">
                <b className="relative leading-[32px] whitespace-nowrap mq450:text-lgi text-xl mq450:leading-[26px]">
                  nodaldelhi@worldoneforex.com
                </b>
              </div>
            </div>
            <button className="cursor-pointer [border:none] py-3 px-[77px] bg-white rounded-2xl shadow-[0px_4px_16px_rgba(0,_6,_57,_0.05)] overflow-hidden flex flex-row items-center justify-center whitespace-nowrap hover:bg-gainsboro-100 mq450:pl-5 mq450:pr-5 mq450:box-border">
              <b className="relative text-xl leading-[32px] inline-block font-lato text-text0 text-left min-w-[99px]">
                Contact Us
              </b>
            </button>
          </div>
        </div>
        <div className="w-[1681px] h-[511px] flex flex-row items-start justify-center max-w-full">
          <div className="self-stretch w-[1436px] flex flex-row items-start justify-start relative max-w-full">
            <div className="h-[998px] w-[1413px] absolute !m-[0] bottom-[-531px] left-[-32px] rounded-[50%] bg-steelblue-200 [filter:blur(500px)]" />
            <iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" id="gmap_canvas" src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=World%20One%20India%20Forex%20Private%20Limited.%20Roorkee+()&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe> 
          </div>
        </div>
        <div className="w-[1680px] rounded-[20px] bg-darkslateblue-600 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] overflow-hidden flex flex-row items-start justify-between py-5 px-[120px] box-border max-w-full gap-[20px] z-[1] text-xl mq825:pl-[30px] mq825:pr-[30px] mq825:box-border mq1275:flex-wrap mq1275:justify-center mq1275:pl-[60px] mq1275:pr-[60px] mq1275:box-border">
          <div className="relative leading-[24px] font-medium inline-block max-w-full mq450:text-base mq450:leading-[19px]">
            @ 2024 World one India forex private limited
          </div>
          <div className="flex flex-row items-start justify-start gap-[45px] max-w-full mq450:flex-wrap mq450:gap-[45px_22px]">
            <div className="relative leading-[24px] font-semibold inline-block min-w-[126px] mq450:text-base mq450:leading-[19px]">
              Privacy Policy
            </div>
            <div className="relative leading-[24px] font-semibold mq450:text-base mq450:leading-[19px]">{`Terms & Conditions`}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeExchangeCurrency;

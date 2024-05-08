import { useState,useEffect } from "react";
import { order } from "@/states/storage";
import FrameComponent2 from "./frame-component2";
import FrameComponent1 from "./frame-component1";
import FrameComponent from "./frame-component";
import LinkFunction from "./link-function";
import Component from "./component";
import ColorAdjustor from "./color-adjustor";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { getRateMutation } from "@/hooks/prod";
import CityModal from "./cityModal";
import CurrencyCard from "./currancyCard";
import { getRateCardMutation } from "@/hooks/prod";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const HomeExchangeCurrency = () => {
  const [selected, setSelected] = useState(true);
 
  const [intialCurrency, setIntialCurrency] = useState({label:"INR",value:"INR"});
  const [finalCurrency, setFinalCurrency] = useState({label:"INR",value:"INR"});
  const [ amount, setAmount] = useState(0);
  const router = useRouter();
  const [Order, setOrder] = useAtom(order);
  const [rate, setRate] = useState(0)
  const [open, setOpen] = useState(false)
  const [city, setCity] = useState("")
  const [rates, setRates] = useState([])
  const [prod, setprod] = useState("Exchange Currency")
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { mutate: getRate } = getRateMutation(
    (res) => {
      setRate(res.data.rate);
    },
    (err) => {
      console.log(err);
    }
  )
  useEffect(() => {
  getRate(finalCurrency.value)
  }, [finalCurrency])
  
  const { mutate: getRateCard } = getRateCardMutation(
    (res) => {
      setRates(res.data);
    },
    (err) => {
      console.log(err);
    }
  )
  useEffect(() => {
    getRateCard()
  }, [])


  const handleOrder = () => {
    setOrder({
      intialCurrency: intialCurrency,
      finalCurrency: finalCurrency,
      amount: amount,
      rate: rate,
      city:city,
      product:prod
    });
    router.push("/summary/");
  }
  return (
    <div className="w-[1920px] bg-background max-w-full overflow-hidden flex flex-col items-start justify-start tracking-[normal]">
      <CityModal onClick={handleOrder} open={open} handleClose={handleClose} city={city} onCitySelect={setCity} />
      <section className="self-stretch bg-black flex flex-col items-start justify-start pt-12 px-0 pb-0 box-border relative gap-[82px] max-w-full text-left text-xl text-white font-body-small mq825:gap-[20px_82px] mq825:pt-5 mq825:box-border mq1275:gap-[41px_82px] mq1275:pt-[31px] mq1275:box-border">
        <img
          className="w-full h-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full object-cover"
          alt=""
          src="/gradient-wallpapers@2x.png"
        />
        <img
          className="w-[3983px] h-[1948.8px] absolute !m-[0] right-[-1032.1px] bottom-[-468.8px] z-[1]"
          alt=""
        />
        <div className="self-stretch flex flex-row items-start justify-center py-0 pr-[22px] pl-5 box-border max-w-full">
          <div className="w-[1682px] flex flex-col items-end justify-start gap-[98px] max-w-full mq825:gap-[49px_98px] mq450:gap-[24px_98px]">
            <div className="self-stretch h-[100px] rounded-3xl bg-darkslateblue-200 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] flex flex-row items-center justify-between py-[26px] px-16 box-border top-[0] z-[99] sticky gap-[20px] max-w-full mq1275:pl-8 mq1275:pr-8 mq1275:box-border">
              <img
                className="h-[25.5px] w-[99px] relative"
                loading="lazy"
                alt=""
                src="/w-o-f.svg"
              />
              <div className="w-[680px] flex flex-row items-center justify-between max-w-full mq825:hidden">
                <div className="overflow-hidden flex flex-row items-center justify-center py-1 px-[26px]">
                  <div className="relative leading-[32px] inline-block min-w-[58px]">
                    About
                  </div>
                </div>
                <div className="overflow-hidden flex flex-row items-center justify-center py-1 px-[18px]">
                  <div className="relative leading-[32px] inline-block min-w-[75px]">
                    Support
                  </div>
                </div>
                <div className="w-[111px] overflow-hidden shrink-0 flex flex-row items-center justify-center py-1 px-[29px] box-border">
                  <div className="flex-1 relative leading-[32px]">Blogs</div>
                </div>
                <div className="h-12 rounded-2xl bg-darkslateblue-400 overflow-hidden flex flex-row items-center justify-start py-2 pr-[18px] pl-4 box-border gap-[12px]">
                  <img
                    className="h-6 w-6 relative overflow-hidden shrink-0"
                    alt=""
                    src="/ulocationpinalt.svg"
                  />
                  <div className="relative leading-[32px] inline-block min-w-[79px]">
                    Location
                  </div>
                </div>
                <button className="cursor-pointer [border:none] py-1 px-[29px] bg-[transparent] overflow-hidden flex flex-row items-center justify-center">
                  <div className="relative text-xl leading-[32px] font-body-small text-primary text-left inline-block min-w-[52px]">
                    Login
                  </div>
                </button>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start gap-[173px] max-w-full text-[64px] text-text5 mq825:gap-[173px_43px] mq450:gap-[173px_22px] mq1275:gap-[173px_86px] mq1575:flex-wrap">
              <form className="m-0  rounded-13xl bg-darkslateblue-200 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] overflow-hidden flex flex-col items-center justify-start pt-8 px-8 pb-12 box-border gap-[56px] min-w-[35vw] max-w-full z-[2] mq825:pt-[21px] mq825:pb-[31px] mq825:box-border mq825:min-w-full mq450:gap-[28px_56px]">
                <div className="self-stretch rounded-3xl bg-darkslateblue-100 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] overflow-x-auto flex flex-row items-center justify-between py-6 px-8 gap-[1px]">
                  <button onClick={()=>{setprod("Exchange Currency")}} className="cursor-pointer [border:none] py-4 px-2 bg-[transparent] w-[177px] shadow-[0px_8px_16px_rgba(39,_53,_126,_0.1)] box-border shrink-0 flex flex-col items-center justify-center border-b-[4px] border-solid border-primary hover:bg-chocolate-200">
                    <div className={`relative text-lg font-body-small ${ prod=="Exchange Currency" ? "" : "font-medium"  } text-white text-center`}>
                      Exchange Currency
                    </div>
                  </button>
                  <div onClick={()=>{setprod("Transfer Money Abroad")}} className="cursor-pointer rounded-xl [filter:drop-shadow(0px_8px_16px_rgba(39,_53,_126,_0.1))] shrink-0 flex flex-col items-center justify-center py-4 px-2 box-border">
                    <div className={`relative text-lg font-body-small ${ prod=="Transfer Money Abroad" ? "" : "font-medium"  } text-white text-center`}>
                      Transfer Money Abroad
                    </div>
                  </div>
                  <div onClick={()=>{setprod("Forex Card")}} className="cursor-pointer rounded-xl [filter:drop-shadow(0px_8px_16px_rgba(39,_53,_126,_0.1))] shrink-0 flex flex-col items-center justify-center p-4 box-border">
                    <div className={`relative text-lg font-body-small ${ prod=="Forex Card" ? "" : "font-medium"  } text-white text-center`}>
                      Forex Card
                    </div>
                  </div>
                  <div onClick={()=>{setprod("Travel Insurance")}} className="cursor-pointer rounded-xl [filter:drop-shadow(0px_8px_16px_rgba(39,_53,_126,_0.1))] shrink-0 flex flex-col items-center justify-center py-4 px-2 box-border">
                    <div className={`relative text-lg font-body-small ${ prod=="Travel Insurance" ? "" : "font-medium"  } text-white text-center`}>
                      Travel Insurance
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-center justify-center gap-[32px] max-w-full mq450:gap-[16px_32px]">
                  <div className="self-stretch rounded-2xl bg-gray-100 shadow-[-2px_2px_8px_rgba(14,_21,_56,_0.2)_inset,_-4px_4px_16px_rgba(15,_20,_45,_0.15)_inset] flex flex-row items-start justify-start max-w-full [row-gap:20px] mq825:flex-wrap">
                    <div
                      onClick={() => setSelected(false)}
                      className={` cursor-pointer [border:none] py-3 px-5 ${selected ? "bg-primary" : ""} flex-1 rounded-2xl overflow-hidden flex flex-row items-center justify-center box-border min-w-[248px] whitespace-nowrap max-w-full hover:bg-chocolate-100`}
                    >
                      <div className="relative text-xl  font-semibold font-lato text-white text-left inline-block min-w-[123px]">
                        Buy Currency
                      </div>
                    </div>
                    <div className="flex-1 overflow-hidden flex flex-row items-center justify-center box-border min-w-[248px] max-w-full">
                      <div
                        onClick={() => setSelected(true)}
                        className={`cursor-pointer [border:none] py-3 px-5 ${!selected ? "bg-primary" : ""} flex-1 rounded-2xl overflow-hidden flex flex-row items-center justify-center box-border min-w-[248px] whitespace-nowrap max-w-full hover:bg-chocolate-100`}
                      >
                        <div className="relative text-xl  font-medium font-lato text-text5 text-left inline-block min-w-[118px] mq450:text-base ">
                          Sell Currency
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start gap-[24px] max-w-full">
                    <div className="self-stretch flex flex-row items-start justify-start gap-[24px] max-w-full mq825:flex-wrap">
                      <FrameComponent2  selectedOption={intialCurrency} setSelectedOption={setIntialCurrency} currencyYouHave={ selected ? "Currency you Have" : "Currency you Want"  } />
                      <FrameComponent2 fixed={true} selectedOption={finalCurrency} setSelectedOption={setFinalCurrency} currencyYouHave={ selected ?  "Currency you Want" :"Currency you Have" } />
                    </div>
                    
                    <div className="self-stretch flex flex-row items-start justify-start gap-[24px] max-w-full mq825:flex-wrap">
                      <div className="flex-1 rounded-lg bg-gray-100 overflow-hidden flex flex-row items-center justify-between py-3 px-6 box-border [row-gap:20px] max-w-full gap-[0px] mq825:flex-wrap">
                        <input
                          className=" w-[80%] max-w-[419px] [border:none] [outline:none] bg-[transparent] h-8 flex flex-row items-center justify-start font-body-small font-medium text-xl text-text5 "
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
                          1 {finalCurrency?.value} = {(1/rate).toFixed(2)} {intialCurrency?.value}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-end justify-start gap-[56px] max-w-full mq825:flex-wrap mq450:gap-[56px_28px]">
                  <div className="flex flex-col items-start justify-center gap-[8px]">
                    <div className="w-[181px] relative text-13xl leading-[32px] font-body-small text-accent text-left inline-block mq825:text-7xl mq825:leading-[26px] mq450:text-lgi mq450:leading-[19px]">
                      { selected? intialCurrency?.value : finalCurrency?.value  } Amount
                    </div>
                    <h1 className="m-0 relative text-29xl leading-[56px] font-normal font-body-small text-white text-left mq825:text-19xl mq825:leading-[45px] mq450:text-10xl mq450:leading-[34px]">
                      { selected ?  `${(amount/rate).toFixed(2)}` : `${(amount*rate).toFixed(2)}` }
                    </h1>
                  </div>
                  <div onClick={()=>{handleOpen()}} className="cursor-pointer [border:none] p-5 bg-white flex-1 rounded-3xl shadow-[0px_8px_24px_rgba(57,_26,_0,_0.15)] overflow-hidden flex flex-row items-center justify-center box-border gap-[16px] min-w-[163px] whitespace-nowrap max-w-full hover:bg-gainsboro-100">
                    <img
                      className="h-8 w-8 relative overflow-hidden shrink-0 min-h-[32px]"
                      alt=""
                      src="/ushoppingcart.svg"
                    />
                    <div className="relative text-5xl leading-[32px] font-medium font-body-small text-text1 text-left">
                      Add To Cart
                    </div>
                  </div>
                </div>
              </form>
              <div className="w-[683px] flex flex-col items-start justify-start pt-[84px] px-0 pb-0 box-border min-w-[683px] max-w-full mq825:min-w-full mq450:pt-[55px] mq450:box-border mq1575:flex-1">
                <div className="self-stretch flex flex-col items-start justify-start gap-[64px] z-[2] mq825:gap-[32px_64px] mq450:gap-[16px_64px]">
                  <h1 className="m-0 self-stretch relative text-inherit leading-[72px] font-normal font-inherit mq825:text-[51px] mq825:leading-[58px] mq450:text-19xl mq450:leading-[43px]">
                    Exchange Your Currency
                  </h1>
                  <div className="self-stretch relative text-5xl leading-[36px] font-medium text-white mq450:text-lgi mq450:leading-[29px]">
                    Exchange major world currencies with competitive rates and
                    exceptional service, ensuring seamless transactions for your
                    convenience. Whether for travel or business, trust us for
                    swift and reliable currency conversions.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch bg-darkslateblue-300 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] overflow-hidden flex flex-col items-center justify-start py-12 px-8 box-border relative gap-[56px] max-w-full z-[2] mq825:gap-[28px_56px] mq450:pt-[31px] mq450:pb-[31px] mq450:box-border">
          <div className=" flex w-full gap-5" >

            {rates.slice(4).map((rate, index) => (
              <CurrencyCard key={index} rate={rate} />
            ))
          }


          </div>
          <button className="cursor-pointer [border:none] py-4 px-[38.5px] bg-background h-16 rounded-2xl shadow-[0px_8px_24px_rgba(57,_26,_0,_0.15)] overflow-hidden shrink-0 flex flex-row items-center justify-center box-border gap-[14px] whitespace-nowrap hover:bg-gainsboro-200">
            <img
              className="h-8 w-8 relative overflow-hidden shrink-0 min-h-[32px]"
              alt=""
              src="/gglist.svg"
            />
            <div className="relative text-5xl leading-[32px] font-semibold font-lato text-secondary text-left">
              See Full Rate Card
            </div>
          </button>
          {/* <img
            className="w-14 h-14 absolute !m-[0] top-[calc(50%_-_92px)] left-[32px] overflow-hidden shrink-0 object-contain"
            loading="lazy"
            alt=""
            src="/uanglerightb.svg"
          />
          <img
            className="w-14 h-14 absolute !m-[0] top-[calc(50%_-_84px)] left-[1832px] overflow-hidden shrink-0"
            alt=""
            src="/uanglerightb-1.svg"
          /> */}
        </div>
      </section>
      <section className="self-stretch bg-background overflow-hidden flex flex-col items-start justify-center py-40 px-[120px] box-border max-w-full text-left text-29xl text-text1 font-body-small mq825:py-[104px] mq825:px-[30px] mq825:box-border mq450:pt-[68px] mq450:pb-[68px] mq450:box-border mq1275:pl-[60px] mq1275:pr-[60px] mq1275:box-border">
        <div className="self-stretch flex flex-row items-start justify-start gap-[111px] max-w-full mq825:gap-[111px_55px] mq450:gap-[111px_28px] mq1575:flex-wrap">
          <div className="flex-1 flex flex-col items-start justify-start gap-[56px] min-w-[556px] max-w-full mq825:min-w-full mq450:gap-[28px_56px]">
            <div className="w-[254px] box-border flex flex-row items-center justify-center py-0 px-[21px] border-l-[5px] border-0 border-solid border-secondary">
              <h1 className="m-0 w-[206px] relative text-inherit leading-[56px] font-normal font-inherit inline-block mq825:text-19xl mq825:leading-[45px] mq450:text-10xl mq450:leading-[34px]">
                About Us
              </h1>
            </div>
            <div className="self-stretch h-[396px] relative text-5xl leading-[36px] font-medium text-text2 inline-block mq450:text-lgi mq450:leading-[29px]">
              <p className="m-0">
                World One Forex was incorporated in 2013 and was granted AD CAT
                II license as well as Import of Foreign Currencies Licence in FY
                2019-20.
              </p>
              <p className="m-0"></p>
              <p className="m-0 whitespace-pre-wrap">{`We have offices in 12 cities (Delhi NCR, Mumbai, Kolkata, Bangalore, Chennai, Kochi, Ludhiana, Chandigarh) and an employee base of 85 professionals.  In addition to the regular forex services where we serve about 25,000 retail and 4,000 corporate clients, WorldOne has been regularly supporting international students with their fee remittances. We have worked with about 18,000 students till date and have closed remittances close to USD 40 million. We make a significant effort in ensuring a professional and efficient service to your clients that has led to >90% customer retention rate.`}</p>
            </div>
          </div>
          <img
            className="h-[508px] w-[713px] relative rounded-3xl object-cover max-w-full mq1575:flex-1"
            loading="lazy"
            alt=""
            src="/unsplash8nppe0ylmn8@2x.png"
          />
        </div>
      </section>
      <section className="self-stretch bg-secondary overflow-hidden flex flex-row items-start justify-center py-[120px] px-5 box-border relative gap-[8px] max-w-full text-left text-29xl text-text5 font-body-small mq825:pt-[51px] mq825:pb-[51px] mq825:box-border mq1275:pt-[78px] mq1275:pb-[78px] mq1275:box-border">
        <img
          className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full object-cover"
          alt=""
          src="/conditional-branch@2x.png"
        />
        <div className="w-full px-[5%] flex flex-row items-start justify-start max-w-full z-[1] mq825:gap-[120px_60px] mq450:gap-[120px_30px]">
          <div className="flex-1 flex flex-col items-start justify-start gap-[56px] max-w-full mq825:gap-[28px_56px]">
            <div className="w-[426px] box-border flex flex-row items-start justify-start py-0 px-[21px] max-w-full text-white border-0 border-l-[5px] border-solid border-accent">
              <h1 className="m-0 flex-1 relative text-inherit leading-[56px] font-normal font-inherit inline-block max-w-full mq825:text-19xl mq825:leading-[45px] mq450:text-10xl mq450:leading-[34px]">
                Products Offered
              </h1>
            </div>
            <div className="self-stretch relative text-5xl leading-[36px] font-medium mq450:text-lgi mq450:leading-[29px]">{`World One Forex was incorporated in 2013 and was granted AD CAT II license as well as Import of Foreign Currencies Licence in FY 2019-20.
We have offices in 12 cities (Delhi NCR, Mumbai, Kolkata, Bangalore, Chennai, Kochi, Ludhiana, Chandigarh) and an employee base of 85 professionals. `}</div>
            <div className=" w-full min-h-[616px] flex flex-row flex-wrap items-center justify-start relative gap-[1%_1%] max-w-full text-13xl font-lato mq825:h-auto mq825:min-h-[616]">
              <FrameComponent
                currency="/currency.svg"
                exchangeCurrency="Exchange Currency"
              />
              <FrameComponent
                currency="/send-money.svg"
                exchangeCurrency="Transfer Money Abroad"
                propLeft="856px"
                propTop="0px"
                propBackgroundColor="rgba(60, 73, 139, 0.3)"
                propBottom="-281.66px"
              />
              <FrameComponent
                currency="/mdilightcreditcard.svg"
                exchangeCurrency="Transfer Money Abroad"
                propLeft="0px"
                propTop="332px"
                propBackgroundColor="rgba(55, 70, 143, 0.3)"
                propBottom="-281.66px"
              />
              <div className="w-[49%] !m-[0] top-[332px] left-[856px] rounded-13xl bg-darkslateblue-600 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] overflow-hidden shrink-0 flex flex-row items-start justify-start py-8 px-16 box-border gap-[48px] max-w-full mq825:flex-wrap">
                <div className="h-[190px] flex flex-col items-start justify-start pt-[30px] px-0 pb-0 box-border">
                  <img
                    className="w-40 h-40 relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="/phairplanetakeofflight.svg"
                  />
                </div>
                <div className="flex-1 flex flex-col items-start justify-start gap-[32px] min-w-[317px] max-w-full">
                  <div className="self-stretch flex flex-col items-start justify-start gap-[16px] max-w-full">
                    <b className="relative leading-[40px] inline-block max-w-full mq825:text-7xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
                      Transfer Money Abroad
                    </b>
                    <div className="self-stretch relative text-xl leading-[28px] mq450:text-base mq450:leading-[22px]">{`Exchange major world currencies with competitive rates and exceptional service, ensuring seamless transactions for your convenience. `}</div>
                  </div>
                  <div className="h-12 rounded-xl bg-white overflow-hidden shrink-0 flex flex-row items-start justify-start py-2 px-[37.5px] box-border gap-[6px] text-5xl text-text1">
                    <div className="relative  leading-[32px] font-medium inline-block min-w-[82px] mq450:text-lgi mq450:leading-[26px]">
                      Explore
                    </div>
                    <img
                      className="h-8 w-8 relative overflow-hidden shrink-0 object-cover min-h-[32px]"
                      alt=""
                      src="/eiarrowright@2x.png"
                    />
                  </div>
                </div>
                <div className="h-[334px] w-[528.3px] absolute !m-[0] right-[-47.3px] bottom-[-281.66px] rounded-[50%] bg-lightblue [filter:blur(250px)] [transform:_rotate(-12deg)] [transform-origin:0_0] z-[1]" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="self-stretch bg-background overflow-hidden flex flex-col items-start justify-start p-[120px] box-border gap-[56px] max-w-full text-left text-29xl text-text1 font-body-small mq825:gap-[28px_56px] mq825:py-[51px] mq825:px-[30px] mq825:box-border mq1275:py-[78px] mq1275:px-[60px] mq1275:box-border">
        <div className="w-[345px] box-border flex flex-row items-start justify-start py-0 px-[21px] max-w-full border-l-[5px] border-0 border-solid border-secondary">
          <h1 className="m-0 flex-1 relative text-inherit leading-[56px] font-normal font-inherit mq825:text-19xl mq825:leading-[45px] mq450:text-10xl mq450:leading-[34px]">
            How It Works
          </h1>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start gap-[143px] max-w-full text-center text-13xl mq825:gap-[143px_36px] mq450:gap-[143px_18px] mq1275:gap-[143px_71px] mq1575:flex-wrap">
          <div className="flex-1 flex flex-col items-start justify-start gap-[32px] min-w-[536px] max-w-full mq825:min-w-full mq450:gap-[16px_32px]">
            <div className="self-stretch rounded-13xl bg-white shadow-[-2px_-4px_16px_rgba(93,_101,_143,_0.15)_inset] overflow-hidden flex flex-row items-start justify-start p-8 box-border relative gap-[32px] max-w-full mq825:flex-wrap mq450:gap-[32px_16px]">
              <div className="h-[302.8px] w-[634.5px] absolute !m-[0] right-[-99.5px] bottom-[-242.8px] rounded-[50%] [filter:blur(200px)] opacity-[0.5]" />
              <div className="w-[72px] flex flex-col items-start justify-start pt-1.5 px-0 pb-0 box-border">
                <div className="self-stretch h-[72px] relative">
                  <div className="absolute top-[0px] left-[0px] rounded-[50%] box-border w-full h-full border-[0px] border-solid border-text1" />
                  <div className="absolute top-[calc(50%_-_16px)] left-[calc(50%_-_20px)] leading-[40px] font-medium inline-block w-10 h-[33px] z-[1] mq825:text-7xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
                    01
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-start gap-[16px] min-w-[426px] max-w-full z-[1] text-left mq825:min-w-full">
                <div className="w-[299px] relative leading-[32px] inline-block mq825:text-7xl mq825:leading-[26px] mq450:text-lgi mq450:leading-[19px]">
                  Select your currency
                </div>
                <div className="self-stretch relative text-5xl leading-[36px] font-medium text-text2 mq450:text-lgi mq450:leading-[29px]">
                  Lorem ipsum dolor sit amet consectetur.
                </div>
              </div>
            </div>
            <div className="self-stretch rounded-13xl bg-secondary shadow-[-2px_-4px_16px_rgba(228,_245,_255,_0.25)_inset,_0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] overflow-hidden flex flex-row items-start justify-start p-8 box-border relative gap-[32px] max-w-full text-white mq825:flex-wrap mq450:gap-[32px_16px]">
              <div className="h-[302.8px] w-[634.5px] absolute !m-[0] right-[-99.5px] bottom-[-242.8px] rounded-[50%] bg-steelblue-100 [filter:blur(200px)]" />
              <div className="w-[72px] flex flex-col items-start justify-start pt-1.5 px-0 pb-0 box-border">
                <div className="self-stretch h-[72px] relative">
                  <div className="absolute top-[0px] left-[0px] rounded-[50%] box-border w-full h-full border-[0px] border-solid border-text5" />
                  <div className="absolute top-[calc(50%_-_16px)] left-[calc(50%_-_20px)] leading-[40px] font-medium inline-block w-10 h-[33px] z-[1] mq825:text-7xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
                    02
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-start gap-[16px] min-w-[426px] max-w-full z-[1] text-left mq825:min-w-full">
                <div className="w-[313px] relative leading-[32px] inline-block mq825:text-7xl mq825:leading-[26px] mq450:text-lgi mq450:leading-[19px]">
                  Freeze your live rates
                </div>
                <div className="self-stretch relative text-5xl leading-[36px] font-medium mq450:text-lgi mq450:leading-[29px]">
                  Lorem ipsum dolor sit amet consectetur.
                </div>
              </div>
            </div>
            <div className="self-stretch rounded-13xl bg-white shadow-[-2px_-4px_16px_rgba(93,_101,_143,_0.15)_inset] overflow-hidden flex flex-row items-start justify-start p-8 box-border relative gap-[32px] max-w-full mq825:flex-wrap mq450:gap-[32px_16px]">
              <div className="h-[302.8px] w-[634.5px] absolute !m-[0] right-[-99.5px] bottom-[-242.8px] rounded-[50%] [filter:blur(200px)] opacity-[0.5]" />
              <div className="w-[72px] flex flex-col items-start justify-start pt-1.5 px-0 pb-0 box-border">
                <div className="self-stretch h-[72px] relative">
                  <div className="absolute top-[0px] left-[0px] rounded-[50%] box-border w-full h-full border-[0px] border-solid border-text1" />
                  <div className="absolute top-[calc(50%_-_16px)] left-[calc(50%_-_20px)] leading-[40px] font-medium inline-block w-10 h-[33px] z-[1] mq825:text-7xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
                    03
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-start gap-[16px] min-w-[426px] max-w-full z-[1] text-left mq825:min-w-full">
                <div className="w-[380px] relative leading-[32px] inline-block max-w-full mq825:text-7xl mq825:leading-[26px] mq450:text-lgi mq450:leading-[19px]">
                  Complete documentation
                </div>
                <div className="self-stretch relative text-5xl leading-[36px] font-medium text-text2 mq450:text-lgi mq450:leading-[29px]">
                  Lorem ipsum dolor sit amet consectetur.
                </div>
              </div>
            </div>
            <div className="self-stretch rounded-13xl bg-white shadow-[-2px_-4px_16px_rgba(93,_101,_143,_0.15)_inset] overflow-hidden flex flex-row items-start justify-start p-8 box-border relative gap-[32px] max-w-full mq825:flex-wrap mq450:gap-[32px_16px]">
              <div className="h-[302.8px] w-[634.5px] absolute !m-[0] right-[-99.5px] bottom-[-242.8px] rounded-[50%] [filter:blur(200px)] opacity-[0.5]" />
              <div className="w-[72px] flex flex-col items-start justify-start pt-1.5 px-0 pb-0 box-border">
                <div className="self-stretch h-[72px] relative">
                  <div className="absolute top-[0px] left-[0px] rounded-[50%] box-border w-full h-full border-[0px] border-solid border-text1" />
                  <div className="absolute top-[calc(50%_-_16px)] left-[calc(50%_-_20px)] leading-[40px] font-medium inline-block w-10 h-[33px] z-[1] mq825:text-7xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
                    04
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-start gap-[16px] min-w-[426px] max-w-full z-[1] text-left mq825:min-w-full">
                <div className="w-[297px] relative leading-[32px] inline-block mq825:text-7xl mq825:leading-[26px] mq450:text-lgi mq450:leading-[19px]">
                  Get world one forex
                </div>
                <div className="self-stretch relative text-5xl leading-[36px] font-medium text-text2 mq450:text-lgi mq450:leading-[29px]">
                  Lorem ipsum dolor sit amet consectetur.
                </div>
              </div>
            </div>
          </div>
          <div className="h-[688px] w-[713px] relative rounded-13xl shrink-0 flex items-center justify-center">
            <img
              className="h-full w-full overflow-hidden shrink-0 max-w-full object-contain absolute left-[0px] top-[12px] [transform:scale(1.151)] mq1575:flex-1"
              loading="lazy"
              alt=""
              src="/macbookpro16@2x.png"
            />
          </div>
        </div>
      </section>
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
            <div className="w-[1680px] overflow-x-auto flex flex-row items-center justify-start gap-[64px] max-w-full mq825:gap-[64px_32px] mq450:gap-[64px_16px]">
              <LinkFunction
                reliability="Reliability"
                trustOurExperienceAndSecu="Trust our experience and secure transactions."
              />
              <LinkFunction
                reliability="Competitive Rates"
                trustOurExperienceAndSecu="Maximize currency value with our rates.
"
                propMinWidth="unset"
                propWidth="202px"
              />
              <LinkFunction
                reliability="Convenience"
                trustOurExperienceAndSecu="Experience hassle-free currency exchange online."
                propMinWidth="unset"
                propWidth="145px"
              />
              <LinkFunction
                reliability="Security"
                trustOurExperienceAndSecu="Rest assured with our stringent measures."
                propMinWidth="89px"
                propWidth="unset"
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
      <section className="self-stretch overflow-hidden flex flex-row items-start justify-center py-[120px] px-5 box-border min-h-[828px] max-w-full text-left text-29xl text-text1 font-body-small mq825:pt-[78px] mq825:pb-[78px] mq825:box-border mq450:pt-[51px] mq450:pb-[51px] mq450:box-border">
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
      </section>
      <section className="overflow-hidden flex flex-col items-start justify-start p-[120px] box-border relative gap-[56px] max-w-full text-left text-29xl text-white font-body-small mq825:gap-[28px_56px] mq825:py-[51px] mq825:px-[30px] mq825:box-border mq1275:py-[78px] mq1275:px-[60px] mq1275:box-border">
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
      </section>
      <section className="self-stretch bg-midnightblue overflow-hidden flex flex-col items-center justify-start pt-[120px] px-5 pb-12 box-border gap-[100px] max-w-full text-left text-13xl text-white font-lato mq825:gap-[50px_100px] mq825:pt-[51px] mq825:pb-5 mq825:box-border mq450:gap-[25px_100px] mq1275:pt-[78px] mq1275:pb-[31px] mq1275:box-border">
        <div className="w-[1681px] flex flex-row items-start justify-between max-w-full gap-[20px] mq1275:flex-wrap">
          <div className="flex flex-col items-start justify-start gap-[35px] mq450:gap-[17px_35px]">
            <b className="relative leading-[40px] inline-block min-w-[120px] mq825:text-7xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
              Services
            </b>
            <div className="flex overflow-hidden flex-col items-start justify-start gap-[16px] text-5xl text-text5">
              <div className="flex flex-row items-center justify-center py-2 px-[7px]">
                <div className="relative leading-[32px] mq450:text-lgi mq450:leading-[26px]">
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
          <div className="flex flex-col items-start justify-start gap-[35px]">
            <b className="relative leading-[40px] mq825:text-7xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
              Quick Links
            </b>
            <div className="flex flex-col items-start justify-start gap-[16px] text-5xl text-text5">
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
          <div className="w-[681px] flex flex-col items-start justify-start gap-[30px] max-w-full text-5xl text-text5">
            <b className="relative text-13xl leading-[40px] inline-block text-white min-w-[118px] mq825:text-7xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
              Address
            </b>
            <div className="self-stretch flex flex-col items-start justify-start gap-[8px]">
              <b className="self-stretch relative leading-[32px] mq450:text-lgi mq450:leading-[26px]">
                World One India Forex Private Limited.
              </b>
              <div className="self-stretch relative leading-[32px] mq450:text-lgi mq450:leading-[26px]">
                Shop No. 1, S-1, Ground Floor, American Plaza, Eros Hostel,
                Nehru Place, New Delhi, Delhi - 110019, India
              </div>
            </div>
            <div className="h-12 flex flex-row items-center justify-start py-0 pr-[293px] pl-0 box-border gap-[8px] max-w-full mq825:pr-[146px] mq825:box-border mq450:pr-5 mq450:box-border">
              <img
                className="h-6 w-6 relative overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="/fimail.svg"
              />
              <div className="flex flex-row items-center justify-start py-2 px-1.5 box-border max-w-[calc(100%_-_32px)]">
                <b className="relative leading-[32px] whitespace-nowrap mq450:text-lgi mq450:leading-[26px]">
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
            <img
              className="h-[511px] flex-1 relative rounded-13xl max-w-full overflow-hidden object-cover z-[1]"
              loading="lazy"
              alt=""
              src="/image-20@2x.png"
            />
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

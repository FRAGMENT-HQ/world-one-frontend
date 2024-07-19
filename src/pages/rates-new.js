import Select from "react-select";
import { getFullRateCardMutation } from "@/hooks/prod";
import Smodal from "@/components/smodal";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/navbar";
import country from "../../country.json";
const cityOptions = [
  { label: "Delhi", value: "Delhi" },
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
]
  .slice()
  .sort((a, b) => a.label.trim().localeCompare(b.label.trim()));

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

const options = [
  { label: "Delhi", value: "Delhi" },
  { label: "Mumbai", value: "Mumbai" },
  { label: "Chennai", value: "Chennai" },
  { label: "Kolkata", value: "Kolkata" },
  // { label: "Agra", value: "Agra" },
  // { label: "Jaipur", value: "Jaipur" },
  { label: "Lucknow", value: "Lucknow" },
  { label: "Chandigarh", value: "Chandigarh" },
];
const options2 = [
  { label: "Gurgaon", value: "Gurgaon" },
  { label: "Noida", value: "Noida" },

  { label: "Hyderabad", value: "Hyderabad" },
  { label: "Vadodara", value: "Vadodara" },
  // { label: "Lucknow", value: "Lucknow" },
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

const getImg = (name) => {
  let Country = country.find((c) => c.code === name);
  let full = Country?.name;

  return Country ? { flag: Country?.flag, name: full } : { flag: "", name: "" };
};
const Outlets = () => {
  const [open, setOpen] = useState(false);
  // const [drawerOpen, setdrawerOpen] = useState(false);
  const [display, setDisplay] = useState(-1);
  const [city, setCity] = useState("");
  const [data, setData] = useState([]);
  const [serData, setSerData] = useState([]);
  const [search, setSearch] = useState("");
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 100;
  };
  const scrollRight = () => {
    scrollRef.current.scrollLeft += 100;
  };

  // const router = useRouter();
  const size = useWindowSize();

  const { mutate, isLoading } = getFullRateCardMutation(
    (res) => {
      let Data = res.data.data;
      let city = res.data.city;
      console.log(city);
      Data = Data.map((d) => {
        const buyRate = (
          (1 / d.rate) *
          (1 + (d.markupPercentage + city.markup_percentage) / 100)
        ).toFixed(2);
        const cardBuyRate = (
          (1 / d.rate) *
          (1 + (d.cardMarkupPercentage + city.markup_percentage) / 100)
        ).toFixed(2);
        const sellRate = (
          (1 / d.rate) *
          (1 - (d.markdownPercentage + city.markdown_percentage) / 100)
        ).toFixed(2);
        const cardSellRate = (
          (1 / d.rate) *
          (1 - (d.cardMarkdownPercentage + city.markdown_percentage) / 100)
        ).toFixed(2);
        const currency = d.currency;
        let temp = getImg(currency);
        const flag = temp.flag;
        const full = temp.name;
        console.log(buyRate, cardBuyRate, sellRate, cardSellRate);

        return {
          flag,
          full,
          currency,
          buy: {
            cash: buyRate,
            forexCard: cardBuyRate,
            remittance: buyRate,
          },
          sell: {
            cash: sellRate,
            forexCard: cardSellRate,
          },
        };
      });

      setData(Data);
      setSerData(Data);
    },

    (err) => {
      console.log(err);
    }
  );

  useEffect(() => {
    mutate(city?.value);
  }, [city]);

  useEffect(() => {
    if (size.width > 720) {
      setDisplay(-1);
    } else {
      setDisplay(0);
    }
  }, [size.width]);

  useEffect(() => {
    if (search.length > 0) {
      let temp = data.filter((d) =>
        d.currency.toLowerCase().includes(search.toLowerCase())
      );
      setSerData(temp);
    } else {
      setSerData(data);
    }
  }, [search]);

  return (
    <div className="w-full relative bg-background flex flex-col items-start justify-start pt-[3rem] px-[5%] laptop:px-[120px] pb-[10rem] box-border gap-[2rem]  tracking-[normal] ">
      <Smodal open={open} setOpen={setOpen} />
      {/* <InputArray /> */}
      <Navbar />
      <div className="w-full  box-border flex flex-row items-start justify-start py-0 px-[21px] max-w-full text-text2 border-0 border-l-[5px] border-solid border-secondary">
        <h1 className="m-0 flex-1 relative tex-3xl leading-[56px] font-bold font-inherit inline-block max-w-full ">
          Foreign Exchange Rates
        </h1>
      </div>

      <Select
        defaultValue={city}
        value={city}
        isSearchable={true}
        onChange={setCity}
        options={cityOptions}
        placeholder="Select City"
        classNames={{
          container: () =>
            "w-[90vw] xs:w-96  !text-white mt-7 !rounded-xl border-solid border-2 border-[#000] rounded-lg bg-gray-100 py-1 sm:py-1 ",
          control: () => "self-stretch !bg-transparent !border-none !mx-2",
          menuList: () => "!bg-midnightblue",
          option: () => "!text-white",
          input: () => "!text-white",
          singleValue: () => " !text-base",
          indicatorSeparator: () => "hidden",
          placeholder: () => "",
        }}
      />
      <div className="flex flex-row items-center w-full py-[1rem] gap-[4vw] justify-start overflow-y-scroll ">
        <div
          className="bg-white px-4 py-3 rounded-xl flex justify-center items-center "
          onClick={() => {
            scrollLeft();
          }}
        >
          <img src="bl.svg" />
        </div>

        <div
          ref={scrollRef}
          className="self-stretch flex snap-x overflow-x-scroll flex w-full gap-[4vw]"
        >
          {options.map((option) => {
            return (
              <div
                key={option.value}
                onClick={() => setCity(option)}
                className={`w-[8rem] font-semibold mt-4 ml-2 mr-2 h-[3.5rem] cursor-pointer shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-2xl  overflow-hidden flex flex-col items-center justify-center py-[1.5rem] px-[3.5rem] ${
                  city.value == option.value
                    ? "!bg-[#FF9135] text-white "
                    : "bg-white text-[#27357E]"
                }`}
              >
                <img
                  src={`/city/${city.value == option.value ? "light" : "dark"}/${option.value}.svg`}
                  className="w-16"
                />
                {option.label}
              </div>
            );
          })}
          {options2.map((option) => {
            return (
              <div
                key={option.value}
                onClick={() => setCity(option)}
                className={`w-[9rem] font-semibold mt-4  h-[3.5rem] cursor-pointer shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-2xl  overflow-hidden flex flex-col items-center justify-center py-[1.5rem] px-[3.5rem] ${
                  city.value == option.value
                    ? "!bg-[#FF9135] text-white "
                    : "bg-white text-[#27357E]"
                }`}
              >
                <img
                  src={`/city/${city.value == option.value ? "light" : "dark"}/City.svg`}
                  className="w-16"
                />
                {option.label}
              </div>
            );
          })}
        </div>
        <div
          className="bg-white px-4 py-3 rounded-xl flex justify-center items-center "
          onClick={() => {
            scrollRight();
          }}
        >
          <img src="br.svg" />
        </div>
      </div>

      <section className=" mt-4 flex flex-col items-start justify-start gap-6 min-w-full">
        <div className="flex justify-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search for currency"
            className=" w-[18rem] py-3.5 rounded-xl pr-1 pl-2"
          />
          <img src="/search.svg" className="w-6 -ml-10" />
        </div>
        <div className="w-full flex font-semibold gap-[3%] ">
          <div className="w-36 bg-[#E6E9F7] h-10 py-1 rounded-xl flex items-center justify-center ">
            Currency
          </div>
          <div
            onClick={() => {
              setDisplay(1);
            }}
            className={` ${display == 1 && "border-2 border-[#38B000] border-solid border"} w-[50%] bg-[#DCFFCC] h-10 py-1 rounded-xl flex items-center justify-center `}
          >
            Buy
          </div>
          <div
            onClick={() => {
              setDisplay(0);
            }}
            className={` ${display == 0 && "border-2 border-[#FF3F2C] border-solid border"} flex-1 self-streach bg-[#FFEFE1] px-6 h-10 py-1 rounded-xl flex items-center justify-center `}
          >
            sell
          </div>
        </div>
        <div className="w-full text-xs laptop:text-sm flex font-normal gap-[3%]  ">
          <div className="w-36 rounded-xl flex items-center "></div>
          {display != 0 && (
            <div className="w-full flex-1 rounded-xl flex items-center justify-evenly ">
              <div className="w-[105px]"> Currency Notes (Currancy)</div>
              <div className="w-[98px]"> Prepaid Forex Card</div>
              <div className="w-[71px]"> Remittance </div>
            </div>
          )}
          {display != 1 && (
            <div className="flex-1 self-streach rounded-xl flex items-center justify-evenly ">
              <div className="w-[143px]"> Currency Notes (Currancy) </div>
              <div> Prepaid Forex Card </div>
            </div>
          )}
        </div>
        <div className="w-full border border-solid border-[#27357E]"></div>

        {serData.map((currency) => {
          return (
            <>
              <div className="w-full text-sm flex font-normal gap-[3%]  ">
                <div className="w-36 rounded-xl flex items-center gap-5 ">
                  <img src={currency?.flag} /> <div> {currency?.full} </div>
                </div>
                {display != 0 && (
                  <div className="w-full text-[#38B000]  flex-1 rounded-xl flex items-center justify-evenly  ">
                    <div className="w-[105px]"> {currency.buy.cash}</div>
                    <div className="w-[98px]"> {currency.buy.forexCard} </div>
                    <div className="w-[71px]"> {currency.buy.remittance} </div>
                  </div>
                )}
                {display != 1 && (
                  <div className="flex-1 text-[#FF3F2C] self-streach rounded-xl flex items-center justify-evenly">
                    <div className="w-[143px]"> {currency.sell.cash} </div>
                    <div> {currency.sell.forexCard} </div>
                  </div>
                )}
              </div>
              <div className="w-full border-[0.5px] border-solid border-[#BDBDBD]"></div>
            </>
          );
        })}
      </section>
    </div>
  );
};

export default Outlets;

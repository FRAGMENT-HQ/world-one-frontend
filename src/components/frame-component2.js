// import Select from 'react-select';
import countryData from "../../country.json";
import React from "react";
// import Dropdown from 'react-dropdown';
import Select, { components } from "react-select";
import { useEffect,useState } from "react";
import {getForexBuyListMutation} from "../hooks/prod";
const FrameComponent2 = ({
  selectedOption,
  setSelectedOption,
  currencyYouHave,
  fixed = false,
  trade = "buy",
}) => {
  const [forexList, setForexList] = useState([]);
  const { mutate: getForexBuyList } = getForexBuyListMutation(
    (res) => {
      const Options = res.data.map((item) => item.currency)
      const temp = countryData.filter((country) => Options.includes(country.code));
      setForexList( temp.map((country) => ({
        value: country.name,
        label: country.name,
        smValue: country.code,
        image: country.flag,
      })));

    },
    (err) => {
      console.log(err);
    }
    
  );
  useEffect(() => {
    getForexBuyList(trade);
  }, [trade]);

  
  

  const options = fixed
    ? forexList
    : [
        {
          value: "INR",
          label: "INR",
          image:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAJDSURBVHja7JfNaxNBGIef2WwalaahhaaYUm1ta4tivViUHqxSRISeBG/SP0vwVPDkTfAiqIh4ED8OORRrFT8qghZrpYkxu9mdmddDYhtFwak4ufQHy+zC7Mwz837MO0pE6KQCOqxdAAVkgFyr9SkDNEKgp7J4+YsEfudXKqCwsNgXAgUJFNlDM36X/+klQCEEclgLOkHiKiBt1qHtu91q8pv3X/vwx35qTw+iGwC5EABrER0hOvazfB2DNQC0ADSkcfPxoUwWbPozgCR1JI08BX8GTBuAWIM0akhS9+eFOtnyjgkRWXH9vx5r3n+oYrAMFvMUunM7CEU1Ge4E/tmrz9x7tMrxyQEA7j95x5HRImemh/5/Ko6TlBt3XnDp/CTfooRKrcHFuQnKz9f4uF7bUSp2MkF5eY2NzYgktdx9vEqlGnNuZoSxA72srdeYPzvuZALnHWikBhGIE009SqnVU+qxBiBqtc4mcClKjo73c/vhW05OlZg9McSF06PMnRrm1oM3TE+V/nqcH3M6A+T3dTE/O8aV62X29+cZKRW4dnOJsYO9DA8WnAEUMJGm6UoYugXExmbE8usNjLEcHu6jVOx2SwNak81mm2E4fnUByQQkrezkrKdu3bsyWYLmUdDMhNoYwjBA8FOgKgXa6m0Aay2Imy/8kwSs0dtOaI1BKZ/VEFjTHgVWUPgjUKjmrm+dhghKKbq79nqDsLINYESE6malE1W5UcAAcAzo9zz5OrCkWneCfKv1qQbwVe1eTjsN8H0AbQf7MRxAQMIAAAAASUVORK5CYII=",
        },
      ];

  const CustomOption = ({ children, ...props }) => {
   
    return (
      <components.Option {...props}>
        <div className="flex gap-5 items-center">
          <img src={props.data.image} /> <div>{children}</div>
        </div>
      </components.Option>
    );
  };
  const CustomSingleValue = ({ children, ...props }) => {
  
    return (
      <components.SingleValue {...props}>
        <div className="flex gap-5 items-center">
          <img src={props?.data?.image} /> <div>{children}</div>
        </div>
      </components.SingleValue>
    );
  };

  return (
    <div className="flex-1 w-[48%] flex flex-col items-start justify-start gap-2 sm:gap-[16px] min-w-[240px] max-w-full text-left text-xl text-text5 font-body-small">
      <div className="self-stretch relative font-semibold text-base ]">
        {currencyYouHave}
      </div>
      <Select
        defaultValue={selectedOption}
        isSearchable={true}
        onChange={setSelectedOption}
        options={options}
        components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
        classNames={{
          container: () =>
            "w-full  text-white !rounded-xl !border-none  rounded-lg bg-gray-100 py-1 sm:py-2 ",
          control: () => "self-stretch !bg-transparent !border-none !mx-2",
          menuList: () => "!bg-midnightblue z-50 py-12 ",
          option: () => "text-white hover:text-midnightblue",
          input: () => "text-white",
          singleValue: () => "!text-white !text-base",
          indicatorSeparator: () => "hidden",
        }}
      />
    </div>
  );
};

export default FrameComponent2;

// import Select from 'react-select';
import countryData from "../../country.json";
import React, { useState } from "react";
// import Dropdown from 'react-dropdown';
import Select from "react-select";

// import "react-dropdown/style.css";

const FrameComponent2 = ({
  selectedOption,
  setSelectedOption,
  currencyYouHave,
  fixed = false,
}) => {
  const fullOptions = countryData.map((country) => ({
    value: country.code,
    label: country.code,
  }));

  const options = fixed ? fullOptions : [{ value: "INR", label: "INR" }];

  return (
    <div className="flex-1 w-[48%] flex flex-col items-start justify-start gap-[16px] min-w-[240px] max-w-full text-left text-xl text-text5 font-body-small">
      <div className="self-stretch relative  font-medium mq450:text-base mq450:leading-[26px]">
        {currencyYouHave}
      </div>
      <Select
        defaultValue={selectedOption}
        isSearchable={true}
        onChange={setSelectedOption}
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
  );
};

export default FrameComponent2;

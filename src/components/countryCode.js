import React from "react";
import Select, { components } from "react-select";
import codeData from "../../country3.json";
import country from "../../country.json";

const getImg = (name) => {
  let Country = country.find((c) => c.country === name)
 
  return Country?.flag;
};

const CustomOption = ({ children, ...props }) => {
  return (
    <components.Option {...props}>
      <div className="flex gap-5 items-center">
        <img src={props.data.icon} /> <div>{children}</div>
      </div>
    </components.Option>
  );
};

const CustomSingleValue = ({ children, ...props }) => {
  
  return (
    <components.SingleValue {...props}>
      <div className="flex gap-2 items-center">
        <img src={props?.data?.icon} /> <div>{children}</div>
      </div>
    </components.SingleValue>
  );
};

let options = codeData.map((d) =>{ 
  const Img = getImg(d.name);
  if (Img) {

   return {
  value: d.dial_code,
  label: `${d.dial_code}`,
  icon: getImg(d.name),
}

  }

});

// remove undefined values
options = options.filter((option) => option);

export default function CountryCode({value,setValue,border="border-2"}) {
  return (
    <div>
      <Select
        options={options}
        placeholder="Select Code"
        classNames={{
            container: () =>
              `w-full min-w-36 text-white !rounded-2xl  border-solid ${border} border-[#000] rounded-lg bg-gray-100 py-1 sm:py-2 `,
            control: () => "self-stretch  !bg-transparent !outline-none !border-none !mx-2",
            menuList: () => "!bg-midnightblue min-w-18",
            menu: () => "bg-midnightblue min-w-18",
            option: () => "text-white hover:text-midnightblue min-w-18",
            input: () => "text-white !outline-none",
            singleValue: () => "!text-black !text-base",
            indicatorSeparator: () => "hidden",
            indicatorsContainer: () => "!p-0",
            dropdownIndicator: () => "!pl-0",
          }}
        components={{
          Option: CustomOption,
          SingleValue: CustomSingleValue
        }}
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

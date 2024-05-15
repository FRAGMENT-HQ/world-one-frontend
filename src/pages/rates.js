import React, { useState, useEffect } from "react";
import CurrencyCard from "../components/currancyCard";
import { getRateCardMutation } from "@/hooks/prod";

function Rates() {
  const [rates, setRates] = useState([]);
  const { mutate: getRateCard } = getRateCardMutation(
    (res) => {
      setRates(res.data);
    },
    (err) => {
      console.log(err);
    }
  );
  useEffect(() => {
    getRateCard();
  }, []);
  return (
    <div className="w-[100vw] min-h-[100vh] flex justify-center bg-[#27357e] py-[5vw]  ">
      <div className=" flex w-[90vw] justify-between gap-[2vw] flex-wrap bg-[#27357e] pt-12 py-[5vw]">
        {rates.map((rate, index) => (
          <CurrencyCard key={index} rate={rate} />
        ))}
      </div>
    </div>
  );
}

export default Rates;

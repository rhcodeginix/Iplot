"use client";
import React from "react";
import MainSection from "./homepage/mainSection";
import HouseCabinMould from "./homepage/houseCabinMould";
import HowItWorks from "./homepage/howItWorks";
import Review from "./homepage/review";
import Advantages from "./homepage/advantages";
import Analysis from "./homepage/analysis";
import LatestFromMedia from "./homepage/latestFromMedia";
import Chatbot from "@/components/Ui/chatbot";
// import ApiUtils from "@/api";

const index = () => {
  return (
    <div className="relative">
      {/* <button
        onClick={() => {
          ApiUtils.callMatrikkelApi();
        }}
      >
        call api
      </button> */}
      <Chatbot />

      <MainSection />
      <HouseCabinMould />
      <HowItWorks />
      <Review />
      <Advantages />
      <Analysis />
      <LatestFromMedia />
    </div>
  );
};

export default index;
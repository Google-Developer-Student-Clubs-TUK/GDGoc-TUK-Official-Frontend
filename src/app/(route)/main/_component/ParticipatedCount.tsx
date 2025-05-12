import Footer from "@/app/_components/_layout/Footer";
import React from "react";
import CountItem from "./CountItem";

const ParticipatedCount = () => {
  return (
    <div className="flex flex-col gap-[60px] items-center">
      <p
        className="text-white text-[40px]"
        style={{ lineHeight: "120%", letterSpacing: "-1px" }}
      >
        How many participated
      </p>
      <div className="flex">
        <CountItem title="함께한 인원" count={125} />
        <CountItem title="프로젝트" count={23} />
        <CountItem title="스터디" count={43} />
        <CountItem title="행사" count={24} />
      </div>
      <Footer />
    </div>
  );
};

export default ParticipatedCount;

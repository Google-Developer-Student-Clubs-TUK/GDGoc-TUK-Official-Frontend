import React from "react";
import CountItem from "./CountItem";

const ParticipatedCount = () => {
  return (
    <div className="items-center bg-gray500 py-[80px]">
      <div className="flex flex-col items-center gap-10 w-full max-w-[1280px] mx-auto px-10">
        <p className="text-white text-[40px] font-allura">How many participated</p>
        <div className="w-full grid grid-cols-4">
          <CountItem title="함께한 인원" count={125} />
          <CountItem title="프로젝트" count={23} />
          <CountItem title="스터디" count={43} />
          <CountItem title="행사" count={24} />
        </div>
      </div>
    </div>
  );
};

export default ParticipatedCount;

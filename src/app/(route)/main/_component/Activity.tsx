import React from "react";
import SpeechBubble from "./SpeechBubble";
import ActivityItem from "./ActivityItem";
import SlideIn from "./SlideIn";

const Activity = () => {
  return (
    <div className="w-screen border border-blue-800">
      <div className="flex flex-col px-[40px] w-full max-w-[1800px] text-white gap-6">
        <div className="w-fit relative">
          <SpeechBubble top={-32} right={-100} rotate={10} text="뭐하나요?"/>
          <p className="text-[40px] font-allura leading-[1.2]"> 
            {" "} What does <br /> Google Developer Groups on Campus do
          </p>
        </div>
        <p className="text-base leading-[1.8]">
          매 학기 각 분야별 스터디를 진행하고 구글 솔루션 챌린지에 참여합니다.
          <br />
          또한, 개발자끼리의 네트워킹을 위해 DevFest와 연합해커톤을 진행합니다.
        </p>
      </div>
      <div className="mt-[60px] flex gap-5 flex-col  items-center">
        <SlideIn direction="left">
          <div className="flex gap-5">
            <ActivityItem
              date="2025.01.24"
              title="2025 연합 해커톤"
              img="/image/main-bg.svg"
            />
            <ActivityItem
              date="2025.01.24"
              title="2025 연합 해커톤"
              img="/image/main-bg.svg"
            />
            <ActivityItem
              date="2025.01.24"
              title="2025 연합 해커톤"
              img="/image/main-bg.svg"
            />
          </div>
        </SlideIn>
        <SlideIn direction="right">
          <div className="flex gap-5">
            <ActivityItem
              date="2025.01.24"
              title="2025 연합 해커톤"
              img="/image/main-bg.svg"
            />
            <ActivityItem
              date="2025.01.24"
              title="2025 연합 해커톤"
              img="/image/main-bg.svg"
            />
            <ActivityItem
              date="2025.01.24"
              title="2025 연합 해커톤"
              img="/image/main-bg.svg"
            />
          </div>
        </SlideIn>
        {/* 스크롤시 좌우 등장하는 활동 아이템들 */}
      </div>
    </div>
  );
};

export default Activity;

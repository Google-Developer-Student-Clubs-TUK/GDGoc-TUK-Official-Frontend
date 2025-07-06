import React from "react";
import SpeechBubble from "./SpeechBubble";
import ActivityItem from "./ActivityItem";
import SlideIn from "./SlideIn";

const Activity = () => {
  return (
    <div className="w-screen py-[200px]">
      <div className="flex flex-col px-[40px] w-full max-w-[1800px] text-white gap-6">
        <div className="w-fit relative">
          <SpeechBubble top={-20} left={376} rotate={10} text="뭐하나요?"/>
          <p className="text-[40px] font-serifKR leading-[1.2]"> 
            {" "} What does <br /> Google Developer Groups on Campus do?
          </p>
        </div>

        <p className="text-base leading-[1.8] text-gray200">
          매 학기 각 분야별 스터디를 진행하고 구글 솔루션 챌린지에 참여합니다.
          <br />
          또한, 개발자끼리의 네트워킹을 위해 DevFest와 연합해커톤을 진행합니다.
        </p>
      </div>

      {/* 활동 갤러리 */}
      <div className="mt-[60px] flex gap-5 flex-col items-center">
        <SlideIn direction="left">
          <div className="w-full grid grid-cols-3 gap-5">
            <ActivityItem
              title="2024년 GDSC 16개교 연합해커톤"
              img="/image/main-activity-1.png"
            />
            <ActivityItem
              title="Devfest 2023"
              img="/image/main-activity-2.png"
            />
            <ActivityItem
              title="GDSC TUK 스터디 성과 공유"
              img="/image/main-activity-3.jpeg"
            />
          </div>
        </SlideIn>
        <SlideIn direction="right">
          <div className="w-full grid grid-cols-3 gap-5">
            <ActivityItem
              title="타 대학 GDSC 연합 MT"
              img="/image/main-activity-4.jpeg"
            />
            <ActivityItem
              title="GDSC TUK 엠티"
              img="/image/main-activity-5.jpeg"
            />
            <ActivityItem
              title="2023 GDSC KR Winter Cup"
              img="/image/main-activity-6.jpeg"
            />
          </div>
        </SlideIn>
        {/* 스크롤시 좌우 등장하는 활동 아이템들 */}
      </div>
    </div>
  );
};

export default Activity;

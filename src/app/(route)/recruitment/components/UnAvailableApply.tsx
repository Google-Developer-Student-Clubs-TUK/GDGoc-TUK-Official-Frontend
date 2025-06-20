// 지원 가능 기간 콘텐츠
import React from "react";

const UnAvailableApply = ({ userRole }: { userRole: boolean }) => {
  return (
    <div className="relative w-1/2 flex flex-col pr-10 justify-center items-center bg-[url('/image/recruitment-bg.png')] bg-cover bg-center grayscale">
      <div
        id="overlay"
        className="absolute z-0 top-0 left-0 h-full w-full bg-gradient-to-r from-[#2E2E2E] via-[#2E2E2E90] to-[#2E2E2E] cursor-pointer"
      ></div>

      <div className="z-10 relative overflow-hidden cursor-pointer">
        <p className="text-ttMd font-bold text-white">
          {userRole ? "현재 모집중입니다!" : "지원기간이 아닙니다!"}
        </p>
      </div>
    </div>
  );
};

export default UnAvailableApply;

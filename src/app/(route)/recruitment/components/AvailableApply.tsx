// 지원 가능 기간 콘텐츠
import React from "react";
import Image from "next/image";

const AvailableApply = () => {
  return (
    <div className="relative w-1/2 flex flex-col justify-center items-center bg-[url('/image/recruitment-bg.png')] bg-cover bg-center group">
      <div id="overlay" className="absolute z-0 top-0 left-0 h-full w-full bg-gradient-to-r from-[#2E2E2E] to-[#2E2E2E50] cursor-pointer"></div>

      <div className="z-10 relative overflow-hidden cursor-pointer">
        <div className="absolute inset-0 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />

        <div className="relative z-10 flex items-center gap-2 text-white pl-2 pr-1 py-1">
          <p className="text-ttMd font-bold">지원하기</p>
          <Image src="/icon/slideup_arrow.svg" alt="화살표" width={20} height={20} className="object-contain rotate-90 h-fit" />
        </div>
      </div>
    </div>
  );
};

export default AvailableApply;

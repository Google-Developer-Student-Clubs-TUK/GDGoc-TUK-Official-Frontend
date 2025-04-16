import React from "react";
import Image from "next/image";

const Recruitment = () => {

  return (
    <div className="flex pl-[100px] h-screen">

      {/* Left */}
      <div className="w-1/2 flex flex-col justify-center gap-12">

        {/* Title */}
        <div className="text-white flex flex-col gap-2">
          <h1 className="text-ttLg font-bold">GDGoC TUK와 함께 할 멤버를 모집합니다!</h1>
          <p className="text-tMd text-gray200">한국공학대학교 학생, 그리고 열정적인 개발자 및 디자이너라면 누구나 지원 가능합니다.</p>
        </div>

        <div className="flex flex-col gap-10">
          {/* 오거나이저 */}
          <div className="text-white flex gap-6">
            <div className="bg-point w-[108px] h-fit py-1 px-4 rounded-[4px] text-center">오거나이저</div>
            <div className="flex flex-col gap-3 mt-1">
              <p className="text-tMd">GDGoC를 운영하는 운영진으로서 각종 행사 업무들을 담당합니다.</p>
              <div className="flex gap-2">
                <p className="text-tSm font-bold text-[#FFBA00]">참고사항</p>
                <p className="text-tSm">서류평가 후 대면 면접이 있을수도 있습니다.</p>
              </div>
            </div>
          </div>

          {/* 일반 멤버 */}
          <div className="text-white flex gap-6">
            <div className="bg-point w-[108px] h-fit py-1 px-4 rounded-[4px] text-center">일반멤버</div>
            <p className="text-tMd mt-1">GDGoC에 참가하는 멤버로 프로젝트와 각종 행사에 참여합니다.</p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="relative w-1/2 flex flex-col justify-center items-center bg-[url('/image/recruitment-bg.png')] bg-cover bg-center group">
        <div id="overlay" className="absolute z-0 top-0 left-0 h-full w-full bg-gradient-to-r from-[#2E2E2E] to-[#2E2E2E50] cursor-pointer"></div>

        <div className="z-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />

          <div className="relative z-10 flex items-center gap-2 text-white px-2 py-1">
            <p className="text-ttMd font-bold">지원하기</p>
            <Image src="/icon/slideup_arrow.svg" alt="화살표" width={20} height={20} className="object-contain rotate-90 h-fit"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recruitment;
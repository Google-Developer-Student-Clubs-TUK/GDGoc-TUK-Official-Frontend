"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Header from "@/app/_components/_layout/Header";
import AvailableApply from "./components/AvailableApply";
import UnAvailableApply from "./components/UnAvailableApply";
import SetPeriod from "./components/SetPeriod";
import { recruitmentsStatusApi } from "./_api";
import { useLeaderCheck } from "@/app/_hook/useLeaderCheck";

const Recruitment = () => {
  const [isAvailable, setIsAvailable] = useState(false); // 지원 가능 여부.

  // const { isLeader } = useLeaderCheck();
  const isLeader = true;
  // 질문 get
  const { data } = useQuery({
    queryKey: ["recruitmentsStatus"],
    queryFn: () => recruitmentsStatusApi(),
  });

  // 질문 가져온 data 저장
  useEffect(() => {
    if (data) {
      console.log(data.data.isOpen);
      setIsAvailable(data.data.isOpen);
    }
  }, [data]);

  return (
    <div className="flex h-screen">
      <Header />

      {/* Left */}
      <div className="flex w-full max-w-[1800px] mx-auto px-10">
        <div className="w-1/2 flex flex-col justify-center gap-12">
          {/* Title */}
          <div className="text-white flex flex-col gap-2">
            <h1 className="text-ttLg font-bold">
              GDGoC TUK와 함께 할 멤버를 모집합니다!
            </h1>
            <p className="text-tMd text-gray200">
              한국공학대학교 학생, 그리고 열정적인 개발자 혹은 디자이너와
              기획자라면 누구나 지원 가능합니다.
            </p>
          </div>
          <div className="flex flex-col gap-10">
            {/* 오거나이저 */}
            <div className="text-white flex gap-6">
              <div className="bg-point w-[108px] h-fit py-1 px-4 rounded-[4px] text-center">
                오거나이저
              </div>
              <div className="flex flex-col gap-3 mt-1">
                <p className="text-tMd">
                  GDGoC를 운영하는 운영진으로서 각종 행사 업무들을 담당합니다.
                </p>
                <div className="flex gap-2 text-tSm">
                  <p className="font-bold text-[#FFBA00]">참고사항</p>
                  <p>서류평가 후 대면 면접이 있을수도 있습니다.</p>
                </div>
              </div>
            </div>
            {/* 일반 멤버 */}
            <div className="text-white flex gap-6">
              <div className="bg-point w-[108px] h-fit py-1 px-4 rounded-[4px] text-center">
                일반멤버
              </div>
              <p className="text-tMd mt-1">
                GDGoC에 참가하는 멤버로 프로젝트와 각종 행사에 참여합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        {isLeader ? (
          isAvailable ? (
            <UnAvailableApply userRole={isLeader} />
          ) : (
            <SetPeriod />
          )
        ) : isAvailable ? (
          <AvailableApply />
        ) : (
          <UnAvailableApply userRole={isLeader} />
        )}
      </div>
    </div>
  );
};

export default Recruitment;

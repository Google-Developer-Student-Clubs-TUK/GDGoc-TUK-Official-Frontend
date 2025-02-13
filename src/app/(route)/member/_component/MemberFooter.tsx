"use client";
import React from "react";
import styled, { keyframes } from "styled-components";

const MemberFooter = ({ scroller }: { scroller: boolean }) => {
  return (
    <div className=" fixed bottom-0 z-50 px-[100px] py-[60px] w-full flex  items-baseline justify-between">
      <p className="text-xl text-[#767676]">2025</p>
      {scroller && (
        <div className="w-[26px] relative h-11 pt-2 rounded-[19px] border border-white  ">
          <Scroller />
        </div>
      )}

      <p className=" text-xl  text-[#767676]">3RD</p>
    </div>
  );
};

export default MemberFooter;

// @keyframes 애니메이션
const scrollAnimation = keyframes`
  0% { opacity: 0; }
  10% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(8px); opacity: 0; }
`;

const Scroller = styled.span`
  width: 2px;
  height: 12px;
  border-radius: 999px;
  position: absolute;
  left: 45%;
  background-color: #fff;
  animation: ${scrollAnimation} 1.5s ease-in-out
    //@keyframes scroll 적용// 애니메이션 지속 시간 // 애니메이션 속도 조절
    infinite; /* 무한 반복 */
`;

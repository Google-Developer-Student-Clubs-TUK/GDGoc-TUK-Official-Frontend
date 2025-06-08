import { setOpacityDown, setScaleDown } from "@/app/_utils/scrollUtils";
import React from "react";
import styled from "styled-components";

const Title = ({ scrollY }: { scrollY: number }) => {

  return (
    <TitleContainer
      scale={setScaleDown(scrollY)}
      opacity={setOpacityDown(scrollY)}
    >
      <div className="flex flex-col gap-2 items-center text-white">
        <p className="text-base font-light">GDG on Campus 한국공학대학교에 오신 것을 환영합니다</p>
        <h1 className="text-[60px] font-allura text-center leading-[1.2]">
          Google Developer Groups <br />
          on Campus Tech University of Korea
        </h1>
      </div>
      <div className="flex px-6 py-3 items-center justify-center mt-12 text-base text-white border border-white rounded-xl cursor-pointer hover:bg-white hover:text-bg duration-300">
        지원하기
      </div>
    </TitleContainer>
  );
};

export default Title;

interface TitleProps {
  scale: number;
  opacity: number;
}

const TitleContainer = styled.div<TitleProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  transform: scale(${(props) => props.scale});
  opacity: ${(props) => props.opacity};
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
`;
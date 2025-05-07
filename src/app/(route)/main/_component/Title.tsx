import { setOpacityDown, setScaleDown } from "@/app/_utils/scrollUtils";
import React from "react";
import styled from "styled-components";

const Title = ({ scrollY }: { scrollY: number }) => {
  return (
    <TitleContainer
      scale={setScaleDown(scrollY)}
      opacity={setOpacityDown(scrollY)}
    >
      <p className="text-base font-normal text-white mb-2">
        GDG on Campus 한국공학대학교에 오신 것을 환영합니다
      </p>

      <h1
        className="text-6xl font-normal text-white text-center"
        style={{ lineHeight: "120%", letterSpacing: "-1.5px" }}
      >
        Google Developer Groups <br />
        on Campus Tech University of Korea
      </h1>
      <div className="  mt-12 cursor-pointer hover:bg-white   hover:text-bg duration-300 text-base text-white font-normal flex px-6 py-3 items-center justify-center border border-white  rounded-xl">
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
  position: absolute;
  transform: scale(${(props) => props.scale});
  opacity: ${(props) => props.opacity};
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
`;

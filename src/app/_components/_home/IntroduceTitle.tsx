"use client";

import React from "react";
import styled from "styled-components";
import MemberList from "./MemberList";
import { setOpacityUp, setScaleUp } from "@/app/_utils/scrollUtils";

const IntroduceTitle = ({
  scrollY,
  isBottom,
}: {
  scrollY: number;
  isBottom: boolean;
}) => {
  return (
    <div className="z-10">
      <IntroduceTitleContainer
        scale={setScaleUp(scrollY)}
        opacity={setOpacityUp(scrollY)}
        move={isBottom.toString()}
      >
        <p className="text-3xl text-white">Google Developer Groups On Campus</p>
        <p className="text-3xl text-white">
          <span className="font-bold">Tech University of Korea</span>의 멤버들을
          소개합니다.
        </p>
        {isBottom && <MemberList />}
      </IntroduceTitleContainer>
    </div>
  );
};

export default IntroduceTitle;

interface TitleProps {
  scale: number;
  opacity: number;
  move: string;
}

const IntroduceTitleContainer = styled.div<TitleProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: ${({ scale, move }) =>
    move === "true" ? `scale(1) translateY(-70px)` : `scale(${scale})`};
  opacity: ${({ opacity }) => opacity};
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
`;

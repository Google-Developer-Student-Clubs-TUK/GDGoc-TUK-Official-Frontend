"use client";
import { setOpacityDown, setScaleDown } from "@/app/_utils/scrollUtils";
import React from "react";
import styled, { keyframes } from "styled-components";

const Title = ({ scrollY }: { scrollY: number }) => {
  return (
    <TitleContainer
      scale={setScaleDown(scrollY)}
      opacity={setOpacityDown(scrollY)}
    >
      <p className="text-4xl text-white">Google Developer Groups On Campus</p>
      <p className="text-4xl text-white">
        <Highlight>Tech University of Korea</Highlight> 에는 누가 함께하나요?
      </p>
    </TitleContainer>
  );
};

export default Title;
interface TitleProps {
  scale: number;
  opacity: number;
}

const highlight = keyframes`
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
`;

const TitleContainer = styled.div<TitleProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  z-index: 10;
  position: absolute;
  transform: scale(${(props) => props.scale});
  opacity: ${(props) => props.opacity};
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
`;

const Highlight = styled.span`
  font-weight: 700;
  padding: 4px 8px;
  position: relative;
  opacity: 1;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: var(--primary);
    z-index: -1;

    transform: scaleX(0);
    transform-origin: left;

    animation: ${highlight} 1s ease-in forwards;
    animation-delay: 0.5s;
  }
`;

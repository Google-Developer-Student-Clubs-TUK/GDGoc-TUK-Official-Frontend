"use client";
import React from "react";
import styled, { keyframes } from "styled-components";

const Title = () => {
  return (
    <TitleContainer>
      <p className="text-4xl text-white">Google Developer Groups On Campus</p>
      <p className="text-4xl text-white">
        <Highlight>Tech University of Korea</Highlight> 에는 누가 함께하나요?
      </p>
    </TitleContainer>
  );
};

export default Title;

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const highlight = keyframes`
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  animation: ${fadeInUp} 1s ease-in forwards;
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

    /* 타이틀 올라오고 형광펜 애니메이션 실행 */
    animation: ${highlight} 1s ease-out forwards;
    animation-delay: 1s;
  }
`;

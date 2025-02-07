"use client";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";

const Title = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      console.log("스크롤 위치:", window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scaleTitle = Math.max(1 - scrollY * 0.002, 0.5); // 최소 0.5까지 축소
  const opacityTitle = Math.max(1 - scrollY * 0.002, 0); // 최소 0까지 감소

  const scaleIntroduceTitle = Math.min((scrollY - 300) * 0.002, 1); // 최소 0.5까지 축소
  const opacityIntroduceTitle = Math.min((scrollY - 300) * 0.002, 1); // 최소 0까지 감소

  return (
    <div>
      <div className="w-[100%] h-screen fixed top-0  flex justify-center items-center">
        <Image
          src="/image/people-bg.webp"
          alt="Background"
          className="object-cover"
          fill
        />

        <Background />
        <TitleContainer scale={scaleTitle} opacity={opacityTitle}>
          <p className="text-4xl text-white">
            Google Developer Groups On Campus
          </p>
          <p className="text-4xl text-white">
            <Highlight>Tech University of Korea</Highlight> 에는 누가
            함께하나요?
          </p>
        </TitleContainer>
        <IntroduceTitleContainer
          scale={scaleIntroduceTitle}
          opacity={opacityIntroduceTitle}
        >
          <p className="text-3xl text-white">
            Google Developer Groups On Campus
          </p>
          <p className="text-3xl text-white">
            <span className="font-bold">Tech University of Korea</span>의
            멤버들을 소개합니다.
          </p>
        </IntroduceTitleContainer>
      </div>
      <div></div>
    </div>
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

const Background = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(270deg, rgba(46, 46, 46, 0.8) 0%, #2e2e2e 73.67%);
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

const IntroduceTitleContainer = styled.div<TitleProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  transform: scale(${(props) => props.scale});
  opacity: ${(props) => props.opacity};
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
`;

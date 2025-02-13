"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Title from "./_components/_home/Title";
import Header from "./_components/_layout/Header";
import HomeFooter from "./_components/_layout/HomeFooter";
import IntroduceTitle from "./_components/_home/IntroduceTitle";
import { calculateAdjustedScroll, setOpacityDown } from "./_utils/scrollUtils";
import MemberList from "./_components/_home/MemberList";

export default function Home() {
  // 타이틀 , 소개타이틀
  const sections = [Title, IntroduceTitle];
  const [sectionIndex, setSectionIndex] = useState(0);

  const [adjustedScroll, setAdjustedScroll] = useState(0);

  // 스크롤 Y 위치
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // 브라우저의 현재 보이는 화면 높이
      const windowHeight = window.innerHeight;

      // 스크롤시 현재 스크롤 위치 업데이트
      const newScrollY = window.scrollY;

      setScrollY(newScrollY);

      // 스크롤 위치를 화면 높이로 나눔 -> 현재 section 계산
      const section = Math.min(
        Math.floor(newScrollY / windowHeight),
        sections.length - 1
      );
      setSectionIndex(section);

      setAdjustedScroll(
        calculateAdjustedScroll(
          newScrollY,
          section !== 0 ? windowHeight * section : 0
        )
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const CurrentSection = sections[sectionIndex];

  return (
    <div>
      <Header bg={sectionIndex === 0 ? false : true} />
      <Background
        opacity={setOpacityDown(scrollY)}
        img="/image/people-bg.webp"
      />
      <div className="h-[400vh]">
        <div className="z-10 sticky top-0 h-screen flex justify-center items-center">
          <CurrentSection scrollY={adjustedScroll} />
        </div>
      </div>

      <MemberList />
      <HomeFooter scroller={scrollY === 0 ? true : false} />
    </div>
  );
}

const Background = styled.div<{ img: string; opacity: number }>`
  position: fixed;
  inset: 0;
  z-index: 1;
  opacity: ${(props) => props.opacity};
  background-image: linear-gradient(
      270deg,
      rgba(46, 46, 46, 0.8) 0%,
      #2e2e2e 73.67%
    ),
    url(${(props) => props.img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

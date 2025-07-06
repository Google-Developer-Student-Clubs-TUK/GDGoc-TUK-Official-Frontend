"use client";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import SpeechBubble from "./SpeechBubble";

interface TitleProps {
  scale: number;
  opacity: number;
  scrollY: number;
}

const IntroduceTitle = ({ opacity, scale, scrollY }: TitleProps) => {
  return (
    <IntroduceTitleContainer>
      <LogoImageLeft
        src="/icon/main/gdgoc.png"
        alt="위로고"
        width={161}
        height={84}
        style={{
          transform: `translateX(${scrollY * -0.1}px) rotate(-15deg)`,
        }}
      />

      <LogoImageRight
        src="/icon/main/gdgoc.png"
        alt="아래로고"
        width={344}
        height={180}
        style={{
          transform: `translateX(${scrollY * 0.1}px) rotate(24deg)`,
        }}
      />

      <TitleTextContainer scale={scale} opacity={opacity}>
        <div className="relative">
          <p className="text-[40px] font-serifKR text-center">
            What is <br /> Google Developer Groups on Campus?
          </p>
          <SpeechBubble
            top={-24}
            left={60}
            rotate={-10}
            highlightText="잠깐!"
            text="이게 뭔데요?"
          />
          {/* <Image src="/icon/main/main_bubble_what.png" alt="what" width={180} height={80} className="absolute top-[-40px] left-[60px] object-cover" /> */}
        </div>

        <div className="flex flex-col gap-4 text-center text-base leading-[1.8] text-gray200">
          <p>
            GDG on Campus는 전 세계 대학의 개발자 지망생에게 실무 경험을 쌓고,{" "}
            <br />
            필수 기술을 개발하며, 기술 분야의 커리어를 위한 탄탄한 기반을 다질ß
            수 있는 학습 기회를 제공합니다.
          </p>
          <p>
            졸업 후 GDG on Campus 회원은 더 큰 GDG 커뮤니티로 원활하게 전환하여{" "}
            <br />
            동료 개발자와 학습 및 공동작업을 계속할 수 있습니다.
          </p>
        </div>
      </TitleTextContainer>
    </IntroduceTitleContainer>
  );
};

export default IntroduceTitle;

const IntroduceTitleContainer = styled.div`
  width: 100vw;
  height: 150vh;
  position: relative;
`;

const TitleTextContainer = styled.div<TitleProps>`
  width: 100%;
  height: 100%;
  max-width: 1800px;
  padding: 0 40px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;

  color: white;
  opacity: ${({ opacity }) => opacity};
  transform: scale(${({ scale }) => scale});
  transition: transform 0.2s ease-out;
`;

const LogoImageLeft = styled(Image)`
  position: absolute;
  top: 240px;
  left: 220px;
  min-width: 161px;
  min-height: 84px;
  object-fit: contain;
  transition: transform 0.2s ease-out;
`;

const LogoImageRight = styled(Image)`
  position: absolute;
  bottom: 120px;
  right: 80px;
  min-width: 344px;
  min-height: 180px;
  object-fit: contain;
  transition: transform 0.2s ease-out;
`;

import React from "react";
import styled, { keyframes } from "styled-components";
import SpeechBubble from "./SpeechBubble";
import Image from "next/image";
const IntroduceTitle = ({ scrollY }: { scrollY: number }) => {
  return (
    <IntroduceTitleContainer>
      <SpeechBubble
        top={-100}
        left={-40}
        rotate={-10}
        text="이게 뭔데요?"
        highlightText="잠깐!"
      />
      <LogoImageLeft
        src="/icon/main/gdgoc.png"
        alt="위로고"
        width={161}
        height={84}
        style={{
          transform: `translateX(${scrollY * -0.1}px)`,
        }}
      />

      <LogoImageRight
        src="/icon/main/gdgoc.png"
        alt="아래로고"
        width={344}
        height={180}
        style={{
          transform: `translateX(${scrollY * 0.1}px)`,
        }}
      />

      <TitleTextContainer>
        <p className=" text-5xl font-normal text-center text-white">
          What is <br /> Google Developer Groups on Campus
        </p>

        <div
          className="grid gap-4 mt-6 text-center text-base font-normal  text-white"
          style={{ lineHeight: "180%", letterSpacing: "-0.4px" }}
        >
          <p>
            GDG on Campus는 전 세계 대학의 개발자 지망생에게 실무 경험을 쌓고,{" "}
            <br />
            필수 기술을 개발하며, 기술 분야의 커리어를 위한 탄탄한 기반을 다질
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

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: none
  }
`;

const IntroduceTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
`;

const TitleTextContainer = styled.div`
  animation: ${fadeIn} 1s ease-in;
`;

const LogoImageLeft = styled(Image)`
  position: absolute;
  top: -160px;
  left: -140px;
  min-width: 161px;
  min-height: 84px;
  object-fit: contain;
  transition: transform 0.2s ease-out;
`;

const LogoImageRight = styled(Image)`
  position: absolute;
  top: 240px;
  right: -160px;
  min-width: 344px;
  min-height: 180px;
  object-fit: contain;
  transform: rotate(35deg);
  transition: transform 0.2s ease-out;
`;

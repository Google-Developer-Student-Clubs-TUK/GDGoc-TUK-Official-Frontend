import React from "react";
import styled from "styled-components";
import SpeechBubble from "./SpeechBubble";

const IntroduceTitle = () => {
  return (
    <IntroduceTitleContainer>
      <p className=" text-5xl font-normal text-center text-white">
        What is <br /> Google Developer Groups on Campus
      </p>
      <SpeechBubble
        top={-100}
        left={-40}
        rotate={-10}
        text="이게 뭔데요?"
        highlightText="잠깐!"
      />
      <div
        className="grid gap-4 mt-6 text-center text-base font-normal  text-white"
        style={{ lineHeight: "180%", letterSpacing: "-0.4px" }}
      >
        <p>
          GDG on Campus는 전 세계 대학의 개발자 지망생에게 실무 경험을 쌓고,{" "}
          <br />
          필수 기술을 개발하며, 기술 분야의 커리어를 위한 탄탄한 기반을 다질 수
          있는 학습 기회를 제공합니다.
        </p>
        <p>
          졸업 후 GDG on Campus 회원은 더 큰 GDG 커뮤니티로 원활하게 전환하여{" "}
          <br />
          동료 개발자와 학습 및 공동작업을 계속할 수 있습니다.
        </p>
      </div>
    </IntroduceTitleContainer>
  );
};

export default IntroduceTitle;

const IntroduceTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
`;

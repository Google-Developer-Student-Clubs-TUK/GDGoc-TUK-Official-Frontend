import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useLeaderCheck } from "@/app/_hook/useLeaderCheck";

const Title = () => {
  const [animate, setAnimate] = useState(false);
  const isLeader = useLeaderCheck();
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TitleWrap>
      <TitleContainer scale={animate ? 1 : 0} opacity={animate ? 1 : 0}>
        <div className="flex flex-col items-center text-white">
          <p className="text-base">
            GDG on Campus 한국공학대학교에 오신 것을 환영합니다
          </p>
          <h1 className="text-[40px] font-serifKR font-bold text-center">
            Google Developer Groups on Campus
            <br />
            Tech University of Korea
          </h1>
        </div>
        <Link
          href={`/apply${isLeader ? "/admin" : ""}`}
          className="flex px-6 py-3 items-center justify-center mt-12 text-base text-white border border-white rounded-xl cursor-pointer hover:bg-white hover:text-bg duration-300"
        >
          {`${isLeader ? "지원서 수정하기" : "지원하기"}`}
        </Link>
      </TitleContainer>
    </TitleWrap>
  );
};

export default Title;

interface TitleProps {
  scale: number;
  opacity: number;
}

const TitleWrap = styled.div`
  width: 100vw;
  height: 100vh;

  background-image: url("/image/main-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const TitleContainer = styled.div<TitleProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  margin: 0 auto;
  max-width: 1800px;
  padding: 0 40px;

  transform: scale(${(props) => props.scale});
  opacity: ${(props) => props.opacity};

  transition: transform 1s ease-in-out, opacity 1s ease-in-out;
`;

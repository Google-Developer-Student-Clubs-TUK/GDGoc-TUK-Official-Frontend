"use client";
import Header from "../../_components/_layout/Header";
import { useScrollSection } from "@/app/_hook/useScrollSection";
import { setOpacityUp, setScaleUp } from "@/app/_utils/scrollUtils";

import Title from "./_component/Title";
import IntroduceTitle from "./_component/IntroduceTitle";
import Activity from "./_component/Activity";
import ParticipatedCount from "./_component/ParticipatedCount";
import Footer from "@/app/_components/_layout/Footer";

const Main = () => {
  const { scrollY } = useScrollSection([IntroduceTitle]);

  return (
    <div className="overflow-hidden">
      <Header />
      {/** 스크롤 시 헤더 유지 제거
       * @comment : sectionIndex 변경 시 헤더 숨김처리를 헤더를 계속 보여주기 위해 제거
       * @code : {sectionIndex === 0 && <Header />}
       */}

      {/** Title 배경요소
       * @comment : 메인페이지 하부에서 백그라운드 zIndex문제로 Title 컴포넌트로 이동
       * @code : <Background main={true} opacity={setOpacityDown(scrollY)} img="/image/main-bg.svg" />
       */}

      <Title />
      <IntroduceTitle
        scrollY={scrollY}
        opacity={setOpacityUp(scrollY)}
        scale={setScaleUp(scrollY)}
      />
      <Activity />
      <ParticipatedCount />
      <Footer />
    </div>
  );
};

export default Main;

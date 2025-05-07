"use client";
import Header from "../../_components/_layout/Header";
import Background from "../../_components/_layout/Background";
import { setOpacityDown } from "@/app/_utils/scrollUtils";
import { useScrollSection } from "@/app/_hook/useScrollSection";
import Title from "./_component/Title";
import IntroduceTitle from "./_component/IntroduceTitle";
import Activity from "./_component/Activity";
import ParticipatedCount from "./_component/ParticipatedCount";

const Main = () => {
  const sections = [Title, IntroduceTitle];
  const { scrollY, sectionIndex, adjustedScroll, CurrentSection } =
    useScrollSection(sections);

  return (
    <div>
      <Header />
      <Background
        main={true}
        opacity={setOpacityDown(scrollY)}
        img="/image/main-bg.svg"
      />

      <div className="h-[400vh]">
        <div className="z-10 sticky top-0 h-screen flex justify-center items-center">
          <CurrentSection scrollY={adjustedScroll} />
        </div>
      </div>

      <Activity />
      <ParticipatedCount />
    </div>
  );
};

export default Main;

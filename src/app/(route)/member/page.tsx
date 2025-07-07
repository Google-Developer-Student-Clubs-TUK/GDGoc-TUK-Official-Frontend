"use client";

import React, { useEffect, useState } from "react";
import Title from "./_component/Title";
import IntroduceTitle from "./_component/IntroduceTitle";
import { setOpacityDown } from "@/app/_utils/scrollUtils";
import Header from "@/app/_components/_layout/Header";
import MemberFooter from "./_component/MemberFooter";
import MemberList from "./_component/MemberList";
import { useQuery } from "@tanstack/react-query";
import { generationsApi } from "./_api";
import Background from "@/app/_components/_layout/Background";
import { useScrollSection } from "@/app/_hook/useScrollSection";

export default function Member() {
  const [generations, setGenerations] = useState<string[]>([]);

  // 타이틀 , 소개타이틀
  const sections = [Title, IntroduceTitle];
  const { scrollY, sectionIndex, adjustedScroll, CurrentSection } =
    useScrollSection(sections);

  // api
  const { data } = useQuery({
    queryKey: ["generations"],
    queryFn: () => generationsApi(),
  });

  useEffect(() => {
    if (data) {
      setGenerations(data.data.generations);
    }
  }, [data]);

  return (
    <div>
      <Header bg={sectionIndex === 0 ? false : true} />
      <Background
        opacity={setOpacityDown(scrollY)}
        img="/images/people-bg.webp"
      />
      <div className="h-[400vh]">
        <div className="z-10 sticky top-0 h-screen flex justify-center items-center">
          {CurrentSection && <CurrentSection scrollY={adjustedScroll} />}
        </div>
      </div>

      <MemberList generations={generations} />
      <MemberFooter scroller={scrollY === 0 ? true : false} />
    </div>
  );
}

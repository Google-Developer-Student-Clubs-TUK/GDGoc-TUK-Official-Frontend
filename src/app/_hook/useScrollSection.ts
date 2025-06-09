import { useEffect, useState } from "react";
import { calculateAdjustedScroll } from "../_utils/scrollUtils";

// 공통 스크롤 섹션 로직을 훅으로 분리
export const useScrollSection = <T extends React.ElementType>(sections: T[]) => {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [adjustedScroll, setAdjustedScroll] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const newScrollY = window.scrollY;

      setScrollY(newScrollY);

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
  }, [sections.length]);

  const CurrentSection = sections[sectionIndex];

  return {
    scrollY,
    sectionIndex,
    adjustedScroll,
    CurrentSection,
  };
};

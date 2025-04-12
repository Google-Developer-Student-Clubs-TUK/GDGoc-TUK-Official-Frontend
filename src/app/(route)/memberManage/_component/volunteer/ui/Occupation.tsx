// 지원자 직군 분류 컴포넌트
import React from "react";

interface OccupationProps {
  occupation: string;
}

const Occupation = ({
  occupation,
}: OccupationProps) => {

  return <div className="px-4 pt-[6px] pb-1 rounded text-tSm bg-gray500">{occupation}</div>
};

export default Occupation;

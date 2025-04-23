// 지원자 오거나이저/일반멤버 분류 컴포넌트
import React from "react";

interface ClassificationProps {
  classification: "오거나이저" | "일반멤버" | null;
}

const Classification = ({ classification }: ClassificationProps) => {
  return (
    <div className="px-4 pt-[6px] pb-1 rounded text-tSm bg-point">
      {classification ? classification : "일반멤버"}
    </div>
  );
};

export default Classification;

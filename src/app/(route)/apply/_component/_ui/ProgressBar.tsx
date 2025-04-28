import React from "react";

interface ProgressBarProps {
  currentPage: number;
  totalPage: number;
}

const ProgressBar = ({ currentPage, totalPage }: ProgressBarProps) => {
  const step = 100 / (totalPage + 1); // 페이지 수 기준
  const left = step * currentPage;

  return (
    <div className="w-full h-1 bg-gray300 mt-20 rounded-full relative overflow-hidden">
      <div
        className="h-full bg-point rounded-full absolute transition-all duration-500"
        style={{
          width: `${step}%`,
          left: `${left}%`,
        }}
      />
    </div>
  );
};

export default ProgressBar;

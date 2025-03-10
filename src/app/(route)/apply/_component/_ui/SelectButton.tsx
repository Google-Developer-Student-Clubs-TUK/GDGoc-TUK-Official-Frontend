import React from "react";

interface SelectButtonProps {
  width?: string;
  title: string;
}

const SelectButton = ({ width = "100%", title }: SelectButtonProps) => {
  return (
    <div
      className="px-4 py-3 flex-shrink-0 text-white text-base cursor-pointer font-normal hover:bg-point items-center justify-center rounded-xl bg-areaBg"
      style={{ width: width }}
    >
      {title}
    </div>
  );
};

export default SelectButton;

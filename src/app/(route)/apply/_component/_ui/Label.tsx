import React from "react";

interface LabelProps {
  title: string;
  require?: boolean;
}

const Label = ({ title, require = false }: LabelProps) => {
  return (
    <div className="ml-1 flex items-center gap-3">
      <p className="text-white font-bold text-lg ">{title}</p>
      {require && (
        <span className=" text-sm font-normal text-[#FFBA00] ">* 필수</span>
      )}
    </div>
  );
};

export default Label;

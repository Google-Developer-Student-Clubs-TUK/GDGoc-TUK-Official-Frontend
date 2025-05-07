import React from "react";

interface CountItmeProps {
  title: string;
  count: number;
}
const CountItem = ({ title, count }: CountItmeProps) => {
  return (
    <div className="flex  text-white flex-col gap-2 w-[285px] items-center">
      <p className="text-base">{title}</p>
      <p className=" text-6xl font-bold">{count}</p>
    </div>
  );
};

export default CountItem;

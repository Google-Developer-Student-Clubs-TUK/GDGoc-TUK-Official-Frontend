import React from "react";
import { useCountUp } from "../_hook/useCountUp";
import { useInView } from "react-intersection-observer";

interface CountItemProps {
  title: string;
  count: number;
}

const CountItem = ({ title, count }: CountItemProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const countUp = useCountUp({ target: count, start: inView });

  return (
    <div
      ref={ref}
      className="flex text-white flex-col gap-2 w-[285px] items-center"
    >
      <p className="text-base">{title}</p>
      <p className="text-6xl font-bold">{countUp}</p>
    </div>
  );
};

export default CountItem;

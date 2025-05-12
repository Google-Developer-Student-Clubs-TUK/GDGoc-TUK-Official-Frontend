import { useEffect, useState } from "react";

interface UseCountUpProps {
  target: number;
  duration?: number;
  start?: boolean;
}

export const useCountUp = ({
  target,
  duration = 1000,
  start = true,
}: UseCountUpProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let frame = 0;
    const totalFrames = Math.round(duration / 16);
    const increment = target / totalFrames;

    const counter = setInterval(() => {
      frame++;
      const progress = Math.min(increment * frame, target);
      setCount(Math.floor(progress));

      if (progress >= target) clearInterval(counter);
    }, 16);

    return () => clearInterval(counter);
  }, [start, target, duration]);

  return count;
};

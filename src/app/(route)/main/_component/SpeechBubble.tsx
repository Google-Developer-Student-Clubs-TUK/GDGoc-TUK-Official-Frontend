import React from "react";
import Image from "next/image";

interface SpeechBubbleProps {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  rotate?: number;
  highlightText?: string;
  text?: string;
}

const SpeechBubble = ({
  top = 0,
  bottom = 0,
  left = 0,
  right = 0,
  rotate = 0,
  highlightText = "",
  text = "",
}: SpeechBubbleProps) => {
  return (
    <div
      className="absolute z-50 w-fit"
      style={{
        top,
        bottom,
        left,
        right,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div className=" w-fit relative py-3 px-5 border border-transparent rounded-full bg-gray500">
        <p
          className="font-bold text-lg text-white"
          style={{ letterSpacing: "-0.45px" }}
        >
          {highlightText && (
            <span className="text-[#FFBA00]">{highlightText}</span>
          )}{" "}
          {text}
        </p>
        <Image
          src="/icon/main/vector1.png"
          alt="vector"
          width={26.967}
          height={24.487}
          className="right-14  absolute min-w-[26.967px] min-h-[24.487px] object-contain rotate-12"
        />
      </div>
    </div>
  );
};

export default SpeechBubble;

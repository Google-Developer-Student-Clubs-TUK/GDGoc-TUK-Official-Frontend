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
  top,
  bottom,
  left,
  right,
  rotate = 0,
  highlightText = "",
  text = "",
}: SpeechBubbleProps) => {

  const style: React.CSSProperties = {
    transform: `rotate(${rotate}deg)`,
  };
  if (top !== undefined) style.top = top;
  if (bottom !== undefined) style.bottom = bottom;
  if (left !== undefined) style.left = left;
  if (right !== undefined) style.right = right;

  return (
    <div className="absolute z-50 w-fit h-fit" style={style}>
      <div className="w-fit relative py-3 px-5 border border-transparent rounded-full bg-gray500">
        <p className="font-bold text-lg text-white" >
          {highlightText && (
            <span className="text-[#FFBA00]">{highlightText}</span>
          )}{" "}
          {text}
        </p>
        <Image
          src="/icon/main/bubbleTail.png"
          alt="vector"
          width={26.967}
          height={24.487}
          className="right-14 absolute min-w-[26.967px] min-h-[24.487px] object-contain rotate-12"
        />
      </div>
    </div>
  );
};

export default SpeechBubble;

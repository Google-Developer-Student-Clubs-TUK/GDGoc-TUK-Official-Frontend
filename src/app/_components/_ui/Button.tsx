import React from "react";
import Image from "next/image";

interface ButtonProps {
  width?: string;
  title: string;
  plus?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ width = "100%", title, plus, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-3 flex-shrink-0 flex  cursor-pointer  hover:bg-hover items-center justify-center rounded-xl bg-point"
      style={{ width: width }}
    >
      <p className="font-normal text-white text-sm"> {title}</p>
      {plus && (
        <Image
          src="/icon/plus.png"
          alt="추가"
          width={16}
          height={16}
          className="ml-1 min-w-[16px] min-h-[16px] object-contain"
        />
      )}
    </button>
  );
};

export default Button;

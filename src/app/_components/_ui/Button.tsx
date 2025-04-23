import React from "react";
import Image from "next/image";
interface ButtonProps {
  width?: string;
  title: string;
  plus?: boolean;
  bg?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Button = ({
  width = "fit-content",
  bg = "point",
  title,
  plus,
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={` border border-gray400 px-6 py-3 flex-shrink-0 flex items-center justify-center rounded-xl  bg-${bg}
      ${disabled ? "cursor-default" : "cursor-pointer"} 
      `}
      style={{ width: width }}
    >
      <p className="font-bold text-white text-base"> {title}</p>
      {plus && (
        <Image
          src="/icon/plus.png"
          alt="추가"
          width={16}
          height={16}
          className="ml-1 min-w-[16px] min-h-[16px] object-contain"
        />
      )}
    </div>
  );
};

export default Button;

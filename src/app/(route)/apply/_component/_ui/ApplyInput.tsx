import React from "react";
import Image from "next/image";

interface ApplyInputProps {
  placeholder: string;
  margin?: string;
  value?: string;
  img?: string | null;
  alt?: string;
  btn?: boolean;
  width?: string;
  readOnly?: boolean;
  multiImg?: string | null;
  required?: boolean;
  bg?: string;

  imgClick?: (e?: React.MouseEvent<HTMLImageElement>, idx?: number) => void;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, idx?: number) => void;
}

const ApplyInput = ({
  placeholder,
  margin,
  onChange,
  value,
  imgClick,
  onClick,
  readOnly,
  alt = "",
  img,
  multiImg,
  width = "100%",
  btn = false,
  bg = "bg",
  required = false,
}: ApplyInputProps) => {
  return (
    <div className="relative" style={{ width: width }}>
      <input
        onClick={onClick}
        onChange={onChange}
        className={` ${img ? "pr-12" : ""}
        ${multiImg ? "pl-12" : ""}
         text-white px-4 py-3 w-full rounded-xl placeholder:text-base placeholder:font-normal  ${
           btn
             ? "cursor-pointer bg-point placeholder:text-white hover:bg-hover"
             : `bg-${bg} placeholder:text-placeholder`
         }`}
        required={required}
        value={value}
        readOnly={btn || readOnly}
        placeholder={placeholder}
        style={{ margin: margin }}
      />
      {img && (
        <Image
          onClick={imgClick}
          src={img}
          alt={alt}
          width={20}
          height={20}
          className="min-w-[20px] min-h-[20px] object-contain absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
        />
      )}
      {multiImg && (
        <Image
          src={multiImg}
          alt={alt}
          width={20}
          height={20}
          className="min-w-[20px] min-h-[20px] object-contain absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer"
        />
      )}
    </div>
  );
};

export default ApplyInput;

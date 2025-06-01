import React from "react";
import Image from "next/image";

interface DefaultInputProps {
  placeholder: string;
  margin?: string;
  value?: string;
  img?: string | null;
  alt?: string;
  width?: string;
  readOnly?: boolean;
  required?: boolean;
  bg?: string;

  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, idx?: number) => void;
}

const DefaultInput = ({
  placeholder,
  margin,
  onChange,
  value,
  onClick,
  readOnly,
  alt = "",
  img,
  width = "100%",
  bg = "gray500",
  required = false,
}: DefaultInputProps) => {
  return (
    <div className="relative" style={{ width: width }}>
      <input
        onClick={onClick}
        onChange={onChange}
        className={` ${img ? "pr-12" : ""}
       text-white px-4 py-3 w-full rounded-[999px] placeholder:text-gray300 bg-${bg} placeholder:font-normal `}
        required={required}
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        style={{ margin: margin }}
      />
      {img && (
        <Image
          src={img}
          alt={alt}
          width={16}
          height={16}
          className="min-w-[16px] min-h-[16px] object-contain absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
        />
      )}
    </div>
  );
};

export default DefaultInput;

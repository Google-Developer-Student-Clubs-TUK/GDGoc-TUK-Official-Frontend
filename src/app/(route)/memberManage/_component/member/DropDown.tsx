import React from "react";

const DropDown = ({
  onClick,
  list,
}: {
  onClick: (label: string) => void;
  list: string[];
}) => {
  return (
    <ul className="absolute left-1/2 -translate-x-1/2 bg-gray400 rounded-lg shadow-cardItemSD mt-8 z-[100] w-[140px]">
      {list.map((item) => (
        <li
          key={item}
          onClick={() => onClick(item)}
          className="py-4 px-6 hover:bg-hover rounded-lg font-bold text-white cursor-pointer text-sm"
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
export default DropDown;

import React from "react";
interface VolunteerButtonProps {
  title: string;
  onClick: () => void;
}
const VolunteerButton = ({ onClick, title }: VolunteerButtonProps) => {
  return (
    <div
      className="px-6 py-3 rounded-xl border border-gray500 w-fit cursor-pointer font-bold text-tMd mt-6 hover:bg-gray500 duration-300"
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default VolunteerButton;

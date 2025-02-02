import React from "react";
import Image from "next/image";
const Header = () => {
  return (
    <div className="fixed top-0 z-50 px-[100px] py-9 w-full h-fit flex justify-between">
      <Image
        src="/icon/logo.png"
        alt="로고"
        width={266}
        height={43}
        className="min-w-[266px] min-h-[43px] object-contain"
      />

      <div className="items-center flex gap-12">
        <button className="text-base  text-white">People</button>
        <button className="text-base text-white">Recruitment</button>
        <button className="text-base text-white">FAQ</button>
      </div>
    </div>
  );
};

export default Header;

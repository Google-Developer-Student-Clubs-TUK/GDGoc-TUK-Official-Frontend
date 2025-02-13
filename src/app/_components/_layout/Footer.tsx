import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="w-full bg-areaBg flex flex-col py-[80px] px-[100px] items-center">
      <Image
        src="/icon/logo.png"
        alt="로고"
        width={266}
        height={43}
        className="min-w-[266px] min-h-[43px] object-contain mb-6"
      />
      <div className="flex mb-12 text-white text-sm">
        <p className="font-bold mr-2">3기 Leader</p>
        <p className="font-normal ">유광무</p>
        <p className="font-normal mx-4">|</p>
        <p className="font-bold">문의</p>
        <p className="font-normal ml-2">010-1234-5678</p>
      </div>
      <div className="bg-[#555] w-full h-[1px]" />
      <div className="flex  gap-4 mt-3 text-white">
        <div className="gap-2 flex items-baseline">
          {" "}
          <Image
            src="/icon/instagram.png"
            alt="인스타 로고"
            width={20}
            height={20}
            className="min-w-[20px] min-h-[20px] object-contain "
          />
          <p className="text-sm font-normal">INSTAGRAM</p>
        </div>
        <div className="gap-2 flex items-baseline">
          {" "}
          <Image
            src="/icon/home.png"
            alt="집 아이콘"
            width={20}
            height={20}
            className="min-w-[20px] min-h-[20px] object-contain "
          />
          <p className="text-sm font-normal">TECH UNIVERSITY</p>
        </div>
        <div className="gap-2 flex items-baseline">
          {" "}
          <Image
            src="/icon/instagram.png"
            alt="집 아이콘"
            width={20}
            height={20}
            className="min-w-[20px] min-h-[20px] object-contain "
          />
          <p className="text-sm font-normal">GDG</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

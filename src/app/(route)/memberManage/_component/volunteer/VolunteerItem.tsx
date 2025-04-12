// 지원자 목록 개별 아이템 컴포넌트
import React from "react";
import Image from "next/image";

import Classification from "./ui/Classification";
import Occupation from "./ui/Occupation";

interface VolunteerItemProps {
  name: string;
  gender: "남" | "여";
  department: string;
  enrolled: "재학" | "휴학";
  classification: "오거나이저" | "일반멤버";
  occupation: string;
}

const VolunteerItem = ({
  name,
  gender,
  department,
  enrolled,
  classification,
  occupation,
}: VolunteerItemProps) => {
  return (
    <div className="flex flex-col gap-6 justify-between w-[100%] 2xl:w-[24%] p-5 border border-gray500 rounded-xl  cursor-pointer hover:bg-gray700 hover:border-gray700 hover:shadow-cardItemSD duration-300">
      <div className="felx flex-col gap-1 text-white ">
        <p className="text-ttSm font-bold">{name} ({gender})</p>
        <p className="text-tSm text-gray200">{department}/{enrolled}</p>
      </div>

      <div className="flex justify-between items-end text-white">
        <div className="flex gap-2 items-center cursor-default">
          <Classification classification={classification} />
          <Occupation occupation={occupation} />
        </div>
        <div className="flex gap-1 items-center">
          <p className="text-tSm pt-[2px]">자세히 보기</p>
          <Image src="/icon/detail_arrow.svg" width={16} height={16} alt="화살표" />
        </div>
      </div>
    </div>
  );
};

export default VolunteerItem;

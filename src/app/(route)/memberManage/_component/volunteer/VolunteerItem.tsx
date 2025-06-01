// 지원자 목록 개별 아이템 컴포넌트
import React from "react";
import Image from "next/image";

import Classification from "./ui/Classification";
import Occupation from "./ui/Occupation";
import { VolunteerItemType } from "./_type/volunteer";
import { getLabelFromValue } from "@/app/(route)/apply/utils/korToEngMap";

const VolunteerItem = ({
  enrollmentStatus,
  field,
  gender,
  major,
  name,
  role,
}: VolunteerItemType) => {
  return (
    <div className="flex flex-col gap-6 justify-between p-5 border border-gray500 rounded-xl  cursor-pointer hover:bg-gray700 hover:border-gray700 hover:shadow-cardItemSD duration-300">
      <div className="felx flex-col gap-1 text-white ">
        <p className="text-ttSm font-bold">
          {name} ({getLabelFromValue("성별", gender)})
        </p>
        <p className="text-tSm text-gray200">
          {major}/{getLabelFromValue("학적 상태", enrollmentStatus)}
        </p>
      </div>

      <div className="flex justify-between items-end text-white">
        <div className="flex gap-2 items-center cursor-default">
          <Classification classification={role} />
          <Occupation occupation={getLabelFromValue("직군", field)} />
        </div>
        <div className="flex gap-1 items-center">
          <p className="text-tSm pt-[2px]">자세히 보기</p>
          <Image
            src="/icon/detail_arrow.svg"
            width={16}
            height={16}
            alt="화살표"
          />
        </div>
      </div>
    </div>
  );
};

export default VolunteerItem;

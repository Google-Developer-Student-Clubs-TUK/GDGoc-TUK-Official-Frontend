// VolunteerModal.tsx
import React from "react";
import Occupation from "./ui/Occupation";
import Classification from "./ui/Classification";

import { Volunteer } from "../../_constants/volunteerData";

interface Props {
  volunteer: Volunteer;
  onClose: () => void;
}

const VolunteerModal = ({ volunteer, onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-gray600 p-10 rounded-xl w-[680px] max-w-[680px] text-white relative">

        {/* 지원자 인적정보 */}
        <div className="flex flex-col gap-6">
          <div className="flex gap-2 items-center cursor-default">
            <Classification classification={volunteer.classification} />
            <Occupation occupation={volunteer.occupation} />
          </div>
          <div className="felx flex-col gap-1 text-white ">
            <p className="text-ttSm font-bold">{volunteer.name} ({volunteer.gender})</p>
            <p className="text-tSm text-gray200">{volunteer.department}/{volunteer.enrolled}</p>
          </div>
        </div>
        
        {/* 추후 버튼 컴포넌트로 변경 필요*/}
        <div className="px-6 py-3 rounded-xl border border-gray500 w-fit cursor-pointer font-bold text-tMd mt-6 hover:bg-gray500 duration-300" onClick={onClose}>닫기</div>
      </div>
    </div>
  );
};

export default VolunteerModal;

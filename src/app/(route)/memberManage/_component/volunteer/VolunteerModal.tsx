// VolunteerModal.tsx
import React, { useEffect, useState } from "react";
import Occupation from "./ui/Occupation";
import Classification from "./ui/Classification";
import { applicantAnswerApi } from "../../_api";
import { useQuery } from "@tanstack/react-query";
import { VolunteerItemType } from "./_type/volunteer";
import { getLabelFromValue } from "@/app/(route)/apply/utils/korToEngMap";

interface Props {
  volunteer: VolunteerItemType;
  onClose: () => void;
}

const VolunteerModal = ({ volunteer, onClose }: Props) => {
  const [answer, setAnswer] = useState<Record<string, string> | null>(null);

  const { data } = useQuery({
    queryKey: ["applicantAnswer", volunteer.applicantId],
    queryFn: () => applicantAnswerApi({ applicantId: volunteer.applicantId }),
  });

  useEffect(() => {
    if (data) {
      const answerData = data.data.questionAndAnswer;
      setAnswer(JSON.parse(answerData));
    }
  }, [data]);

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-gray600 p-10 rounded-xl w-[680px] max-w-[680px] text-white relative">
        {/* 지원자 인적정보 */}
        <div className="flex flex-col ">
          <div className="flex gap-2 items-center cursor-default mb-6">
            <Classification classification={volunteer.role} />
            <Occupation occupation={volunteer.field} />
          </div>
          <div className="felx flex-col gap-1 text-white">
            <p className="text-ttSm font-bold">
              {volunteer.name} ({getLabelFromValue("성별", volunteer.gender)})
            </p>
            <p className="text-tSm text-gray200">
              {volunteer.major}/
              {getLabelFromValue("상태", volunteer.enrollmentStatus)}
            </p>
          </div>
          <div className="my-10 flex flex-col gap-4  max-h-[300px] overflow-auto">
            {answer &&
              Object.entries(answer).map(([key, value]) => (
                <div key={key} className="flex ">
                  <p className="font-bold text-base text-white w-28 whitespace-nowrap">
                    {key}
                  </p>
                  <p className="font-normal text-base text-white flex-1">
                    {value}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* 추후 버튼 컴포넌트로 변경 필요*/}
        <div
          className="px-6 py-3 rounded-xl border border-gray500 w-fit cursor-pointer font-bold text-tMd mt-6 hover:bg-gray500 duration-300"
          onClick={onClose}
        >
          닫기
        </div>
      </div>
    </div>
  );
};

export default VolunteerModal;

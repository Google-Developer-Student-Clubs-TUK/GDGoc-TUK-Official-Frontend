// VolunteerModal.tsx
import React, { useEffect, useState } from "react";
import Occupation from "./ui/Occupation";
import Classification from "./ui/Classification";
import {
  applicantAnswerApi,
  applicantPassApi,
  applicantRejectApi,
} from "../../_api";
import { useQuery } from "@tanstack/react-query";
import { VolunteerItemType } from "./_type/volunteer";
import { getLabelFromValue } from "@/app/(route)/apply/utils/korToEngMap";

import { useGenericMutation } from "@/app/_lib/mutations/customMutation";
import Button from "@/app/_components/_ui/Button";

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

  // 성공시 알람
  const applicantPassSuccess = () => {
    alert("합격 처리 되었습니다");

    window.location.reload();
  };

  const applicantRejectSuccess = () => {
    alert("불합격 처리 되었습니다");

    window.location.reload();
  };

  // 합격 mutation
  const { mutation: passMutation } = useGenericMutation({
    mutationFn: applicantPassApi,
    onSuccessCb: applicantPassSuccess,
  });

  // 불합격 mutation
  const { mutation: rejectMutation } = useGenericMutation({
    mutationFn: applicantRejectApi,
    onSuccessCb: applicantRejectSuccess,
  });

  // 합격/불합격 처리 함수
  const setApplicantPass = ({
    applicantId,
    pass,
  }: {
    applicantId: number;
    pass: boolean;
  }) => {
    if (pass) {
      passMutation.mutate({ applicantId, role: volunteer.role });
    } else {
      rejectMutation.mutate(applicantId);
    }
  };

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
            <p className="text-ttMd font-bold">
              {volunteer.name} ({getLabelFromValue("성별", volunteer.gender)})
            </p>
            <p className="text-tSm text-gray200">
              {volunteer.major}/
              {getLabelFromValue("학적 상태", volunteer.enrollmentStatus)}
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
        <div className="w-full h-[1px] bg-gray500" />

        <div className="flex justify-between mt-6">
          <Button onClick={onClose} title={"닫기"} bg="gray600" />
          <div className="flex gap-5">
            <Button
              onClick={() =>
                setApplicantPass({
                  applicantId: volunteer.applicantId,
                  pass: false,
                })
              }
              title={"불합격"}
              bg="gray600"
            />

            <Button
              onClick={() =>
                setApplicantPass({
                  applicantId: volunteer.applicantId,
                  pass: true,
                })
              }
              title={"합격"}
              bg="gray600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerModal;

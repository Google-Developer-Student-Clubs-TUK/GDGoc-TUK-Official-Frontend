// SetPeriodModal.tsx
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Datepicker
import Datepicker from "react-tailwindcss-datepicker";
import type { DateValueType } from "react-tailwindcss-datepicker";

import { useGenericMutation } from "@/app/_lib/mutations/customMutation";
import { recruitmentsApi } from "../_api";

interface Props {
  onClose: () => void;
}

const SetPeriodModal = ({ onClose }: Props) => {
  const [dateValue, setDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const handleValueChange = (newValue: DateValueType) => {
    setDateValue(newValue);
  };

  const recruitmentsSuccess = () => {
    alert("지원기간 설정이 완료되었습니다");
    window.location.reload();
  };
  // RecruitmentsPost
  const { mutation: RecruitmentsMutation } = useGenericMutation({
    mutationFn: recruitmentsApi,
    onSuccessCb: recruitmentsSuccess,
  });

  const onSubmitRecruitments = () => {
    if (!dateValue?.startDate || !dateValue?.endDate) {
      alert("모집 기간을 설정해주세요!");
      return;
    }

    RecruitmentsMutation.mutate({
      openAt: new Date(dateValue.startDate).toISOString(),
      closeAt: new Date(dateValue.endDate).toISOString(),
      generation: String(year),
    });
  };

  // 활동연도 Dropdown 관련
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-gray600 p-10 rounded-xl w-[680px] max-w-[680px] text-white relative">
        {/* 타이틀 */}
        <div className="flex flex-col gap-1 text-white ">
          <p className="text-ttMd font-bold">모집기간 설정하기</p>
          <p className="text-tSm text-gray200">활동연도는 지원자들이 활동할 연도를 의미합니다.</p>
        </div>

        {/* 설정 콘텐츠 */}
        <div className="flex flex-col gap-4 my-10">
          <div className="flex items-center gap-10">
            <p className="w-fit text-tMd font-bold">모집기간</p>
            <div>
              <Datepicker
                primaryColor={"green"}
                placeholder="기간을 선택해주세요."
                useRange={false}
                value={dateValue}
                onChange={handleValueChange}
                displayFormat={"YY.MM.DD"}
                inputClassName={
                  "rounded-xl py-3 px-4 bg-gray700 focus:outline-none focus:ring-1 focus:ring-point duration-300 text-tMd text-white"
                }
              />
            </div>
          </div>

          <div className="flex items-center gap-10">
            <label
              htmlFor="activityYear"
              className="w-fit text-tMd font-bold"
            >
              활동연도
            </label>
            <div className="relative w-full max-w-[200px]" ref={dropdownRef}>
              <div
                onClick={() => setOpen((prev) => !prev)}
                className="cursor-pointer bg-gray700 text-white text-tMd px-4 py-3 rounded-xl flex justify-between items-center"
              >
                {year}년
                <Image
                  src="/icon/arrow_bottom.png"
                  alt="화살표"
                  width={20}
                  height={20}
                  className="pointer-events-none object-cover"
                />
              </div>

              {open && (
                <ul className="absolute z-10 mt-3 w-full bg-gray700 rounded-xl overflow-hidden text-white text-tMd">
                  {[currentYear, currentYear + 1].map((y) => (
                    <li
                      key={y}
                      onClick={() => {
                        setYear(y);
                        setOpen(false);
                      }}
                      className={`w-full py-4 px-6 hover:bg-gray500 duration-300 cursor-pointer`}
                    >
                      {y}년
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* 추후 버튼 컴포넌트로 변경 필요*/}
        <div className="flex justify-between items-center border-t border-gray500 pt-6">
          <div
            className="px-6 py-3 rounded-xl border border-gray500 w-fit cursor-pointer font-bold text-tMd hover:bg-gray500 duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            닫기
          </div>
          <div
            onClick={onSubmitRecruitments}
            className="px-6 py-3 rounded-xl border border-point bg-point w-fit cursor-pointer font-bold text-tMd hover:bg-hover hover:border-hover duration-300"
          >
            모집하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPeriodModal;

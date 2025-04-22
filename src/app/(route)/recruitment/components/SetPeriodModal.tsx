// SetPeriodModal.tsx
import React, { useState } from "react";

// Datepicker
import Datepicker from "react-tailwindcss-datepicker";
import type { DateValueType } from "react-tailwindcss-datepicker";

interface Props {
  onClose: () => void;
}

interface DateValue {
  startDate: string | null;
  endDate: string | null;
}

const SetPeriodModal = ({ onClose }: Props) => {

  const [dateValue, setDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue: DateValueType) => {
    setDateValue(newValue);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-gray600 p-10 rounded-xl w-[680px] max-w-[680px] text-white relative">

        {/* 타이틀 */}
        <div className="flex flex-col gap-1 text-white ">
          <p className="text-ttMd font-bold">지원기간 설정하기</p>
          <p className="text-tSm text-gray200">모집기간을 설정해주세요.</p>
        </div>

        {/* 설정 콘텐츠 */}
        <div className="flex flex-col gap-4 my-10">
          <div className="flex items-center gap-10">
            <p className="w-[60px] text-tMd font-bold">모집기간</p>
            <div>
              <Datepicker
                primaryColor={"green"}
                placeholder="기간을 선택해주세요."
                useRange={false}

                value={dateValue}
                onChange={handleValueChange}
                displayFormat={"YY.MM.DD"} // 원하는 형식

                inputClassName={"rounded-xl py-3 px-4 bg-gray700 focus:outline-none focus:ring-1 focus:ring-point duration-300 text-tMd text-white"}
              />
            </div>
          </div>

          <div className="flex items-center gap-10">
            <p className="w-[60px] text-tMd font-bold">활동연도</p>
            <input type="text" className="rounded-xl py-3 px-4 bg-gray700 focus:outline-none focus:ring-1 focus:ring-point duration-300 text-tMd text-white"
                   placeholder="ex) 2025년" required/>
          </div>
        </div>

        {/* 추후 버튼 컴포넌트로 변경 필요*/}
        <div className="flex justify-between items-center border-t border-gray500 pt-6">
          <div className="px-6 py-3 rounded-xl border border-gray500 w-fit cursor-pointer font-bold text-tMd hover:bg-gray500 duration-300" onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}>닫기</div>
          <div className="px-6 py-3 rounded-xl border border-point bg-point w-fit cursor-pointer font-bold text-tMd hover:bg-hover hover:border-hover duration-300">모집하기</div>
        </div>

      </div>
    </div>
  );
};

export default SetPeriodModal; 
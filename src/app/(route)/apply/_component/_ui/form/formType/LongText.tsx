import { useQuestionAnswerStore } from "@/app/(route)/apply/_store/questionAnswer";
import { TextFormPropsType } from "@/app/(route)/apply/_type/formPropsType";
import React from "react";

const LongText = ({ required, admin, idx }: TextFormPropsType) => {
  const { setAnswer, questionAnswerList } = useQuestionAnswerStore();
  return (
    <textarea
      readOnly={admin}
      onChange={
        !admin && idx !== undefined
          ? (e) => setAnswer(idx, e.target.value, "single")
          : undefined
      }
      className=" h-[162px] text-white px-4 py-3 w-full rounded-xl bg-bg placeholder:text-placeholder placeholder:text-base placeholder:font-normal"
      required={required}
      value={
        !admin && idx !== undefined ? questionAnswerList[idx]?.[0] ?? "" : ""
      }
      placeholder="질문형 대답"
    />
  );
};

export default LongText;

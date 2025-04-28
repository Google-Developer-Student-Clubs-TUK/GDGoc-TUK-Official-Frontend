import { useQuestionAnswerStore } from "@/app/(route)/apply/_store/questionAnswer";
import { TextFormPropsType } from "@/app/(route)/apply/_type/formPropsType";
import React from "react";

const LongText = ({ admin, questionId }: TextFormPropsType) => {
  const { setAnswer, questionAnswerList } = useQuestionAnswerStore();
  const answer = questionAnswerList.find((q) => q.questionId === questionId);
  return (
    <textarea
      readOnly={admin}
      onChange={
        !admin
          ? (e) => setAnswer(questionId, e.target.value, "single")
          : undefined
      }
      className="h-[162px] text-white px-4 py-3 w-full rounded-xl bg-bg placeholder:text-placeholder"
      value={!admin ? answer?.contents[0] ?? "" : ""}
      placeholder="질문형 대답"
    />
  );
};

export default LongText;

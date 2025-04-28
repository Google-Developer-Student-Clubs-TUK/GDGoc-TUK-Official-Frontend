import React from "react";
import Input from "../../ApplyInput";
import { TextFormPropsType } from "@/app/(route)/apply/_type/formPropsType";
import { useQuestionAnswerStore } from "@/app/(route)/apply/_store/questionAnswer";

const ShortText = ({ admin, questionId }: TextFormPropsType) => {
  const { setAnswer, questionAnswerList } = useQuestionAnswerStore();
  const answer = questionAnswerList.find((q) => q.questionId === questionId);

  return (
    <Input
      onChange={
        !admin
          ? (e) => setAnswer(questionId, e.target.value, "single")
          : undefined
      }
      value={!admin ? answer?.contents[0] ?? "" : ""}
      readOnly={admin}
      placeholder={"단답형 대답"}
    />
  );
};

export default ShortText;

import React from "react";
import Input from "../Input/DefaultInput";
import { TextFormPropsType } from "@/app/(route)/apply/_type/formPropsType";
import { useQuestionAnswerStore } from "@/app/(route)/apply/_store/questionAnswer";

const ShortText = ({ admin, idx }: TextFormPropsType) => {
  const { setAnswer, questionAnswerList } = useQuestionAnswerStore();

  return (
    <Input
      onChange={
        !admin && idx !== undefined
          ? (e) => setAnswer(idx, e.target.value, "single")
          : undefined
      }
      value={
        !admin && idx !== undefined ? questionAnswerList[idx].contents : ""
      }
      readOnly={admin}
      placeholder={"단답형 대답"}
    />
  );
};

export default ShortText;

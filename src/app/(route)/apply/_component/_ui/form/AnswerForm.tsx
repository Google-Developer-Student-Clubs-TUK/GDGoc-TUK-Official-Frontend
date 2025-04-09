import React from "react";
import { getQuestionTypeMap } from "../../../utils/getQuestionTypeMap";
import { QuestionItemType } from "../../../_type/formType";
import { QuestionsType } from "../../../_type/questionsType";

interface AnswerFormPropsType extends QuestionItemType {
  idx: number;
}
const AnswerForm = ({
  idx,
  order,
  isDeletable,
  questionId,
  questionType,
  isRequired,
  content,
  subQuestions,
}: AnswerFormPropsType) => {
  const questionTypeMap = getQuestionTypeMap({
    questionId,
    subQuestions,
    admin: false,
    idx: idx,
    required: isRequired,
  });

  return (
    <div className=" flex flex-col bg-areaBg p-5 w-[600px] h-fit rounded-xl ">
      {/* 질문 입력 컴포넌트*/}
      <div className="flex items-center">
        <p className=" pl-1 pr-3 w-fit font-normal text-lg text-white placeholder:font-normal  placeholder:text-white">
          {content}
        </p>
        {isRequired && (
          <p className="text-[#FFBA00] font-normal text-sm ">* 필수</p>
        )}
      </div>

      {/* 선택된 폼 렌더링 */}
      <div className="mt-4">
        {questionTypeMap[questionType as QuestionsType].component}
      </div>

      {/* 선택된 폼 렌더링 */}
    </div>
  );
};

export default AnswerForm;

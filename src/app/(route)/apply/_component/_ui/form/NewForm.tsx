"use client";
import React, { useState } from "react";
import Image from "next/image";

import { QuestionItemType } from "../../../_type/formType";
import { useQuestionFormStore } from "../../../_store/questionForm";
import { QuestionsType } from "../../../_type/questionsType";
import { getUpdatedQuestionOrders } from "../../../utils/diffQuestions";
import { useGenericMutation } from "@/app/_lib/mutations/customMutation";
import { deleteQuestionApi, deleteSubQuestionApi } from "../../../_api";
import { getQuestionTypeMap } from "../../../utils/getQuestionTypeMap";

interface NewFormPropsType extends QuestionItemType {
  dragHandler?: React.JSX.Element;
}
const NewForm = ({
  order,
  isDeletable,
  questionId,
  questionType,
  isRequired,
  content,
  subQuestions,
  dragHandler,
}: NewFormPropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const { updateField, deleteNewQuestion, deleteSubQuestion } =
    useQuestionFormStore();

  const handleFormType = (newType: QuestionsType) => {
    setIsOpen(false);
    updateField(questionId, "questionType", newType);
    if (["SHORT_TEXT", "LONG_TEXT"].includes(newType)) {
      updateField(questionId, "subQuestions", []);
    }
  };

  const { prevQuestionList } = useQuestionFormStore();

  const { mutation: deleteQuestionMutation } = useGenericMutation({
    mutationFn: deleteQuestionApi,
  });

  const { mutation: deleteSubQuestionMutation } = useGenericMutation({
    mutationFn: deleteSubQuestionApi,
  });

  const onDeleteQuestion = (questionId: number) => {
    deleteNewQuestion(questionId);
    if (questionId > 0) {
      const updatedOrders = getUpdatedQuestionOrders({
        currentQuestionList: prevQuestionList,
        questionId: questionId,
      });

      //mutate는 한개의 인자만 받음
      deleteQuestionMutation.mutate({
        questionId,
        questionOrders: updatedOrders,
      });
    }
  };
  const onDeleteSubQuestion = (questionId: number, subQuestionId: number) => {
    deleteSubQuestion(questionId, subQuestionId);
    if (subQuestionId > 0) {
      //mutate는 한개의 인자만 받음
      deleteSubQuestionMutation.mutate({
        questionId,
        subQuestionId,
      });
    }
  };
  const questionTypeMap = getQuestionTypeMap({
    questionId,
    subQuestions,
    onDeleteSubQuestion,
    admin: true,
  });

  return (
    <div className=" flex flex-col bg-areaBg p-5 w-[600px] h-fit rounded-xl border-[1px] border-[#444] shadow-[4px_4px_8px_0px_rgba(0,0,0,0.25)]">
      {dragHandler}
      <div className="flex justify-between items-start relative">
        {/* 질문 입력 컴포넌트*/}
        <input
          value={content}
          onChange={(e) => updateField(questionId, "content", e.target.value)}
          className="px-1 py-3 w-[254px] bg-transparent font-normal text-lg text-white placeholder:font-normal border-b border-[#555]  placeholder:text-white"
          type="text"
          placeholder="질문을 입력하세요."
          required
        />

        {/* 드롭다운 컴포넌트*/}
        <div
          className={`z-50 h-fit right-0 w-[139px] absolute   bg-areaBg ${
            isOpen
              ? "rounded-b-[20px] shadow-[4px_4px_8px_rgba(0,0,0,0.25)]"
              : ""
          }   `}
        >
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className=" cursor-pointer p-3 bg-transparent flex justify-between border-b border-[#555]"
          >
            <p className="font-normal text-lg text-white">
              {questionTypeMap[questionType as QuestionsType].title}
            </p>
            <Image
              src="/icon/slideup_arrow_top.png"
              alt="아래 화살표"
              width={20}
              height={20}
              className={`transition-transform duration-300 ${
                isOpen ? "rotate-0" : "-rotate-180"
              } min-w-[20px] min-h-[20px] object-contain`}
            />
          </div>
          {isOpen &&
            // Object.keys 가 string[] 반환 ->  FormType[]으로 타입 캐스팅
            (Object.keys(questionTypeMap) as QuestionsType[])
              .filter((item) => item !== questionType) // 현재 선택된 항목 제외
              .map((item, idx) => (
                <div
                  key={item}
                  onClick={() => handleFormType(item)}
                  className={`cursor-pointer p-3 bg-transparent flex justify-between ${
                    idx === Object.keys(questionTypeMap).length - 2
                      ? ""
                      : "border-b border-[#555]"
                  }`}
                >
                  <p className="font-normal text-lg text-white">
                    {questionTypeMap[item].title}
                  </p>
                </div>
              ))}
        </div>
      </div>
      {/* 선택된 폼 렌더링 */}
      <div className="mt-4">
        {questionTypeMap[questionType as QuestionsType].component}
      </div>
      ;
      <div className="flex justify-between mt-10">
        {/* 토글 컴포넌트 + 필수 */}
        <div className="gap-3 flex items-center">
          <p className="text-white font-normal text-base">필수</p>
          {/* 토글 컴포넌트*/}
          <div className="relative h-[14px] w-9 rounded-full bg-white">
            <div
              className={` cursor-pointer w-[22px] h-[22px] absolute top-1/2 translate-y-[-50%]  rounded-full ${
                !isRequired ? "left-0  bg-[#767676]" : "left-1/2 bg-[#FFBA00] "
              } transition-[0.3s]`}
              onClick={() => updateField(questionId, "isRequired", !isRequired)}
            />
          </div>
        </div>
        {isDeletable && (
          <Image
            src="/icon/delete.png"
            alt="삭제"
            width={20}
            height={20}
            onClick={() => onDeleteQuestion(questionId)}
            className="min-w-[20px] min-h-[20px] object-contain cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default NewForm;

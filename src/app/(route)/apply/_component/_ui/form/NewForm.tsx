"use client";
import React, { useState } from "react";
import Image from "next/image";
import SingleChoice from "./formType/SingleChoice";
import ShortText from "./formType/ShortText";
import LongText from "./formType/LongText";
import MultipleChoice from "./formType/MultipleChoice";
import { NewQuestion, QuestionsType } from "../../../_type/formType";
import { useNewQuestionsStore } from "../../../_store/newQuestions";

const NewForm = ({
  questionId,
  questionType,
  isRequired,
  content,
  newSubQuestions,
}: NewQuestion) => {
  const [isOpen, setIsOpen] = useState(false);
  const { updateNewField, deleteNewQuestion } = useNewQuestionsStore();

  const questionsTypesData = {
    SHORT_TEXT: {
      title: "단답형",
      component: <ShortText newItem={true} />,
    },
    LONG_TEXT: {
      title: "장문형",
      component: <LongText newItem={true} />,
    },
    SINGLE_CHOICE: {
      title: "선택형",
      component: (
        <SingleChoice
          questionId={questionId}
          newSubQuestions={newSubQuestions}
        />
      ),
    },
    MULTIPLE_CHOICE: {
      title: "체크형",
      component: (
        <MultipleChoice
          questionId={questionId}
          newSubQuestions={newSubQuestions}
        />
      ),
    },
  };

  const handleFormType = (item: QuestionsType) => {
    setIsOpen(false);
    updateNewField(questionId, "questionType", item);
  };

  return (
    <div className=" flex flex-col bg-areaBg p-5 w-[600px] h-fit rounded-xl border-[1px] border-[#444] shadow-[4px_4px_8px_0px_rgba(0,0,0,0.25)]">
      <div className="flex justify-between items-start relative">
        {/* 질문 입력 컴포넌트*/}
        <input
          value={content}
          onChange={(e) =>
            updateNewField(questionId, "content", e.target.value)
          }
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
              {questionsTypesData[questionType as QuestionsType].title}
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
            (Object.keys(questionsTypesData) as QuestionsType[])
              .filter((item) => item !== questionType) // 현재 선택된 항목 제외
              .map((item, idx) => (
                <div
                  key={item}
                  onClick={() => handleFormType(item)}
                  className={`cursor-pointer p-3 bg-transparent flex justify-between ${
                    idx === Object.keys(questionsTypesData).length - 2
                      ? ""
                      : "border-b border-[#555]"
                  }`}
                >
                  <p className="font-normal text-lg text-white">
                    {questionsTypesData[item].title}
                  </p>
                </div>
              ))}
        </div>
      </div>
      {/* 선택된 폼 렌더링 */}
      <div className="mt-4">
        {questionsTypesData[questionType as QuestionsType].component}
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
              onClick={() =>
                updateNewField(questionId, "isRequired", !isRequired)
              }
            />
          </div>
        </div>
        <Image
          src="/icon/delete.png"
          alt="삭제"
          width={20}
          height={20}
          onClick={() => deleteNewQuestion(questionId)}
          className="min-w-[20px] min-h-[20px] object-contain cursor-pointer"
        />
      </div>
    </div>
  );
};

export default NewForm;

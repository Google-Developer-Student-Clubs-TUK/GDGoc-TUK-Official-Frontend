"use client";

import { useQuery } from "@tanstack/react-query";
import { questionAnswerApi, questionListApi } from "./_api";
import { useEffect } from "react";
import { useQuestionFormStore } from "./_store/questionForm";
import Header from "@/app/_components/_layout/Header";
import Confirm from "./_component/Confirm";
import { useQuestionAnswerStore } from "./_store/questionAnswer";
import { useGenericMutation } from "@/app/_lib/mutations/customMutation";
import AnswerForm from "./_component/_ui/form/AnswerForm";
import { requiredAnswerKeyMap } from "./utils/korToEngMap";
import Button from "@/app/_components/_ui/Button";

const Apply = () => {
  const { setQuestion, questionList } = useQuestionFormStore();
  const { resetAnswers, questionAnswerList } = useQuestionAnswerStore();

  // 질문 get
  const { isLoading, data, isError } = useQuery({
    queryKey: ["questionList"],
    queryFn: () => questionListApi(),
  });

  // 질문 가져온 data 저장
  useEffect(() => {
    if (data) {
      const newData = data.data.questionResponses;
      setQuestion(newData);
      resetAnswers(newData);
    }
  }, [data]);

  // Answer Post
  const { mutation: questionAnswerMutation } = useGenericMutation({
    mutationFn: questionAnswerApi,
  });

  const submitAnswer = () => {
    // 필수 질문 응답 여부
    const hasEmptyRequired = questionAnswerList.some((item) => {
      if (!item.isRequired) return false;

      return item.contents.length === 0;
    });

    if (hasEmptyRequired) {
      alert("필수 질문에 답변이 없습니다.");
      return;
    }

    // memberProfile 매핑
    const memberProfile: Record<string, string> = {};
    questionList.forEach((question) => {
      if (!question.isDeletable) {
        const key = requiredAnswerKeyMap[question.content];
        if (key) {
          const answer = questionAnswerList.find(
            (a) => a.questionId === question.questionId
          );
          if (answer) {
            memberProfile[key] = answer.contents[0];
          }
        }
      }
    });

    // 전체 answers 에 필요없는 key-value 쌍들 제거
    const answers = questionAnswerList.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ question, isRequired, ...rest }) => rest
    );
    const questionAndAnswerJson = JSON.stringify(questionAnswerList);

    questionAnswerMutation.mutate({
      memberProfile,
      answers,
      questionAndAnswerJson,
    });
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center my-[200px]">
        <div className="flex flex-col w-full max-w-[600px]">
          <Confirm />
          <form className="grid gap-[60px] mt-12">
            {questionList.map((i, idx) => (
              <AnswerForm
                idx={idx}
                key={i.questionId}
                order={i.order}
                questionId={i.questionId}
                content={i.content}
                questionType={i.questionType}
                isDeletable={i.isDeletable}
                isRequired={i.isRequired}
                subQuestions={i.subQuestions}
              />
            ))}
            /
          </form>

          <div className="flex justify-end ">
            <Button
              onClick={submitAnswer}
              title={"지원하기"}
              width="120px"
              bg="areaBg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;

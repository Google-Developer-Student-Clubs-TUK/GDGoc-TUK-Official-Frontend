"use client";

import { useQuery } from "@tanstack/react-query";
import { questionAnswerApi, questionListApi } from "./_api";
import { useEffect } from "react";
import { useQuestionFormStore } from "./_store/questionForm";
import AnswerForm from "./_component/_ui/AnswerForm";
import Header from "@/app/_components/_layout/Header";
import Confirm from "./_component/Confirm";
import { useQuestionAnswerStore } from "./_store/questionAnswer";
import { useGenericMutation } from "@/app/_lib/mutations/customMutation";

const Apply = () => {
  const { setQuestion, questionList } = useQuestionFormStore();
  const { resetAnswers, questionAnswerList } = useQuestionAnswerStore();
  const { isLoading, data, isError } = useQuery({
    queryKey: ["questionList"],
    queryFn: () => questionListApi(),
  });

  useEffect(() => {
    if (data) {
      const newData = data.data.questionResponses;
      console.log(data);
      setQuestion(newData);
      resetAnswers(newData.length);
    }
  }, [data]);

  useEffect(() => {
    console.log(questionAnswerList);
  }, [questionAnswerList]);

  const { mutation: questionAnswerMutation } = useGenericMutation({
    mutationFn: questionAnswerApi,
  });

  const submitAnswer = () => {
    const [
      name,
      studentNumber,
      enrollmentStatus,
      universityYear,
      field,
      gender,
      email,
      major,
    ] = questionAnswerList.map((arr) => arr[0] ?? ""); // 첫 번째 값 가져오기 + fallback

    const requiredAnswer = {
      name,
      studentNumber,
      enrollmentStatus,
      universityYear,
      field,
      gender,
      email,
      major,
    };

    const getAnswerMapByContent = (
      questionList: { content: string }[],
      questionAnswerList: string[][]
    ) => {
      return questionList.reduce((acc, q, idx) => {
        acc[q.content] = (questionAnswerList[idx] ?? []).join(", ");
        return acc;
      }, {} as Record<string, string>);
    };

    const mappedAnswers = JSON.stringify(
      getAnswerMapByContent(questionList, questionAnswerList)
    );

    questionAnswerMutation.mutate({
      requiredAnswer,
      answers: questionAnswerList,
      questionAndAnswerJson: mappedAnswers,
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
          <button onClick={submitAnswer}>제출하기</button>
        </div>
      </div>
    </div>
  );
};

export default Apply;

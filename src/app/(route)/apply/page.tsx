"use client";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { questionAnswerApi, questionListApi } from "./_api";
import { useEffect, useMemo, useState } from "react";
import { useQuestionFormStore } from "./_store/questionForm";
import Header from "@/app/_components/_layout/Header";
import Confirm from "./_component/Confirm";
import { useQuestionAnswerStore } from "./_store/questionAnswer";
import { useGenericMutation } from "@/app/_lib/mutations/customMutation";
import AnswerForm from "./_component/_ui/form/AnswerForm";
import { requiredAnswerKeyMap } from "./utils/korToEngMap";
import Button from "@/app/_components/_ui/Button";
import ProgressBar from "./_component/_ui/ProgressBar";
import LoadingOverlay from "@/app/_components/_layout/LoadingOverlay";

const Apply = () => {
  const {
    setQuestion,
    goToPrevPage,
    goToNextPage,
    setLastPage,
    questionList,
    lastPage,
    currentPage,
  } = useQuestionFormStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const { resetAnswers, questionAnswerList } = useQuestionAnswerStore();

  const currentPageQuestionList = useMemo(() => {
    return questionList.filter((q) => q.page === currentPage);
  }, [questionList, currentPage]);

  // 질문 get
  const { data } = useQuery({
    queryKey: ["questionList"],
    queryFn: () => questionListApi(),
  });

  // 질문 가져온 data 저장
  useEffect(() => {
    if (data) {
      console.log(data);
      const newData = data.data;
      setQuestion(newData.questionResponses);
      setLastPage(newData.lastPage);
      resetAnswers(newData.questionResponses);
    }
  }, [data]);

  const questionAnswerSuccess = () => {
    alert("지원서가 제출되었습니다");
    router.push("/");
  };

  // Answer Post
  const { mutation: questionAnswerMutation } = useGenericMutation({
    mutationFn: questionAnswerApi,
    onMutateCb: () => setIsSubmitting(true),
    onSuccessCb: () => questionAnswerSuccess,
    onSettledCb: () => setIsSubmitting(false),
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

    console.log({
      memberProfile,
      answers,
      questionAndAnswerJson,
    });
    questionAnswerMutation.mutate({
      memberProfile,
      answers,
      questionAndAnswerJson,
    });
  };

  return (
    <div>
      {isSubmitting && <LoadingOverlay />}
      <Header />
      <div className="flex justify-center my-[200px]">
        <div className="flex flex-col w-full max-w-[600px]">
          <Confirm />
          <ProgressBar currentPage={currentPage} totalPage={lastPage} />
          <form className="grid gap-[60px] mt-12">
            {currentPageQuestionList.map((i) => (
              <AnswerForm
                page={i.page}
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

          <div className="flex justify-between ">
            <div>
              {currentPage !== 0 && (
                <Button
                  onClick={goToPrevPage}
                  title={"이전"}
                  bg="gray600"
                  border={true}
                />
              )}
            </div>

            <div className="flex gap-4">
              {currentPage === lastPage ? (
                <Button onClick={submitAnswer} title={"지원하기"} bg="areaBg" />
              ) : (
                <Button onClick={goToNextPage} title={"다음"} bg="areaBg" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;

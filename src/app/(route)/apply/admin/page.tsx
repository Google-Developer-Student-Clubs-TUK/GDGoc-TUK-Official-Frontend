"use client";
import { useRouter } from "next/navigation";
import NewForm from "../_component/_ui/form/NewForm";
import Header from "@/app/_components/_layout/Header";
import Confirm from "../_component/Confirm";
import Button from "@/app/_components/_ui/Button";
import { useQuestionFormStore } from "../_store/questionForm";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "../_component/_ui/SortableItem";

import { useEffect, useMemo, useState } from "react";
import useDragSort from "../_hook/useDragSort";
import { QuestionItemType } from "../_type/formType";
import { useQuery } from "@tanstack/react-query";
import { questionListApi, updateQuestionApi } from "../_api";
import {
  getModifiedQuestions,
  getNewQuestions,
  getUpdatedQuestionOrders,
} from "../utils/diffQuestions";
import { useGenericMutation } from "@/app/_lib/mutations/customMutation";
import DragHandler from "../_component/_ui/DragHandler";
import ProgressBar from "../_component/_ui/ProgressBar";
import LoadingOverlay from "@/app/_components/_layout/LoadingOverlay";

const ApplyAdmin = () => {
  const {
    addNewQuestion,
    prevQuestionList,
    setQuestion,
    setLastPage,
    questionList,
    updateOrder,
    lastPage,
    currentPage,
    goToPrevPage,
    goToNextPage,
  } = useQuestionFormStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const currentPageQuestionList = useMemo(() => {
    return questionList.filter((q) => q.page === currentPage);
  }, [questionList, currentPage]);

  // 드래그 훅
  const { activeItem, sensors, handleDragStart, handleDragEnd } =
    useDragSort<QuestionItemType>({
      itemList: questionList,
      onUpdateOrder: updateOrder,
      idKey: "questionId",
    });

  // api
  const { data } = useQuery({
    queryKey: ["questionList"],
    queryFn: () => questionListApi(),
  });

  useEffect(() => {
    if (data) {
      const newData = data.data;
      setQuestion(newData.questionResponses);
      setLastPage(newData.lastPage);
    }
  }, [data]);

  useEffect(() => {
    console.log(questionList);
  }, [questionList]);

  const updateQuestionSuccess = () => {
    alert("폼이 수정되었습니다");
    router.push("/");
  };

  const { mutation: updateQuestionMutation } = useGenericMutation({
    mutationFn: updateQuestionApi,
    onMutateCb: () => setIsSubmitting(true),
    onSuccessCb: () => updateQuestionSuccess,
    onSettledCb: () => setIsSubmitting(false),
  });

  const submitQuestions = () => {
    const newQuestions = getNewQuestions(questionList);
    const modifiedQuestions = getModifiedQuestions(
      questionList,
      prevQuestionList
    );
    const updatedQuestionOrders = getUpdatedQuestionOrders({
      currentQuestionList: questionList,
      newQuestions,
    });

    console.log({
      modifiedQuestions,
      newQuestions,
      updatedQuestionOrders,
    });
    updateQuestionMutation.mutate({
      modifiedQuestions,
      newQuestions,
      updatedQuestionOrders,
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
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter} // 충돌 감지 알고리즘
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={currentPageQuestionList.map((item) => item.questionId)}
                strategy={verticalListSortingStrategy} // 정렬 전략 (세로 리스트)
              >
                {currentPageQuestionList.map((i, idx) => (
                  <SortableItem key={i.questionId} id={i.questionId}>
                    {({ listeners, attributes }) => (
                      <NewForm
                        page={i.page}
                        order={i.order}
                        questionId={i.questionId}
                        content={i.content}
                        questionType={i.questionType}
                        isDeletable={i.isDeletable}
                        isRequired={i.isRequired}
                        subQuestions={i.subQuestions}
                        dragHandler={
                          <DragHandler
                            listeners={listeners}
                            attributes={attributes}
                          />
                        }
                      />
                    )}
                  </SortableItem> // 각각 드래그 가능하게 만들어줌
                ))}
              </SortableContext>
              <DragOverlay>
                {activeItem ? (
                  <NewForm
                    page={activeItem.page}
                    order={activeItem.order}
                    questionId={activeItem.questionId}
                    content={activeItem.content}
                    questionType={activeItem.questionType}
                    isRequired={activeItem.isRequired}
                    isDeletable={activeItem.isDeletable}
                    subQuestions={activeItem.subQuestions}
                  />
                ) : null}
              </DragOverlay>
            </DndContext>
            <button
              type="button"
              className=" bg-point flex items-center justify-center rounded-xl px-6 py-3 hover:bg-hover font-bold text-white text-base"
              onClick={addNewQuestion}
            >
              {`질문 추가`}&nbsp; &nbsp;+
            </button>
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
                <Button onClick={goToNextPage} title={"다음"} bg="areaBg" />
                {currentPage === lastPage && (
                  <Button
                    onClick={submitQuestions}
                    title={"저장하기"}
                    bg="areaBg"
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyAdmin;

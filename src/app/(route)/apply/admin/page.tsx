"use client";
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

import DragHandler from "../_component/_ui/form/DragHandler";
import { useEffect } from "react";
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

const ApplyAdmin = () => {
  const {
    addNewQuestion,
    prevQuestionList,
    setQuestion,
    questionList,
    updateOrder,
  } = useQuestionFormStore();

  // 드래그 훅
  const { activeItem, sensors, handleDragStart, handleDragEnd } =
    useDragSort<QuestionItemType>({
      itemList: questionList,
      onUpdateOrder: updateOrder,
      idKey: "questionId",
    });

  // api
  const { isLoading, data, isError } = useQuery({
    queryKey: ["questionList"],
    queryFn: () => questionListApi(),
  });

  useEffect(() => {
    if (data) {
      const newData = data.data.questionResponses;
      console.log(data);
      setQuestion(newData);
    }
  }, [data]);

  const { mutation: updateQuestionMutation } = useGenericMutation({
    mutationFn: updateQuestionApi,
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

    updateQuestionMutation.mutate({
      modifiedQuestions,
      newQuestions,
      updatedQuestionOrders,
    });
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center my-[200px]">
        <div className="flex flex-col w-full max-w-[600px]">
          <Confirm />
          <form className="grid gap-[60px] mt-12">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter} // 충돌 감지 알고리즘
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={questionList.map((item) => item.questionId)}
                strategy={verticalListSortingStrategy} // 정렬 전략 (세로 리스트)
              >
                {questionList.map((i) => (
                  <SortableItem key={i.questionId} id={i.questionId}>
                    {({ listeners, attributes }) => (
                      <NewForm
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
            <Button title={"질문 추가"} plus={true} onClick={addNewQuestion} />
            <button type="button" onClick={submitQuestions}>
              제출
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyAdmin;

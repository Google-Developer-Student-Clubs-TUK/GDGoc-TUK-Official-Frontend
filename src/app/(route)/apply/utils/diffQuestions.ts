import { NewQuestion, QuestionItemType, ModifiedQuestion, QuestionOrder } from '../_type/formType';

export const getNewQuestions = (questionList: QuestionItemType[]): NewQuestion[] => {
  return questionList
    .filter((item) => item.questionId < 0)
    .map((newItem, idx) => ({
      questionId: -1 * (idx + 1),
      content: newItem.content,
      questionType: newItem.questionType,
      isRequired: newItem.isRequired,
      isDeletable: newItem.isDeletable,
      newSubQuestions: newItem.subQuestions.map((subItem) => ({
        newSubContent: subItem.subContent,
      })),
    }));
};

export const getModifiedQuestions = (
  questionList: QuestionItemType[],
  prevQuestionList: QuestionItemType[]
): ModifiedQuestion[] => {
  return questionList
    .filter((item) => {
      const prev = prevQuestionList.find(
        (p) => p.questionId === item.questionId
      );
      if (!prev) return false;

      const isSubQuestionChanged =
        item.subQuestions.length !== prev.subQuestions.length ||
        item.subQuestions.some((subItem, idx) => {
          const prevSub = prev.subQuestions[idx];
          return subItem.subContent !== prevSub.subContent;
        });

      const isContentChanged = item.content !== prev.content;
      const isQuestionTypeChanged = item.questionType !== prev.questionType;
      const isRequiredChanged = item.isRequired !== prev.isRequired;

      return (
        isSubQuestionChanged ||
        isContentChanged ||
        isQuestionTypeChanged ||
        isRequiredChanged
      );
    })
    .map((resultItem) => ({
      questionId: resultItem.questionId,
      modifiedContent: resultItem.content,
      questionType: resultItem.questionType,
      isRequired: resultItem.isRequired,
      modifiedSubQuestions: resultItem.subQuestions.map((subItem) => ({
        subQuestionId: subItem.subQuestionId,
        modifiedSubContent: subItem.subContent,
      })),
    }));
};

export const getUpdatedQuestionOrders = ({
  currentQuestionList,
  newQuestions,
  questionId
}: {
  questionId? : number
  currentQuestionList: QuestionItemType[];
  newQuestions?: NewQuestion[];
}): QuestionOrder[] => {
  let negativeIdx = 0;

  return currentQuestionList.filter((item) => item.questionId !== questionId).map((item, idx) => {
    if (item.questionId < 0 &&  newQuestions) {
      const newId = newQuestions[negativeIdx].questionId;
      negativeIdx++;
      return {
        questionId: newId,
        order: idx + 1,
      };
    }
   
    return {
      questionId: item.questionId,
      order: idx + 1,
    };
  });
};

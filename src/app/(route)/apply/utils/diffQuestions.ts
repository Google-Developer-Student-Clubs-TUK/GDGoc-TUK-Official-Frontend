import { NewQuestion, QuestionItemType, ModifiedQuestion, QuestionOrder,NewSubQuestion, ModifiedSubQuestion } from '../_type/formType';

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
    .map((item) => {
      const prev = prevQuestionList.find(
        (p) => p.questionId === item.questionId
      );
      if (!prev) return null;

      const newSubQuestions:NewSubQuestion[]= [];
      const modifiedSubQuestions : ModifiedSubQuestion[]= [];

      item.subQuestions.forEach((subItem) => {
        const prevSub = prev.subQuestions.find(
          (ps) => ps.subQuestionId === subItem.subQuestionId
        );

        if (!prevSub) {
          newSubQuestions.push({
            newSubContent: subItem.subContent,
          });

        } else if (subItem.subContent !== prevSub.subContent) {
          modifiedSubQuestions.push({
            subQuestionId: subItem.subQuestionId,
            modifiedSubContent: subItem.subContent,
          });
        }
      });

      const isContentChanged = item.content !== prev.content;
      const isQuestionTypeChanged = item.questionType !== prev.questionType;
      const isRequiredChanged = item.isRequired !== prev.isRequired;
      const isSubQuestionChanged =
        newSubQuestions.length > 0 || modifiedSubQuestions.length > 0;

      if (
        isContentChanged ||
        isQuestionTypeChanged ||
        isRequiredChanged ||
        isSubQuestionChanged
      ) {
        return {
          questionId: item.questionId,
          modifiedContent: item.content,
          questionType: item.questionType,
          isRequired: item.isRequired,
          newSubQuestions,
          modifiedSubQuestions,
        };
      }

      return null;
    })
    .filter((item): item is ModifiedQuestion => item !== null);
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

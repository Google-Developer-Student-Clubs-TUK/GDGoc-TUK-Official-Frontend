import ShortText from "../_component/_ui/form/formType/ShortText";
import LongText from "../_component/_ui/form/formType/LongText";
import SingleChoice from "../_component/_ui/form/formType/SingleChoice";
import MultipleChoice from "../_component/_ui/form/formType/MultipleChoice";
import { QuestionItemType } from "@/app/(route)/apply/_type/formType";

interface QuestionTypeMapType
  extends Pick<QuestionItemType, "questionId" | "subQuestions"> {
  admin: boolean;
  idx?: number;
  required?: boolean;
  onDeleteSubQuestion?: (questionId: number, subQuestionId: number) => void;
}

export const getQuestionTypeMap = ({
  questionId,
  subQuestions,
  onDeleteSubQuestion,
  admin,
  idx,
  required = false,
}: QuestionTypeMapType) => {
  return {
    SHORT_TEXT: {
      title: "단답형",
      component: <ShortText required={required} idx={idx} admin={admin} />,
    },
    LONG_TEXT: {
      title: "장문형",
      component: <LongText required={required} idx={idx} admin={admin} />,
    },
    SINGLE_CHOICE: {
      title: "선택형",
      component: (
        <SingleChoice
          idx={idx}
          required={required}
          deleteSubQuestion={onDeleteSubQuestion}
          questionId={questionId}
          subQuestions={subQuestions}
          admin={admin}
        />
      ),
    },
    MULTIPLE_CHOICE: {
      title: "체크형",
      component: (
        <MultipleChoice
          idx={idx}
          required={required}
          deleteSubQuestion={onDeleteSubQuestion}
          questionId={questionId}
          admin={admin}
          subQuestions={subQuestions}
        />
      ),
    },
  };
};

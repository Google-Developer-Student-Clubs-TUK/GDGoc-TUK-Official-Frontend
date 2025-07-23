import ShortText from "../_component/_ui/form/formType/ShortText";
import LongText from "../_component/_ui/form/formType/LongText";
import SingleChoice from "../_component/_ui/form/formType/SingleChoice";
import MultipleChoice from "../_component/_ui/form/formType/MultipleChoice";

import EmailForm from "../_component/_ui/form/formType/EmailForm";
import { ChoiceFormPropsType } from "../_type/formPropsType";

export const getQuestionTypeMap = ({
  questionId,
  subQuestions,
  onDeleteSubQuestion,
  admin,
  isRequired = false,
}: ChoiceFormPropsType) => {
  return {
    EMAIL: {
      title: "이메일",
      component: <EmailForm questionId={questionId} admin={admin} />,
    },

    SHORT_TEXT: {
      title: "단답형",
      component: (
        <ShortText
          isRequired={isRequired}
          questionId={questionId}
          admin={admin}
        />
      ),
    },
    LONG_TEXT: {
      title: "장문형",
      component: (
        <LongText
          isRequired={isRequired}
          questionId={questionId}
          admin={admin}
        />
      ),
    },
    SINGLE_CHOICE: {
      title: "선택형",
      component: (
        <SingleChoice
          isRequired={isRequired}
          onDeleteSubQuestion={onDeleteSubQuestion}
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
          isRequired={isRequired}
          onDeleteSubQuestion={onDeleteSubQuestion}
          questionId={questionId}
          admin={admin}
          subQuestions={subQuestions}
        />
      ),
    },
  };
};

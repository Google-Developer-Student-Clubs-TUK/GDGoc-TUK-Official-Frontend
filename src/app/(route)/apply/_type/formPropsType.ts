import { QuestionItemSubType } from "./formType";

export interface ChoiceFormPropsType {
  subQuestions: QuestionItemSubType [];
  questionId: number;
  deleteSubQuestion : (questionId: number, subQuestionId: number) => void
}

export interface TextFormPropsType {
  newItem: boolean;
}

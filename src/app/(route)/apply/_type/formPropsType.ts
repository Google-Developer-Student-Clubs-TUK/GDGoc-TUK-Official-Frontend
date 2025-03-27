import { QuestionItemSubType } from "./formType";

export interface ChoiceFormPropsType {
  subQuestions: QuestionItemSubType [];
  questionId: number;
}

export interface TextFormPropsType {
  newItem: boolean;
}

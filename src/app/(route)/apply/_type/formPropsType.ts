import { QuestionItemSubType } from "./formType";

export interface ChoiceFormPropsType {
  subQuestions: QuestionItemSubType [];
  questionId: number;
  admin: boolean;
  idx? : number;
  required: boolean;
  deleteSubQuestion? : (questionId: number, subQuestionId: number) => void
}

export interface TextFormPropsType {
  admin: boolean;
  idx? :  number
  required: boolean;
}

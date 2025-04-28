import { QuestionItemSubType } from "./formType";

export interface ChoiceFormPropsType {
  subQuestions?: QuestionItemSubType [];
  questionId: number;
  admin?: boolean;
  isRequired: boolean;
  onDeleteSubQuestion? : (questionId: number, subQuestionId: number) => void
}

export interface TextFormPropsType {
  admin?: boolean;
  questionId : number
  isRequired?: boolean;
}

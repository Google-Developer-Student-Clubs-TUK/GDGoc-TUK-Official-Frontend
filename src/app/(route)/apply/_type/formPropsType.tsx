import { NewSubQuestion } from "./formType";

export interface ChoiceFormPropsType {
  newSubQuestions: NewSubQuestion[];
  questionId: number;
}

export interface TextFormPropsType {
  newItem: boolean;
}

export type QuestionsType =
  | "SHORT_TEXT"
  | "LONG_TEXT"
  | "SINGLE_CHOICE"
  | "MULTIPLE_CHOICE";

export interface BaseQuestion {
  questionId: number;
  questionType: string;
  isRequired: boolean;
}

// 수정
export interface ModifiedSubQuestion {
  modifiedSubContent: string;
  subQuestionId: number;
}

export interface ModifiedQuestion extends BaseQuestion {
  modifiedContent: string;
  modifiedSubQuestions: ModifiedSubQuestion[];
}

// new
export interface NewSubQuestion {
  newSubContent: string;
}

export interface NewQuestion extends BaseQuestion {
  content: string;
  newSubQuestions: NewSubQuestion[];
}

// 순서변경
export interface QuestionOrder {
  questionId: number;
  order: number;
}

// 최종
export interface FormType {
  modifiedQuestions: ModifiedQuestion[];
  newQuestions: NewQuestion[];
  updatedQuestionOrders: QuestionOrder[];
}

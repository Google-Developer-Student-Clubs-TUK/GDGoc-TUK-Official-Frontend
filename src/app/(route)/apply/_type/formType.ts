

export interface BaseQuestion {
  questionType: string;
  order?: number;
  isRequired: boolean;
  isDeletable?: boolean;
}

// 수정
export interface ModifiedSubQuestion {
  modifiedSubContent: string;
  subQuestionId: number;
}

export interface ModifiedQuestion extends BaseQuestion {
  questionId: number;
  modifiedContent: string;
  modifiedSubQuestions: ModifiedSubQuestion[];
  newSubQuestions :  NewSubQuestion[]
}

// new
export interface NewSubQuestion {
  newSubContent: string;
}

export interface NewQuestion extends BaseQuestion {
  questionId: number;
  content: string;
  page:number
  newSubQuestions: NewSubQuestion[];
}

// 순서
export interface QuestionOrder {
  questionId: number;
  order: number;
}

// 최종
export interface UpdateQuestionFormType {
  modifiedQuestions: ModifiedQuestion[];
  newQuestions: NewQuestion[];
  updatedQuestionOrders: QuestionOrder[];
}

export interface QuestionItemSubType {
  subQuestionId: number;
  subContent: string;
}


export interface QuestionItemType extends BaseQuestion {
  questionId : number,
  page:number
  content: string,
  subQuestions:  QuestionItemSubType [];
}


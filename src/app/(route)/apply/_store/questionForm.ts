import { create } from "zustand";
import {  QuestionItemType} from "../_type/formType";

interface QuestionFormStoreType{
  prevQuestionList : QuestionItemType[],
  questionList : QuestionItemType[],
  nextQuestionId: number;
  nextSubQuestionId: number;

  // setQuestion
  setQuestion: (question :  QuestionItemType[]) => void

  // 
  addNewQuestion : () => void;
  deleteNewQuestion : (idx : number) => void;
  updateField: <T extends keyof  QuestionItemType>(questionId: number, field: T, value:  QuestionItemType[T]) => void;


  // subQuestion handler
  addSubQuestion : (questionId: number) => void
  deleteSubQuestion : (questionId: number , idx : number )=> void
  updateSubField : (questionId: number , idx : number , value :string) => void
  
  // order
  updateOrder : (newOrder :  QuestionItemType[]) => void



}


export const useQuestionFormStore = create<QuestionFormStoreType>((set,get) => ({
  prevQuestionList : [],
  questionList : [],
  nextQuestionId : -1,
  nextSubQuestionId :1,

  updatedQuestionOrders  : [],


  setQuestion: (question :QuestionItemType[] ) => {
    set(() => ({  questionList: question  ,  prevQuestionList  :   question }));
  },

  addNewQuestion: () => {

    // 상태를 여러 번 읽고 사용  -> get() 사용
    const prev = get();
    const prevQuestions = prev.questionList;
    const prevNextQuestionId = prev.nextQuestionId;
    
  
  
    set({
      questionList : [
        ...prevQuestions,
        {
          questionId: prevNextQuestionId,
          content: "",
          questionType: "SHORT_TEXT",
          isRequired: false,
          isDeletable: true,
          subQuestions: [],
          order: prevQuestions.length + 1
        },
      ],
      nextQuestionId : prevNextQuestionId -1

     
  
    });
  },
  


    deleteNewQuestion: (questionId) =>
      set((prev) => ({
        questionList : prev.questionList.filter((q) =>
          q.questionId !== questionId  
        ),
    })),


    updateField: (questionId, field, value) =>
      set((prev) => ({
        questionList : prev.questionList.map((q) =>
          q.questionId === questionId ? { ...q, [field]: value } : q
        ),
    })),

    addSubQuestion: (questionId: number) =>
      set((prev) => ({
        questionList : prev.questionList.map((q) =>
          q.questionId === questionId
            ? {
                ...q,
                subQuestions: [...q.subQuestions, {   subQuestionId: prev.nextSubQuestionId  ,  subContent: "" }],
              }
            : q
        ),
        nextSubQuestionId : prev.nextSubQuestionId + 1
      }),
    ),

    deleteSubQuestion : (questionId: number, idx : number ) => set((prev) => ({
      questionList : prev.questionList.map((q) =>
        q.questionId === questionId
          ? {
              ...q,
              subQuestions: q.subQuestions.filter((_, index) => index !== idx),
            }
          : q
      ),
    })),

    updateSubField :  (questionId: number, idx : number , value : string )  => set((prev) => ({
      questionList : prev.questionList.map((q) =>
        q.questionId === questionId
          ? {
              ...q,
              subQuestions: q.subQuestions.map((item, index) => (index === idx ? { ...item,  subContent: value } : item)),
            }
          : q
      ),
    })),

    // order
    updateOrder : (newOrder :  QuestionItemType[]) => set(() => ({
      questionList: newOrder,
    }))


}));
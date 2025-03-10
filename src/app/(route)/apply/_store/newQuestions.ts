import { create } from "zustand";
import { NewQuestion } from "../_type/formType";

interface NewQuestionsStoreType{
  newQuestions :  NewQuestion [],
  addNewQuestion : () => void;
  deleteNewQuestion : (idx : number) => void;
  updateNewField: <T extends keyof NewQuestion>(questionId: number, field: T, value: NewQuestion[T]) => void;


  // SubQuestion handler
  addSubQuestion : (questionId: number) => void
  deleteSubQuestion : (questionId: number , idx : number )=> void
  updateSubField : (questionId: number , idx : number , value :string) => void 
}


export const useNewQuestionsStore = create<NewQuestionsStoreType>((set,get) => ({
  newQuestions : [],
  addNewQuestion : () =>
    set((prev) => {
      const prevQuestions = prev.newQuestions
      const NewQuestionId = prevQuestions.length > 0 ? prevQuestions[prevQuestions.length -1].questionId -1 : -1 ;
      return {
        newQuestions: [
          ...prev.newQuestions,
          {
            questionId:  NewQuestionId, 
            content: "",
            questionType: "SHORT_TEXT",
            isRequired: false,
            newSubQuestions: [],
          },
        ],
      };
    }),
      

    deleteNewQuestion: (questionId) =>
      set((prev) => ({
        newQuestions: prev.newQuestions.filter((q) =>
          q.questionId !== questionId  
        ),
    })),


    updateNewField: (questionId, field, value) =>
      set((prev) => ({
        newQuestions: prev.newQuestions.map((q) =>
          q.questionId === questionId ? { ...q, [field]: value } : q
        ),
    })),

    addSubQuestion: (questionId: number) =>
      set((prev) => ({
        newQuestions: prev.newQuestions.map((q) =>
          q.questionId === questionId
            ? {
                ...q,
                newSubQuestions: [...q.newSubQuestions, { newSubContent: "" }],
              }
            : q
        ),
      })),

    deleteSubQuestion : (questionId: number, idx : number ) => set((prev) => ({
      newQuestions: prev.newQuestions.map((q) =>
        q.questionId === questionId
          ? {
              ...q,
              newSubQuestions: q.newSubQuestions.filter((_, index) => index !== idx),
            }
          : q
      ),
    })),

    updateSubField :  (questionId: number, idx : number , value : string )  => set((prev) => ({
      newQuestions: prev.newQuestions.map((q) =>
        q.questionId === questionId
          ? {
              ...q,
              newSubQuestions: q.newSubQuestions.map((item, index) => (index === idx ? { newSubContent: value } : item)),
            }
          : q
      ),
    })),

}));
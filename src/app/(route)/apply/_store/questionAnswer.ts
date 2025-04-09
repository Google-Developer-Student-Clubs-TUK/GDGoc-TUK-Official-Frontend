import { create } from "zustand";
import { QuestionItemType } from "../_type/formType";
import { AnswerItemType } from "../_type/answerType";

interface QuestionAnswerStoreType {
    questionAnswerList : AnswerItemType []
    // setQuestion
    setAnswer: (idx: number, value: string, type: "single" | "multi") => void
    resetAnswers: (question :  QuestionItemType[])=> void
}

  export const useQuestionAnswerStore= create<QuestionAnswerStoreType>((set,get) => ({
    questionAnswerList: [],
     
    // 초기화
    resetAnswers: (question : QuestionItemType[]) => {
      const emptyAnswers = question.map((q) => ({
        questionId: q.questionId,
        question :  q.content,
        isRequired : q.isRequired,
        contents:[]
      }));
      set({ questionAnswerList: emptyAnswers });
    },

    // 답변 설정
    setAnswer: (idx, value, type) => {
      set((state) => {
        const updated = [...state.questionAnswerList];
        const existingContent = updated[idx].contents;
    
        if (type === "single") {
          // ✅ 단일 선택 → 값을 하나만 가진 배열로 교체
          updated[idx].contents = [value];
        } else {
          // ✅ 멀티 선택 → 토글 방식
          if (existingContent.includes(value)) {
            updated[idx].contents = existingContent.filter((v) => v !== value);
          } else {
            updated[idx].contents = [...existingContent, value];
          }
        }
        return { questionAnswerList: updated };
      });
    },
    
    
}));



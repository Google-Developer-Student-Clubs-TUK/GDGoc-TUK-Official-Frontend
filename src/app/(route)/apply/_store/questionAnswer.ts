import { create } from "zustand";

interface QuestionAnswerStoreType {
  questionAnswerList :string[][];
    // setQuestion
    setAnswer: (idx: number, value: string, type: "single" | "multi") => void
    resetAnswers: (questionListLength: number) => void
}

  export const useQuestionAnswerStore= create<QuestionAnswerStoreType>((set,get) => ({
    questionAnswerList: [],
     
    // 초기화
    resetAnswers: (questionListLength) => {
    const emptyAnswers = Array.from({ length: questionListLength }, () => []);
    set({ questionAnswerList: emptyAnswers });
    },

    // 답변 설정
    setAnswer: (idx, value, type) => {
    set((state) => {
      const updated = [...state.questionAnswerList];

      if (type === "single") {
        updated[idx] = [value];
      } else {
        const existing = updated[idx];
        if (existing.includes(value)) {
          //  이미 있으면 제거 
          updated[idx] = existing.filter((v) => v !== value);
        } else {
          //  없으면 추가 
          updated[idx] = [...existing, value];
        }
      }

      return { questionAnswerList: updated };
    });
  },
}));



import { create } from "zustand";
import { QuestionItemType } from "../_type/formType";
import { AnswerItemType } from "../_type/answerType";

interface QuestionAnswerStoreType {
  questionAnswerList: AnswerItemType[];
  setAnswer: (questionId: number, value: string, type: "single" | "multi") => void;
  resetAnswers: (questions: QuestionItemType[]) => void;
}

export const useQuestionAnswerStore = create<QuestionAnswerStoreType>((set) => ({
  questionAnswerList: [],

  // 초기화
  resetAnswers: (questions) => {
    const emptyAnswers = questions.map((q) => ({
      questionId: q.questionId,
      question: q.content,
      isRequired: q.isRequired,
      page: q.page,
      contents: [],
    }));
    set({ questionAnswerList: emptyAnswers });
  },

  setAnswer: (questionId, value, type) => {
    set((state) => {
      const updated = [...state.questionAnswerList];
      const targetIdx = updated.findIndex((item) => item.questionId === questionId);
      if (targetIdx === -1) return { questionAnswerList: updated };

      const existingContent = updated[targetIdx].contents;

      if (type === "single") {
        updated[targetIdx].contents = [value];
      } else {
        if (existingContent.includes(value)) {
          updated[targetIdx].contents = existingContent.filter((v) => v !== value);
        } else {
          updated[targetIdx].contents = [...existingContent, value];
        }
      }
      return { questionAnswerList: updated };
    });
  },
}));

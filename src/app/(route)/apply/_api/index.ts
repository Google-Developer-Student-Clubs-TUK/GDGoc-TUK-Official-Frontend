import { baseAPI } from "@/app/_lib/customApi";
import { QuestionOrder, UpdateQuestionFormType } from "../_type/formType";

export const updateQuestionApi = async (questionList: UpdateQuestionFormType) => {
  const data = await baseAPI.post("/questions", questionList);
  return data;
};


export const questionListApi = async () => {
  const data = await baseAPI.get("/questions");
  return data;
};


export const deleteQuestionApi = async ({
  questionId,
  questionOrders,
}: {
  questionId: number;
  questionOrders: QuestionOrder[];
}) => {
  const data = await baseAPI.delete(`/questions/parent/${questionId}`, {
    data: { questionId, questionOrders },
  });
  return data;
};


export const deleteSubQuestionApi = async ({
  questionId,
  subQuestionId
}: {
  questionId: number;
  subQuestionId: number;
}) => {
  const data = await baseAPI.delete(`/questions/parent/${questionId}/child/${subQuestionId}`, {
    data: { questionId,subQuestionId },
  });
  return data;
};


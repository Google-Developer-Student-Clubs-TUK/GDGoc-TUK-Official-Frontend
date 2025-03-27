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
  const data = await baseAPI.delete(`/questions/${questionId}`, {
    data: { questionId, questionOrders },
  });
  return data;
};

import { baseAPI } from "@/app/_lib/customApi";
import { QuestionOrder, UpdateQuestionFormType } from "../_type/formType";
import { EmailType ,EmailCodeType} from "../_type/emailType";

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

export const questionAnswerApi = async (answer:any) => {

  const data = await baseAPI.post("/answers",answer);
  return data;
};


export const emailApi = async (email :EmailType  ) => {
  const data = await baseAPI.post("/emails",email );
  return data;
};


export const emailCodeApi = async (emailCode :EmailCodeType  ) => {
  const data = await baseAPI.post("/emails/code",emailCode );
  return data;
};


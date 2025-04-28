import { baseAPI } from "@/app/_lib/customApi";
import { FiltersType } from "../_type";

export const memberManageListApi = async ({
  page,
  size,
  ...filters
}: {
  page: number;
  size: number;
} & FiltersType) => {
  const params: Record<string, unknown> = {
    page,
    size,
    ...filters,
  };

  return await baseAPI.get("/generation-members/management", { params });
};




export const applicantsApi = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  return await baseAPI.get("/applicants", { params : {
    page: page,
    size: size
  } });
};



export const applicantAnswerApi = async ({
  applicantId
}: {
  applicantId: number
}) => {
  return await baseAPI.get(`/answers/applicants/${applicantId}`, { params : {
   applicantId :   applicantId
  } });
};



export const applicantPassApi = async (applicantId: number ) => {
  return await baseAPI.post(`/applicants/${applicantId}`, {
    role: "ROLE_MEMBER",
  });
};


export const applicantRejectApi = async (applicantId: number) => {
  return await baseAPI.patch(`/applicants/${applicantId}`);
};

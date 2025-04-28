import { baseAPI } from "@/app/_lib/customApi";
import { FiltersType } from "../_type";
import { RoleType } from "../../apply/_type/answerType";

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



export const applicantPassApi = async ({applicantId, role }:{applicantId: number , role : RoleType | null } ) => {

  /* 추후 제거 */
  const finalRole: RoleType = role ?? "ROLE_MEMBER"; 

  return await baseAPI.post(`/applicants/${applicantId}`, {
    finalRole
  });
};


export const applicantRejectApi = async (applicantId: number) => {
  return await baseAPI.patch(`/applicants/${applicantId}`);
};

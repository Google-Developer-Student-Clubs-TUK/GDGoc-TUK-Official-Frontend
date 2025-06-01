import { EnrollMentType, FieldType, GenderType, RoleType, UniversityYearType } from "../../apply/_type/answerType";

export interface  MemberInfoType  {
  name: string;
  studentNumber: string;
  email: string;
  field: FieldType
  gender: GenderType
  generation: string
  enrollmentStatus:  EnrollMentType
  major: string;
  universityYear: UniversityYearType
  // phoneNumber? : number
  role: RoleType
};

export type FiltersType = {
  name?: string;
  field?: string;
  enrollmentStatus?: string;
  generation?: string;
};



export type FilterTitle = "직군" | "학적 상태" | "활동년도";


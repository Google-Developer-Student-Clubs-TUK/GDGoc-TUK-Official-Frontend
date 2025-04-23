import { MemberInfoType } from "../_type";
export const columnTitles = [
  "번호",
  "이름",
  "직군",
  "학번",
  "학과",
  "이메일",
  "성별",
  "상태",
  "학년",
  "활동년도",
  "구분",

];

export const columnKeys: (keyof MemberInfoType | "id")[] = [
  "id",
  "name",
  "field",
  "studentNumber",
  "major",
  "email",
  "gender",
  "enrollmentStatus",
  "universityYear",
  "generation",
  "role",
];




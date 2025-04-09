import { MemberProfileType } from "../_type/answerType";

export const requiredAnswerKeyMap: Record<string, keyof MemberProfileType> = {
  이름: "name",
  학번: "studentNumber",
  "학교 이메일": "email",
  직군: "field",
  성별: "gender",
  "오거나이저/멤버": "enrollmentStatus",
  // 연락처: "",
  학과: "major",
  학년: "universityYear",
};


export const korToEngMap: Record<string, Record<string, string>> = {
  성별: {
    여: "WOMAN",
    남: "MAN",
  },
  재학상태: {
    재학: "ENROLLED",
    휴학: "LEAVE_OF_ABSENCE",
  },
  직군: {
    프론트엔드: "FRONT_END",
    백엔드: "BACK_END",
    디자인: "DESIGN",
  },
  학년: {
    "1학년": "FRESHMAN",
    "2학년" : "SOPHOMORE",
    "3학년" : "JUNIOR",
    "4학년" :"SENIOR",
  },
};
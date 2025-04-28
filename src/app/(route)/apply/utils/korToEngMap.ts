import { MemberProfileType } from "../_type/answerType";

export const getValueFromLabel = (field: string, label: string): string => {
  return valueLabelMap[field]?.[label] ?? label;
};

export const getLabelFromValue = (field: string, value: string): string => {
  const map = valueLabelMap[field];
  if (!map) return value;

  const found = Object.entries(map).find(([, val]) => val === value);
  return found?.[0] ?? value;
};


export const valueLabelMap:  Record<string, Record<string, string>> = {
  성별: {
    여: "WOMAN",
    남: "MAN",
  },
  "학적 상태": {
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

  "오거나이저/멤버" : {
    오거나이저 : "ROLE_ORGANIZER",
    멤버 : "ROLE_MEMBER",
    리더 : "ROLE_LEADER"
  },

  "활동년도" : {
  "2024" : "2024"
  },


 
};




export const requiredAnswerKeyMap: Record<string, keyof MemberProfileType> = {
  이름: "name",
  학번: "studentNumber",
  "학교 이메일": "email",
  직군: "field",
  성별: "gender",
  "오거나이저/멤버":"role",
  연락처: "phoneNumber",
  "학적 상태":"enrollmentStatus",
  학과: "major",
  학년: "universityYear",
};


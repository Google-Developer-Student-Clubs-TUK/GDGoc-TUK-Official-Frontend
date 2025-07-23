export type  EnrollMentType =
  | "ENROLLED"
  | "LEAVE_OF_ABSENCE"

  export type UniversityYearType =
  | "FRESHMAN"
  | "SHOPHOMORE"
  | "JUNIOR"
  | "SENIOR"

  export type  FieldType=
  | "FRONT_END"
  | "BACK_END"
  | "DESIGN"

  export type  GenderType=
  | "WOMAN"
  | "MAN"


  export type RoleType =
  | "ROLE_MEMBER"
  | "ROLE_ORGANIZER"
  | "ROLE_LEADER"



  export interface AnswerItemType {
    questionId: number;
    question: string;
    isRequired : boolean;
    contents: string[] 
  }



  export interface  MemberProfileType  {
    name: string; 
    phoneNumber : number
    email: string;
    universityYear: UniversityYearType
    field: FieldType
    role :  RoleType;
    studentNumber: string; 
    generation?: string // 기수
    major: string;
    gender: GenderType
    enrollmentStatus:  EnrollMentType
 
  };




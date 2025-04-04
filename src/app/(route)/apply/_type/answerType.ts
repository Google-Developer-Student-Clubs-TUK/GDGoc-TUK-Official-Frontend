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




  export interface AnswerPostType {
    requiredAnswer: {
      name: string
      studentNumber:  string
      enrollmentStatus: EnrollMentType
      universityYear: UniversityYearType
      field:  FieldType
      gender: GenderType
      email:  string
      major:  string
    },
    answers: string[][],
    questionAndAnswerJson: string
  }
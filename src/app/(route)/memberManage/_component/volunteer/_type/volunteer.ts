import { EnrollMentType, FieldType, GenderType, RoleType } from "@/app/(route)/apply/_type/answerType"

export interface VolunteerItemType {
  applicantId : number
  enrollmentStatus : EnrollMentType,
  field : FieldType,
  gender : GenderType
  major : string
  name : string
  role : RoleType
}

export interface Volunteer {
  id: number;
  name: string;
  gender: "남" | "여";
  enrolled: "재학" | "휴학";
  department: string; // 학과 
  classification: "오거나이저" | "일반멤버";
  occupation: "프론트" | "백엔드" | "디자인";
}

export const dummyVolunteers: Volunteer[] = [
  {
    id: 1,
    name: "김지원",
    gender: "여",
    department: "컴퓨터공학과",
    enrolled: "재학",
    classification: "오거나이저",
    occupation: "프론트",
  },
  {
    id: 2,
    name: "박철수",
    gender: "남",
    department: "전자공학과",
    enrolled: "재학",
    classification: "일반멤버",
    occupation: "디자인",
  },
  {
    id: 3,
    name: "이영희",
    gender: "여",
    enrolled: "휴학",
    department: "산업디자인과",
    classification: "일반멤버",
    occupation: "백엔드",
  },
  {
    id: 4,
    name: "최민수",
    gender: "남",
    department: "정보보호학과",
    enrolled: "재학",
    classification: "일반멤버",
    occupation: "백엔드",
  },
  {
    id: 5,
    name: "정하늘",
    gender: "여",
    department: "미디어학과",
    enrolled: "재학",
    classification: "오거나이저",
    occupation: "디자인",
  },
  {
    id: 6,
    name: "이도윤",
    gender: "남",
    department: "소프트웨어학과",
    enrolled: "휴학",
    classification: "일반멤버",
    occupation: "프론트",
  },
  {
    id: 7,
    name: "김하린",
    gender: "여",
    department: "시각디자인학과",
    enrolled: "재학",
    classification: "일반멤버",
    occupation: "디자인",
  },
  {
    id: 8,
    name: "한예준",
    gender: "남",
    department: "기계공학과",
    enrolled: "재학",
    classification: "일반멤버",
    occupation: "백엔드",
  },
  {
    id: 9,
    name: "이수민",
    gender: "여",
    department: "산업공학과",
    enrolled: "재학",
    classification: "오거나이저",
    occupation: "프론트",
  },
  {
    id: 10,
    name: "장현우",
    gender: "남",
    department: "화학공학과",
    enrolled: "휴학",
    classification: "일반멤버",
    occupation: "프론트",
  },
  {
    id: 11,
    name: "문서연",
    gender: "여",
    department: "경영학과",
    enrolled: "재학",
    classification: "일반멤버",
    occupation: "디자인",
  },
  {
    id: 12,
    name: "백승호",
    gender: "남",
    department: "통계학과",
    enrolled: "재학",
    classification: "오거나이저",
    occupation: "백엔드",
  },
];

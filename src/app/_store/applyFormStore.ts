// import { create } from "zustand";

// interface ApplyFormType {
//   name: string;
//   phoneNumber: string;
//   email: string;
//   grade: string;
//   studentStatus: boolean;
//   department: string;
//   studentNumber: number;
//   objective: string;
// }

// interface ApplyFormStoreType extends ApplyFormType {
//   setName: (newState: string) => void;
//   setPhoneNumber: (newState: string) => void;
//   setEmail: (newState: string) => void;
//   setGrade: (newState: string) => void;
//   setStudentStatus: () => void;
//   setDepartment : (newState: string) => void;
//   setStudentNumber : (newState: number) => void;
//   setObjective : (newState: string) => void;
//   getFormData: () => ApplyFormType;
// }

// export const useApplyFormStore = create<ApplyFormStoreType>((set, get) => ({
//   name: '',
//   phoneNumber: '',
//   email: '',
//   grade: '1학년',
//   studentStatus: true,
//   department: '컴퓨터공학부 소프트웨어전공',
//   studentNumber: 20204762,
//   objective: '프론트엔드',

//   setName: (newState) => set({ name: newState }),
//   setPhoneNumber: (newState) => set({  phoneNumber: newState }),
//   setEmail: (newState) => set({ email: newState }),
//   setGrade: (newState) => set({ grade: newState }),
//   setStudentStatus: () => set((prev) => ({ studentStatus: !prev.studentStatus })),
//   setDepartment: (newState) => set({  department: newState }),
//   setStudentNumber: (newState) => set({ studentNumber: newState }),
//   setObjective: (newState) => set({ objective:newState }),

//   getFormData: () => ({
//     name: get().name,
//     phoneNumber: get().phoneNumber,
//     email: get().email,
//     grade: get().grade,
//     studentStatus: get().studentStatus,
//     department: get().department,
//     studentNumber: get().studentNumber,
//     objective: get().objective,
//   }),
// }));

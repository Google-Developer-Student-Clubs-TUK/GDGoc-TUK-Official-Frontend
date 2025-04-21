
import { create } from "zustand";
import { MemberProfileType } from "../../apply/_type/answerType";

interface MemberListState {
  filters: {
    name?: string;
    field?: string;
    enrollmentStatus?: string;
    generation?: string;
  };
  memberList: MemberProfileType[];
  setFilter: <K extends keyof MemberListState["filters"]>(
    key: K,
    value:MemberListState["filters"][K]
  ) => void;
  setMemberList: (list: MemberProfileType[]) => void;

}

export const useMemberListStore = create<MemberListState>((set) => ({
  filters: {},
  memberList: [],
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  setMemberList: (list) => set({ memberList: list }),
}));

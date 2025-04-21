import { valueLabelMap } from "@/app/(route)/apply/utils/korToEngMap";


export const getSelectedLabel = (
  title: "직군" | "상태" | "활동년도",
  filters?: {
    field?: string;
    enrollmentStatus?: string;
    generation?: string;
  }
) => {
  if (!filters) return "전체"; // ✅ undefined 방어

  const filterValue =
    title === "직군"
      ? filters.field
      : title === "상태"
      ? filters.enrollmentStatus
      : filters.generation;

  const labelMap = valueLabelMap[title];
  return Object.entries(labelMap).find(([, v]) => v === filterValue)?.[0] || "전체";
};

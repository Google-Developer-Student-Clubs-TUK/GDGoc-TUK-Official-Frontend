import { valueLabelMap } from "@/app/(route)/apply/utils/korToEngMap";
import { FiltersType, FilterTitle } from "../_type";



// 필터 키 매핑
export const FILTER_KEY_MAP = {
  직군: "field",
  "학적 상태": "enrollmentStatus",
  활동년도: "generation",
} as const;

// 필터 키 리스트
export const FILTER_KEYS = Object.keys(FILTER_KEY_MAP) as FilterTitle[];



// 필터 옵션들 리스트
export const getFilterOptions = (generations: string[]): Record<FilterTitle, string[]> => ({
  직군: Object.keys(valueLabelMap["직군"]),
  "학적 상태": Object.keys(valueLabelMap["학적 상태"]),
  활동년도: generations,
});


// 필터 선택 핸들러
export const handleFilterSelect = (
  type: FilterTitle,
  label: string,
  setFilter: <K extends keyof FiltersType>(key: K, value: FiltersType[K]) => void,
) => {
  let value: string;
  
  if (type === "활동년도") {
    value = label; //  활동년도는 api 연동 된거라 그냥 쓰면 됌
  } else {
    value = valueLabelMap[type][label];
  }
  const key = FILTER_KEY_MAP[type];
  setFilter(key, value);
};


// 선택된 라벨 얻기
export const getSelectedLabel = (title: FilterTitle, filters?: FiltersType) => {
  const key = FILTER_KEY_MAP[title];
  const value = filters?.[key];
  const labelMap = valueLabelMap[title];
  return Object.entries(labelMap).find(([, v]) => v === value)?.[0] || "전체";
};
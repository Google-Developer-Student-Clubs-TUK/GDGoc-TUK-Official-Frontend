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

// 필터 옵션
export const filterOptions: Record<FilterTitle, string[]> = Object.fromEntries(
  FILTER_KEYS.map((key) => [key, Object.keys(valueLabelMap[key])])
) as Record<FilterTitle, string[]>;


// 필터 선택 핸들러
export  const handleFilterSelect = (type: FilterTitle, label: string,  setFilter: <K extends keyof FiltersType>(key: K, value: FiltersType[K]) => void) => {
  const value = valueLabelMap[type][label];
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
import DefaultInput from "@/app/_components/_ui/DefaultInput";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { memberManageListApi } from "../../_api";
import Pagination from "../Pagination";
import Image from "next/image";
import { columnKeys, columnTitles } from "../../_constants/memberData";
import { getLabelFromValue } from "@/app/(route)/apply/utils/korToEngMap";
import DropDown from "./DropDown";
import {
  FILTER_KEYS,
  getFilterOptions,
  getSelectedLabel,
  handleFilterSelect,
} from "../../_utils/memberFilter";
import { useMemberListStore } from "../../_store/memberList";
import { FilterTitle } from "../../_type";
import { useGenerationStore } from "../../_store/generations";

const MemberList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [openModal, setOpenModal] = useState<FilterTitle | null>(null);

  // 전체 기수 가져옴
  const { generations } = useGenerationStore();
  const filterOptions = getFilterOptions(generations);

  const { filters, setFilter, memberList, setMemberList } =
    useMemberListStore();

  const { isLoading, data } = useQuery({
    queryKey: ["memberManageList", currentPage, filters],
    queryFn: () =>
      memberManageListApi({
        page: currentPage - 1,
        size: 4,
        field: filters.field,
        enrollmentStatus: filters.enrollmentStatus,
        generation: filters.generation,
        name: filters.name,
      }),
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setTotalPage(data.data.totalPage);
      setCurrentPage(data.data.currentPage + 1);
      setMemberList(data.data.memberManagementResponses);
    }
  }, [data]);

  const toggleSelect = (idx: number) => {
    if (selected.includes(idx)) {
      setSelected(selected.filter((i) => i !== idx));
    } else {
      setSelected([...selected, idx]);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="relative" style={{ width: "362px" }}>
          <input
            type="text"
            placeholder="이름을 검색하세요."
            value={filters.name || ""}
            onChange={(e) => setFilter("name", e.target.value)}
            className={`pr-12 text-white px-4 py-3 w-full rounded-[999px] placeholder:text-gray300 bg-gray500 placeholder:font-normal`}
          />
          <Image
            src="/icon/search.png"
            alt="검색"
            width={16}
            height={16}
            className="min-w-[16px] min-h-[16px] object-contain absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
          />
        </div>
        <div className="bg-gray500 rounded-xl cursor-pointer">
          {!isEditing ? (
            <div
              className="py-3 px-4 gap-2 flex items-center hover:bg-gray700"
              onClick={() => setIsEditing(true)}
            >
              <p className="text-base font-bold text-white">편집하기</p>
              <div className="relative w-4 h-4">
                <Image
                  src="/icon/memberManage/Edit.png"
                  alt="편집하기"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ) : (
            <div className="flex">
              <div
                className="py-3 px-4 flex items-center hover:bg-gray700 rounded-l-xl"
                onClick={() => {
                  setIsEditing(false);
                  setSelected([]);
                }}
              >
                <p className="text-base font-bold text-white">취소하기</p>
                <div className="relative w-4 h-4">
                  <Image
                    src="/icon/memberManage/cancle.png"
                    alt="취소하기"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="py-3 px-4 flex items-center hover:bg-gray700 rounded-r-xl">
                <p className="text-base font-bold text-white">영구 제외하기</p>
                <div className="relative w-4 h-4">
                  <Image
                    src="/icon/memberManage/minus.png"
                    alt="영구제외하기"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-auto mt-6 mb-10">
        <table className="min-w-full table-auto text-sm text-white">
          <thead>
            <tr className="bg-gray700">
              {isEditing && <th className="px-6 py-3 text-center w-[40px]" />}
              {columnTitles.map((title, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === columnTitles.length - 1;
                const isFilter = FILTER_KEYS.includes(title as FilterTitle);

                return (
                  <th
                    key={idx}
                    className={`px-6 py-3 text-center relative ${
                      isFirst && !isEditing ? "rounded-l-xl" : ""
                    } ${isLast ? "rounded-r-xl" : ""}`}
                  >
                    {!isFilter ? (
                      title
                    ) : (
                      <div>
                        {openModal === title && (
                          <DropDown
                            list={filterOptions[title as FilterTitle]}
                            onClick={(label: string) => {
                              setOpenModal(null);
                              handleFilterSelect(
                                title as FilterTitle,
                                label,
                                setFilter
                              );
                            }}
                          />
                        )}
                        <p
                          onClick={() =>
                            setOpenModal(
                              openModal === title
                                ? null
                                : (title as FilterTitle)
                            )
                          }
                          className="inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>{title} :</span>
                          <span className="relative text-[#FFBA00] font-bold after:content-[''] after:inline-block after:absolute after:ml-1 after:bg-[url('/icon/arrow_bottom.png')] after:w-5 after:h-5 after:bg-no-repeat after:bg-contain">
                            {getSelectedLabel(title as FilterTitle, filters)}
                          </span>
                        </p>
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray600">
            {memberList.map((member, idx) => {
              const isSelected = selected.includes(idx);
              const isDimmed = selected.length > 0 && !isSelected;

              return (
                <tr
                  key={idx}
                  onClick={() => {
                    if (isEditing) toggleSelect(idx);
                  }}
                  className={`transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[rgba(0,161,80,0.2)]"
                      : "bg-gray800 hover:bg-gray500"
                  }`}
                >
                  {isEditing && (
                    <td className="px-4 py-3 text-center">
                      <div className="relative w-[20px] h-[20px] mx-auto">
                        <Image
                          src={`/icon/memberManage/${
                            isSelected
                              ? "check_circle.png"
                              : "uncheck_circle.png"
                          }`}
                          alt="체크박스"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </td>
                  )}
                  {columnKeys.map((key, i) => (
                    <td
                      key={i}
                      className={`px-4 py-3 text-center whitespace-nowrap ${
                        isDimmed ? "text-gray300" : "text-white"
                      }`}
                    >
                      {key === "id"
                        ? (currentPage - 1) * 4 + idx + 1
                        : getLabelFromValue(columnTitles[i], member[key] || "")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2 justify-center">
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default MemberList;

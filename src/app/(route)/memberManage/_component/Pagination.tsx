import React, { useState } from "react";
import Image from "next/image";
interface PaginationProps {
  totalPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pageGroupSize?: number; // 한 그룹당 페이지 수 (기본 4)
}

const Pagination = ({
  totalPage,
  currentPage,
  onPageChange,
  pageGroupSize = 4,
}: PaginationProps) => {
  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);

  const startPage = currentGroup * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPage);

  const handlePrevGroup = () => {
    const prevPage = Math.max(startPage - 1, 1);
    onPageChange(prevPage);
  };

  const handleNextGroup = () => {
    const nextPage = Math.min(endPage + 1, totalPage);
    onPageChange(nextPage);
  };

  return (
    <div className="flex items-center justify-center  mt-6">
      <Image
        onClick={handlePrevGroup}
        src="/icon/memberManage/page_arrow.png"
        alt="이전화살표"
        width={45}
        height={45}
        className="min-w-[45px] min-h-[45px] cursor-pointer"
      />

      {Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      ).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 text-base font-normal ${
            page === currentPage
              ? "bg-gray700 text-white font-bold"
              : "text-gray300"
          }`}
        >
          {page}
        </button>
      ))}

      <Image
        onClick={handleNextGroup}
        src="/icon/memberManage/page_arrow.png"
        alt="이후화살표"
        width={45}
        height={45}
        className="min-w-[45px] min-h-[45px] cursor-pointer rotate-180"
      />
    </div>
  );
};

export default Pagination;

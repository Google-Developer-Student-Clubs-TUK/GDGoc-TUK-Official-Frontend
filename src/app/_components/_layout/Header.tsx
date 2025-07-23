"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useLeaderCheck } from "@/app/_hook/useLeaderCheck";
import { useGenericMutation } from "@/app/_lib/mutations/customMutation";
import { logoutApi } from "@/app/_lib/_api";

const Header = ({ bg = false }: { bg?: boolean }) => {
  const [userName, setUserName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 유틸 드롭다운 메뉴 상태 관리
  const { isLogin, isLeader } = useLeaderCheck();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logoutSuccess = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("role");
  };

  // Answer Post
  const { mutation: logoutMutation } = useGenericMutation({
    mutationFn: logoutApi,
    onSuccessCb: logoutSuccess,
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name !== null) {
      setUserName(name);
    }
  }, []);

  return (
    <div
      className={`${
        bg ? "bg-bg" : "bg-transparent"
      } w-full max-w-[1800px] flex justify-between fixed top-0 left-1/2 -translate-x-1/2 z-50 py-9 px-10`}
    >
      <Link href="/" className="flex-1">
        <Image
          src="/icon/logo.png"
          alt="로고"
          width={266}
          height={43}
          className="min-w-[266px] min-h-[43px] object-contain"
        />
      </Link>

      <div className="flex flex-1 justify-center items-center gap-12">
        <Link
          href="/member"
          className="text-base text-white hover:text-[#FFBA00] duration-300"
        >
          People
        </Link>
        <Link
          href="/recruitment"
          className="text-base text-white hover:text-[#FFBA00] duration-300"
        >
          Recruitment
        </Link>
        {isLeader && (
          <Link
            href="/memberManage"
            className="text-base text-white hover:text-[#FFBA00] duration-300"
          >
            Manage
          </Link>
        )}
      </div>

      {isLogin ? (
        // 로그인 상태
        <div
          className="relative flex flex-1 justify-end items-center text-white cursor-pointer gap-1"
          onClick={toggleDropdown}
        >
          {userName && <p>{userName}님</p>}
          <Image
            src="/icon/arrow_bottom.png"
            alt="화살표"
            width={20}
            height={20}
            className="object-contain"
          />

          {/**
           * @todo : 드롭다운에서 일반 유저면 로그아웃까지만, 리드라면 지원자 목록 데이터까지 보여주기
           * @todo : #1 로그아웃 기능 구현 필요
           * @const : #2_SheetLink : recruitment에서 지원자 링크 생성 시 href에 넣기 - 전역 처리 해줘야할 듯, #3 링크 여부에 따라 UI 다름
           */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-[calc(100%+12px)] bg-gray600 text-white text-right rounded-xl overflow-hidden shadow-lg min-w-[160px]">
              {/* #1 로그아웃 기능 */}
              <div
                className="w-full py-4 px-6 hover:bg-gray500 duration-300"
                onClick={handleLogout}
              >
                로그아웃
              </div>

              {/* #2 recruitment에서 지원자 링크 생성 시 href에 넣기 */}
              {isLeader && (
                <Link
                  href="#"
                  target="_blank"
                  className="block w-full py-4 px-6 hover:bg-gray500 duration-300"
                >
                  {/* #3 링크 없을 때 */}
                  {/* <div className="w-full py-4 px-6 text-gray400 cursor-default">지원자 원본 데이터 없음</div> */}
                  지원자 목록 원본 데이터
                </Link>
              )}
            </div>
          )}
        </div>
      ) : (
        // 비로그인 상태
        <div className="flex flex-1 justify-end items-center gap-4">
          <Link
            href="/login"
            className="text-base text-white hover:text-[#FFBA00] duration-300"
          >
            로그인
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;

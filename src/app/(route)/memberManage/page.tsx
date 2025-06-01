"use client";
import React, { useEffect, useState } from "react";
import VolunteerList from "./_component/volunteer/VolunteerList";
import MemberList from "./_component/member/MemberList";
import { useQuery } from "@tanstack/react-query";
import { generationsApi } from "../member/_api";
import { useGenerationStore } from "./_store/generations";

const MemberManage = () => {
  const [memberTab, setMemberTap] = useState<"회원" | "지원자">("지원자");

  const { setGeneration } = useGenerationStore();
  // api
  const { data } = useQuery({
    queryKey: ["generations"],
    queryFn: () => generationsApi(),
  });

  useEffect(() => {
    if (data) {
      setGeneration(data.data.generations);
    }
  }, [data]);

  return (
    <div className="py-[200px] px-[100px] flex flex-col">
      <h1 className="text-[28px] font-bold  text-white">회원 관리</h1>
      <div className="mb-10 mt-20 flex gap-5 ">
        {["회원", "지원자"].map((label) => (
          <p
            key={label}
            onClick={() => setMemberTap(label as "회원" | "지원자")}
            className={`font-bold text-xl cursor-pointer relative pb-2 ${
              memberTab === label
                ? "after:content-['']  text-white after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-white"
                : "text-gray200"
            }`}
          >
            {label}
          </p>
        ))}
      </div>

      {memberTab === "지원자" ? <VolunteerList /> : <MemberList />}
    </div>
  );
};

export default MemberManage;

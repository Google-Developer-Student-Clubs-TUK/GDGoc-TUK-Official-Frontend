"use client";
import React, { useState } from "react";
import Member from "./_component/Member";
import VolunteerList from "./_component/volunteer/VolunteerList";

const MemberManage = () => {
  const [memberTab, setMemberTap] = useState<"회원" | "지원자">("회원");

  return (
    <div className="my-[200px] mx-[100px] flex flex-col">
      <h1 className="text-[28px] font-bold  text-white">회원 관리</h1>
      <div className="mb-10 mt-20 flex gap-5 ">
        {["회원", "지원자"].map((label) => (
          <p
            key={label}
            onClick={() => setMemberTap(label as "회원" | "지원자")}
            className={`font-bold text-xl cursor-pointer relative pb-2 ${
              memberTab === label
                ? "after:content-['']  text-white after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-white"
                : "text-gray300"
            }`}
          >
            {label}
          </p>
        ))}
      </div>
      <Member />
      {memberTab === "지원자" && <VolunteerList />}
    </div>
  );
};

export default MemberManage;

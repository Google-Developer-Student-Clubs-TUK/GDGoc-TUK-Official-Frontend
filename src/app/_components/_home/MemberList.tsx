import React, { useState } from "react";
import { memberData } from "@/app/_constants/memberData";
import styled, { keyframes } from "styled-components";
import Image from "next/image";

const MemberList = () => {
  const [generation, setGeneration] = useState<number>(2);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [memberHover, setMemberHover] = useState<number | null>(null);

  const handleGeneration = (selectGeneration: number) => {
    setGeneration(selectGeneration);
    setIsOpen(false);
  };

  const selectedGeneration = memberData.find(
    (item) => item.generation === generation
  );

  return (
    <MemberListContainer>
      <div
        className="cursor-pointer w-fit"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p className="relative items-baseline after:content-[''] after:inline-block after:ml-2 after:absolute  after:bg-[url('/icon/arrow_bottom.png')]  after:bottom-[9px] after:w-6 after:h-6 after:bg-no-repeat after:bg-contain  p-2 border-b text-2xl font-bold text-white">
          {`${generation}기`}
        </p>
      </div>
      {isOpen && (
        <ul className="bg-bg absolute shadow-lg w-[179px] overflow-hidden  top-[66px] rounded-lg">
          {memberData.map((item) => (
            <li
              className={`${
                item.generation === generation ? "bg-point" : ""
              } hover:bg-[rgba(0,161,80,0.3)]  cursor-pointer py-3 flex justify-center `}
              onClick={() => handleGeneration(item.generation)}
              key={item.generation}
            >
              <p className="text-base font-bold text-white">
                {`${item.generation}기`}
              </p>
            </li>
          ))}
        </ul>
      )}

      <MemberContainer
        key={generation}
        className="mx-[100px] gap-5 mt-[100px] mb-[200px] flex flex-wrap justify-center"
      >
        {selectedGeneration?.member?.map((member, idx) => (
          <li
            onMouseEnter={() => setMemberHover(idx)}
            onMouseLeave={() => setMemberHover(null)}
            key={idx}
            className={` ${
              memberHover === null
                ? "bg-transparent"
                : memberHover !== idx
                ? "opacity-50"
                : " bg-[#212121]"
            } gap-4 cursor-pointer rounded-full w-[270px] h-[270px] p-[45px] flex flex-col justify-center items-center`}
          >
            <Image
              width={125}
              height={147}
              src="/icon/member/girl_back_profile.png"
              alt="포스터"
              className="flex-shrink-0  object-cover"
            />

            <p className="text-base text-white font-medium">
              {`${member.name} | ${member.part}`}{" "}
            </p>
          </li>
        ))}{" "}
      </MemberContainer>
    </MemberListContainer>
  );
};

export default MemberList;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: none
  }
`;

const MemberListContainer = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MemberContainer = styled.ul`
  animation: ${fadeIn} 0.5s ease-in;
`;

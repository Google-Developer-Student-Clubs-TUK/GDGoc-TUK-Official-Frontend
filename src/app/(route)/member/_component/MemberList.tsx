import React, { useEffect, useState } from "react";

import styled, { keyframes } from "styled-components";
import Image from "next/image";
import Footer from "@/app/_components/_layout/Footer";
import { generationMembersApi } from "../_api";
import { useQuery } from "@tanstack/react-query";
import { memberInfoType } from "../_type";
import { getLabelFromValue } from "../../apply/utils/korToEngMap";

const MemberList = ({ generations }: { generations: string[] }) => {
  // 선택된 기수
  const [selectGeneration, setSelectGeneration] = useState<string>("");

  // 선택된 기수의 멤버들 리스트
  const [MemberInfoList, setMemberInfoList] = useState<memberInfoType[]>([]);

  // 멤버 hover
  const [memberHover, setMemberHover] = useState<number | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleGeneration = (selectGeneration: string) => {
    setSelectGeneration(selectGeneration);
    setIsOpen(false);
  };

  // api
  const { data } = useQuery({
    queryKey: ["generationMembers", selectGeneration],
    queryFn: () => generationMembersApi({ generation: selectGeneration }),
  });

  useEffect(() => {
    if (data) {
      setMemberInfoList(data.data.memberList);
    }
  }, [data]);

  useEffect(() => {
    if (generations.length > 0) {
      setSelectGeneration(generations[generations.length - 1]);
    }
  }, [generations]);

  return (
    <div>
      <MemberListContainer>
        <div
          className="cursor-pointer w-fit"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <p className="relative items-baseline after:content-[''] after:inline-block after:ml-2 after:absolute  after:bg-[url('/icon/arrow_bottom.png')]  after:bottom-[9px] after:w-6 after:h-6 after:bg-no-repeat after:bg-contain  p-2 border-b text-2xl font-bold text-white">
            {`${selectGeneration}년`}
          </p>
        </div>
        {isOpen && (
          <ul className="bg-bg absolute shadow-lg w-[179px] overflow-hidden  top-[66px] rounded-lg">
            {generations.map((item) => (
              <li
                className={`${
                  item === selectGeneration ? "bg-point" : ""
                } hover:bg-hover cursor-pointer py-3 flex justify-center `}
                onClick={() => handleGeneration(item)}
                key={item}
              >
                <p className="text-base font-bold text-white">{`${item}년`}</p>
              </li>
            ))}
          </ul>
        )}

        <MemberContainer
          key={selectGeneration}
          className="mx-[100px] gap-5 mt-[100px] mb-[200px] flex flex-wrap justify-center"
        >
          {MemberInfoList.map((member, idx) => (
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
                src={`/icon/member/${
                  member.gender === "WOMAN"
                    ? "girl_default_profile.png"
                    : "boy_default_profile.png"
                }`}
                alt="포스터"
                className="flex-shrink-0  object-cover"
              />

              <p className="text-base text-white font-medium">
                {`${member.name} | ${getLabelFromValue("직군", member.field)}`}{" "}
              </p>
            </li>
          ))}{" "}
        </MemberContainer>
      </MemberListContainer>
      <Footer />
    </div>
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

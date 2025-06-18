import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState, ChangeEvent } from "react";

const Confirm = () => {
  const infoRef = useRef<HTMLTextAreaElement>(null);
  const [info, setInfo] = useState(
    "Google Developer Student Clubs (GDSC) 프로그램은 학생들이 개발/리더십 능력을 키울 수 있도록 지원하는 프로그램입니다. 기술적 성장을 위한 교육자료를 제공하고 리더십 개발을 위한 다양한 활동들을 지원합니다. 학생이 성장할 수 있도록 전세계의 학생 Lead들과의 교류 기회, Google의 이벤트 참여, 현업 엔지니어와의 만남 등 다양한 기회를 제공하고 쇼케이스/워크샵을 통해 역량을 높일 수 있도록 돕습니다."
  );

  const [benefit, setBenefit] = useState([
    "Google Developer Student Clubs (GDSC) Google Developer Student ",
    "2",
    "3",
    "4",
    "5",
    "6",
  ]);

  useEffect(() => {
    if (infoRef.current) {
      infoRef.current.style.height = "auto"; // 높이 초기화
      infoRef.current.style.height = infoRef.current.scrollHeight + "px"; // 내용에 맞게 설정
    }
  }, [info]);

  const onInfohandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInfo(e.target.value);
  };

  const onBenefitHandler = (
    idx: number,
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setBenefit(
      benefit.map((item, index) => (index === idx ? e.target.value : item))
    );
  };

  return (
    <div>
      {" "}
      <div className="mb-6 flex justify-between items-end">
        <h1 className="font-bold text-white text-[28px]">
          GDGoc TUK 4기 지원 신청서
        </h1>
        <Link href="/" className="text-[#CCC] text-sm underline decoration-solid decoration-skip-ink-auto decoration-auto underline-offset-auto">다음에 지원할게요</Link>
      </div>
      <div className="w-full h-fit rounded-xl flex flex-col p-5 bg-[#212121]">
        <div className="flex justify-between mb-[48px]">
          <p className="font-bold text-white text-base">
            잠깐! 지원 전에 꼭 확인해주세요!
          </p>
          <Image
            src="/icon/slideup_arrow_top.png"
            alt="위 화살표"
            width={20}
            height={20}
            className="min-w-[20px] min-h-[20px] object-contain"
          />
        </div>
        <p className="mb-3 font-bold text-white">▶ GDGoc가 무엇인가요?</p>
        <textarea
          ref={infoRef}
          onChange={onInfohandler}
          rows={1}
          readOnly={false}
          value={info}
          className="mb-9 overflow-hidden w-full p-2 text-justify text-[#CCC] text-sm rounded-md bg-transparent resize-none"
        />
        <p className="mb-3 font-bold text-white">▶ GDSC의 혜택은 무엇인가요?</p>
        <div className="flex flex-wrap justify-between gap-4">
          {benefit.map((i, idx) => (
            <textarea
              key={idx}
              onChange={(e) => onBenefitHandler(idx, e)}
              readOnly={true}
              value={i}
              className="w-[270px] h-[68px] px-4 py-3 font-medium text-white text-sm rounded-xl bg-bg border border-bg resize-none"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Confirm;

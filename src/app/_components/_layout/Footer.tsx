import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="w-full bg-areaBg">
      <div className="w-full max-w-[1800px] px-10 py-[60px] flex flex-col mx-auto gap-12">
        <div className="flex gap-[80px] items-start">
          {/* Logo */}
          <Image
            src="/icon/logo.png"
            alt="로고"
            width={308}
            height={40}
            className="object-contain"
          />

          {/* Info */}
          <div className="flex gap-10 text-white">
            <div className="flex flex-col gap-3">
              <p className="text-base font-bold">리드 정보</p>
              <div className="flex flex-col gap-1 text-sm">
                <p>최성현</p>
                <p>010-1234-5678</p>
                <p>email@email.ocm</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-base font-bold">관련 홈페이지</p>
              <div className="flex flex-col gap-1 text-sm">
                <a href="https://www.instagram.com/gdsc.tuk" target="_blank" className="hover:underline">인스타그램</a>
                <a href="https://www.tukorea.ac.kr/tukorea/index.do" target="_blank" className="hover:underline">한국공학대학교</a>
                <a href="https://sites.google.com/view/gdeveloperskorea/gdg" target="_blank" className="hover:underline">Google Developer Groups</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="flex flex-col gap-3 text-gray300 text-xs">
          <div className="bg-gray500 w-full h-[1px]" />
          <div className="flex justify-between">
            <p>본 홈페이지는 GDGoC TUK의 활동 관리 및 부원들의 커뮤니티를 위해 만들어진 사이트로 비영리 단체입니다.</p>
            <p>©2025 GDGoC Tech University of Korea. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

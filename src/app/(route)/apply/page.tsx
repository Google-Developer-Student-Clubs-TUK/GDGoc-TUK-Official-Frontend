"use client";

import Header from "@/app/_components/_layout/Header";
import Confirm from "./_component/Confirm";

const Apply = () => {
  return (
    <div>
      <Header />
      <div className="flex justify-center my-[200px]">
        <div className="flex flex-col w-full max-w-[600px]">
          <Confirm />
        </div>
      </div>
    </div>
  );
};

export default Apply;

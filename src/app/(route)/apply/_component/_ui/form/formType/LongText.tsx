import { TextFormPropsType } from "@/app/(route)/apply/_type/formPropsType";
import React from "react";

const LongText = ({ newItem = false }: TextFormPropsType) => {
  return (
    <textarea
      readOnly={newItem}
      className=" h-[162px] text-white mt-4 px-4 py-3 w-full rounded-xl bg-bg placeholder:text-placeholder placeholder:text-base placeholder:font-normal"
      required
      placeholder="질문형 대답"
    />
  );
};

export default LongText;

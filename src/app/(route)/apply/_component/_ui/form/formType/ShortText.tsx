import React from "react";
import Input from "../Input/DefaultInput";
import { TextFormPropsType } from "@/app/(route)/apply/_type/formPropsType";

const ShortText = ({ newItem }: TextFormPropsType) => {
  return <Input newItem={newItem} placeholder={"단답형 대답"} />;
};

export default ShortText;

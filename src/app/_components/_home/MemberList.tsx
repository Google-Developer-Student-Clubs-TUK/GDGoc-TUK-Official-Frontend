import React from "react";
import { memberData } from "@/app/_constants/memberData";

const MemberList = () => {
  return (
    <div className="">
      {memberData.map((item) => (
        <div key={item.generation}>
          <h2>{item.generation}</h2>
          <ul>
            {item.member?.map((member) => (
              <li key={member.name}>
                <p>{member.name}</p>
                <p>{member.part}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MemberList;

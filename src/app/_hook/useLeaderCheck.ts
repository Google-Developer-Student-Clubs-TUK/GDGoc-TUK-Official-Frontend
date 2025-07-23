'use client'

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { membersCheckApi } from "../_lib/_api";
import { useRouter } from "next/navigation"; 

export function useLeaderCheck() {
  const router = useRouter();
  const [isLeader, setIsLeader] = useState(false);
  const [isLogin , setIsLogin] = useState(false)


  const { data ,error} = useQuery({
    queryKey: ["generationMembers"],
    queryFn: () => membersCheckApi(),
  });
  
useEffect(() => {
  console.log("로그인체크");

  if (error) {
    const name = localStorage.getItem("name");
    
    // 로그인 되어 있었던 흔적이 있으면, 만료로 간주
    if (name) {
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      alert("로그인이 만료되었습니다");
      router.push("/login");
    }


    setIsLogin(false);
    setIsLeader(false);
  }

  if (data) {
    setIsLogin(true);
    setIsLeader(data.data.role === "ROLE_LEADER");
  }
}, [data, error]);



  return {isLogin,isLeader};
}

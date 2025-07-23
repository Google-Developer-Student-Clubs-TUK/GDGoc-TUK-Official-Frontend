// hooks/useLeaderCheck.ts
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { membersCheckApi } from "../_lib/_api";

export function useLeaderCheck() {
  const [isLeader, setIsLeader] = useState(false);
  const [isLogin , setIsLogin] = useState(false)


  const { data ,error} = useQuery({
    queryKey: ["generationMembers"],
    queryFn: () => membersCheckApi(),
  });
  

useEffect(() => {
  console.log("로그인체크")
  if (error) {
    setIsLogin(false);
  }

  if (data) {
    setIsLogin(true);
    if (data.data.role === "ROLE_LEADER") {
      setIsLeader(true);
    }
  }
}, [data, error]);


  return {isLogin,isLeader};
}

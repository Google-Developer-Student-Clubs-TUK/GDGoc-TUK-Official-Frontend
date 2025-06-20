// hooks/useLeaderCheck.ts
import { useEffect, useState } from "react";
import { getMyCookie } from "@/app/_providers/action";

export function useLeaderCheck() {
  const [isLeader, setIsLeader] = useState(true);

  useEffect(() => {
    async function fetchCookie() {
      const cookie = await getMyCookie();
      if (cookie?.name === "JSESSIONID") {
        const role = localStorage.getItem("role");
        if (role === "ROLE_LEADER") {
          setIsLeader(true);
        }
      }
    }
    fetchCookie();
  }, []);

  return isLeader;
}

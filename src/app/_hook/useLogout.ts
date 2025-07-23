"use client";

import { useRouter } from "next/navigation"; 
import { useGenericMutation } from "@/app/_lib/mutations/customMutation";
import { logoutApi } from "@/app/_lib/_api";

export function useLogout() {
  const router = useRouter();

  const logoutSuccess = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    alert("로그아웃 되었습니다")
    router.push("/"); 
  };

  const { mutation: logoutMutation } = useGenericMutation({
    mutationFn: logoutApi,
    onSuccessCb: logoutSuccess,
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return { handleLogout };
}

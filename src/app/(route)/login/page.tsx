"use client";
import Button from "@/app/_components/_ui/Button";
import { useGenericMutation } from "@/app/_lib/mutations/customMutation";
import React, { useState } from "react";
import { loginApi } from "./_api";
import { useRouter } from "next/navigation";

import Header from "@/app/_components/_layout/Header";
import Footer from "@/app/_components/_layout/Footer";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onLoginSuccess = (data) => {
    alert("로그인되었습니다");
    /* 실제 이름 데이터 입력 넣기  */
    localStorage.setItem("name", "리더");
    if (data.data.role === "ROLE_LEADER")
      localStorage.setItem("role", "ROLE_LEADER");
    router.push("/");
  };

  // RecruitmentsPost
  const { mutation: LoginMutation } = useGenericMutation({
    mutationFn: loginApi,
    onSuccessCb: onLoginSuccess,
  });

  const onSubmitLogin = () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 모두 입력해주세요!");
      return;
    }

    LoginMutation.mutate({
      email,
      password,
    });
  };

  return (
    <>
      <Header />

      <div className="h-screen flex flex-col justify-center items-center">
        <div className="w-full max-w-[1800px] px-10 mx-auto flex gap-10 flex-col justify-center items-center text-white">
          <h1 className="text-ttLg font-bold">로그인</h1>
          <form className="flex w-[600px] flex-col gap-6">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                required
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`px-4 py-3 rounded-xl placeholder:text-gray300 bg-gray700 placeholder:font-normal focus:ring-1 focus:ring-point`}
              />
              <input
                type="text"
                required
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`px-4 py-3 rounded-xl placeholder:text-gray300 bg-gray700 placeholder:font-normal focus:ring-1 focus:ring-point`}
              />
            </div>
            <Button onClick={onSubmitLogin} title="로그인" width="100%" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

"use client";
import Button from "@/app/_components/_ui/Button";
import { useGenericMutation } from "@/app/_lib/mutations/customMutation";
import React, { useState } from "react";
import { loginApi } from "./_api";
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onLoginSuccess = () => {
    alert("로그인되었습니다");
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
    <div className="flex gap-10 h-screen flex-col justify-center items-center">
      <h1 className=" text-white text-ttLg font-bold ">로그인</h1>
      <form className="flex w-[600px] flex-col gap-6">
        <div className=" flex flex-col gap-4">
          <input
            type="text"
            required
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`pr-12 text-white px-4 py-3  rounded-xl placeholder:text-gray300 bg-gray700 placeholder:font-normal`}
          />
          <input
            type="text"
            required
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`pr-12 text-white px-4 py-3  rounded-xl placeholder:text-gray300 bg-gray700 placeholder:font-normal`}
          />
        </div>
        <Button onClick={onSubmitLogin} title="로그인" width="100%" />
      </form>
    </div>
  );
};

export default Login;

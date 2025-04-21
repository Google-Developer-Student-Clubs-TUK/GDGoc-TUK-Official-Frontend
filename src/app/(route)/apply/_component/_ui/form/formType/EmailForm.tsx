import React, { useState } from "react";
import Input from "../../ApplyInput";
import { useQuestionAnswerStore } from "../../../../_store/questionAnswer";
import { TextFormPropsType } from "../../../../_type/formPropsType";
import Button from "@/app/_components/_ui/Button";
import { useGenericMutation } from "@/app/_lib/mutations/customMutation";
import { emailApi, emailCodeApi } from "../../../../_api";

const EmailForm = ({ idx }: TextFormPropsType) => {
  // 이메일인 것이 비어있으면 지원서 제출이 안되게

  const { setAnswer } = useQuestionAnswerStore();
  const [email, setEmail] = useState("");
  const [sendEmail, setSendEmail] = useState(false);

  const [code, setCode] = useState("");
  const [sendCode, setSendCode] = useState(false);

  const emailConFirmSuccess = () => {
    setSendCode(true);
    alert("인증이 완료되었습니다");
    setAnswer(idx, email, "single");
  };

  const emailError = (res) => {
    alert("찾을 수 없는 이메일 주소 입니다");
  };

  const { mutation: emailMutation } = useGenericMutation({
    mutationFn: emailApi,
    onErrorCb: emailError,
  });

  const { mutation: confirmCodeMutation } = useGenericMutation({
    mutationFn: emailCodeApi,
    onSuccessCb: emailConFirmSuccess,
  });

  const confirmEmail = () => {
    confirmCodeMutation.mutate({
      email,
      code,
    });
  };

  const onSendEmailCode = () => {
    alert("인증코드가 전송되었습니다");
    if (!sendEmail) setSendEmail(true);
    emailMutation.mutate({
      email,
    });
  };

  return (
    <div className="gap-3 flex w-full flex-col">
      <div className="w-full gap-5 flex ">
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          width="calc(100% - 130px)"
          placeholder={"이메일을 입력해주세요"}
          readOnly={sendCode}
        />
        <Button
          disabled={sendCode}
          onClick={onSendEmailCode}
          bg="bg"
          width="120px"
          title={sendEmail ? "재전송" : "인증번호 발송"}
        />
      </div>

      <div className="w-full gap-5 flex">
        <Input
          onChange={(e) => setCode(e.target.value)}
          value={code}
          width="421px"
          bg={sendCode ? "point" : "bg"}
          readOnly={!sendEmail || sendCode}
          placeholder={"인증번호"}
        />
        {sendEmail && (
          <Button
            disabled={false}
            width="119px"
            title={sendCode ? "인증성공" : "인증하기"}
            onClick={confirmEmail}
          />
        )}
      </div>
    </div>
  );
};

export default EmailForm;

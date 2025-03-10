"use client";
import NewForm from "../_component/_ui/form/NewForm";
import Header from "@/app/_components/_layout/Header";
import Confirm from "../_component/Confirm";
import Button from "@/app/_components/_ui/Button";
import { useNewQuestionsStore } from "../_store/newQuestions";
// import { useForm } from "react-hook-form";

const ApplyAdmin = () => {
  const { addNewQuestion, newQuestions } = useNewQuestionsStore();

  // const { register, handleSubmit } = useForm<FormType>();

  // const onSubmit = (data: FormType) => {
  //   console.log(data);
  // };

  return (
    <div>
      <Header />
      <div className="flex justify-center my-[200px]">
        <div className="flex flex-col w-full max-w-[600px]">
          <Confirm />
          <form
            className="grid gap-[60px] mt-12"
            // onSubmit={handleSubmit(onSubmit)}
          >
            {newQuestions.map((i) => (
              <NewForm
                key={i.questionId}
                questionId={i.questionId}
                content={i.content}
                questionType={i.questionType}
                isRequired={i.isRequired}
                newSubQuestions={i.newSubQuestions}
              />
            ))}
            <Button title={"질문 추가"} plus={true} onClick={addNewQuestion} />
            <button type="submit">제출</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyAdmin;

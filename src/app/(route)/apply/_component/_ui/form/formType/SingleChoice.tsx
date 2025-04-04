import { useQuestionAnswerStore } from "@/app/(route)/apply/_store/questionAnswer";
import Input from "../Input/DefaultInput";
import { useQuestionFormStore } from "@/app/(route)/apply/_store/questionForm";
import { ChoiceFormPropsType } from "@/app/(route)/apply/_type/formPropsType";

const SingleChoice = ({
  subQuestions,
  questionId,
  deleteSubQuestion,
  admin = false,
  idx,
  required,
}: ChoiceFormPropsType) => {
  const { addSubQuestion, updateSubField } = useQuestionFormStore();
  const { setAnswer, questionAnswerList } = useQuestionAnswerStore();

  return (
    <div className="flex flex-wrap justify-between gap-4">
      {subQuestions.map((i, subIdx) => (
        <Input
          key={subIdx}
          width="w-[270px]"
          img={admin ? "/icon/form/minus.png" : undefined}
          alt="삭제"
          imgClick={
            !admin && deleteSubQuestion
              ? () => deleteSubQuestion(questionId, i.subQuestionId)
              : undefined
          }
          btn={
            !admin && idx !== undefined
              ? questionAnswerList[idx]?.includes(i.subContent)
              : false
          }
          required={required}
          placeholder="내용을 입력하세요."
          onClick={
            !admin && idx !== undefined
              ? () => setAnswer(idx, i.subContent, "single")
              : undefined
          }
          onChange={(e) => updateSubField(questionId, subIdx, e.target.value)}
          value={i.subContent}
          readOnly={!admin}
        />
      ))}
      {admin && (
        <Input
          width="w-[270px]"
          btn={true}
          img="/icon/plus.png"
          alt="추가"
          onClick={() => addSubQuestion(questionId)}
          placeholder="선택지 추가"
        />
      )}
    </div>
  );
};

export default SingleChoice;

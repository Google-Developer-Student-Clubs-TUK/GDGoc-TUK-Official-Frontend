import Input from "../Input/DefaultInput";
import { useQuestionFormStore } from "@/app/(route)/apply/_store/questionForm";
import { ChoiceFormPropsType } from "@/app/(route)/apply/_type/formPropsType";

const SingleChoice = ({
  subQuestions,
  questionId,
  deleteSubQuestion,
}: ChoiceFormPropsType) => {
  const { addSubQuestion, updateSubField } = useQuestionFormStore();

  return (
    <div className="flex flex-wrap justify-between gap-4">
      {subQuestions.map((i, idx) => (
        <Input
          key={idx}
          width="w-[270px]"
          img="/icon/form/minus.png"
          alt="삭제"
          imgClick={() => deleteSubQuestion(questionId, i.subQuestionId)}
          placeholder="내용을 입력하세요."
          onChange={(e) => updateSubField(questionId, idx, e.target.value)}
          value={i.subContent}
        />
      ))}
      <Input
        width="w-[270px]"
        btn={true}
        img="/icon/plus.png"
        alt="추가"
        onClick={() => addSubQuestion(questionId)}
        placeholder="선택지 추가"
      />
    </div>
  );
};

export default SingleChoice;

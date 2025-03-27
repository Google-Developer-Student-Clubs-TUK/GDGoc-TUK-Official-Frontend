import Input from "../Input/DefaultInput";
import { useQuestionFormStore } from "@/app/(route)/apply/_store/questionForm";
import { ChoiceFormPropsType } from "@/app/(route)/apply/_type/formPropsType";

const MultipleChoice = ({ subQuestions, questionId }: ChoiceFormPropsType) => {
  const { addSubQuestion, deleteSubQuestion, updateSubField } =
    useQuestionFormStore();

  return (
    <div className="flex flex-col gap-3">
      {subQuestions.map((i, idx) => (
        <Input
          key={idx}
          img="/icon/form/minus.png"
          multiImg="/icon/form/uncheck.png"
          alt="삭제"
          imgClick={() => deleteSubQuestion(questionId, idx)}
          placeholder="내용을 입력하세요."
          onChange={(e) => updateSubField(questionId, idx, e.target.value)}
          value={i.subContent}
        />
      ))}

      <Input
        btn={true}
        multiImg="/icon/form/uncheck.png"
        img="/icon/plus.png"
        alt="추가"
        onClick={() => addSubQuestion(questionId)}
        placeholder="선택지 추가"
      />
    </div>
  );
};

export default MultipleChoice;

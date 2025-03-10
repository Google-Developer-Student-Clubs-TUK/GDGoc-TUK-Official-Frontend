import Input from "../Input/DefaultInput";
import { useNewQuestionsStore } from "@/app/(route)/apply/_store/newQuestions";
import { ChoiceFormPropsType } from "@/app/(route)/apply/_type/formPropsType";

const SingleChoice = ({ newSubQuestions, questionId }: ChoiceFormPropsType) => {
  const { addSubQuestion, deleteSubQuestion, updateSubField } =
    useNewQuestionsStore();

  return (
    <div className="flex flex-wrap justify-between gap-4">
      {newSubQuestions.map((i, idx) => (
        <Input
          key={idx}
          width="w-[270px]"
          img="/icon/minus.png"
          alt="삭제"
          imgClick={() => deleteSubQuestion(questionId, idx)}
          placeholder="내용을 입력하세요."
          onChange={(e) => updateSubField(questionId, idx, e.target.value)}
          value={i.newSubContent}
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

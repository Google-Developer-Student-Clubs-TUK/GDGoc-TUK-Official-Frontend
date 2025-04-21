import { useQuestionAnswerStore } from "@/app/(route)/apply/_store/questionAnswer";
import Input from "../../ApplyInput";
import { useQuestionFormStore } from "@/app/(route)/apply/_store/questionForm";
import { ChoiceFormPropsType } from "@/app/(route)/apply/_type/formPropsType";

const MultipleChoice = ({
  subQuestions,
  questionId,
  deleteSubQuestion,
  admin = false,
  idx,
}: ChoiceFormPropsType) => {
  const { addSubQuestion, updateSubField } = useQuestionFormStore();
  const { setAnswer, questionAnswerList } = useQuestionAnswerStore();

  return (
    <div className="flex flex-col gap-3">
      {subQuestions.map((i, subIdx) => (
        <Input
          key={subIdx}
          img={admin ? "/icon/form/minus.png" : undefined}
          multiImg="/icon/form/uncheck.png"
          alt="삭제"
          width="270px"
          imgClick={
            !admin && deleteSubQuestion
              ? () => deleteSubQuestion(questionId, i.subQuestionId)
              : undefined
          }
          btn={
            !admin && idx !== undefined
              ? questionAnswerList[idx].contents.includes(i.subContent)
              : false
          }
          placeholder="내용을 입력하세요."
          onClick={
            !admin && idx !== undefined
              ? () => setAnswer(idx, i.subContent, "multi")
              : undefined
          }
          onChange={(e) => updateSubField(questionId, subIdx, e.target.value)}
          value={i.subContent}
          readOnly={!admin}
        />
      ))}
      {admin && (
        <Input
          btn={true}
          multiImg="/icon/form/uncheck.png"
          img="/icon/plus.png"
          alt="추가"
          onClick={() => addSubQuestion(questionId)}
          placeholder="선택지 추가"
        />
      )}
    </div>
  );
};

export default MultipleChoice;

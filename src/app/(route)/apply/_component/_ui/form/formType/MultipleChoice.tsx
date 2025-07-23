import { useQuestionAnswerStore } from "@/app/(route)/apply/_store/questionAnswer";
import Input from "../../ApplyInput";
import { useQuestionFormStore } from "@/app/(route)/apply/_store/questionForm";
import { ChoiceFormPropsType } from "@/app/(route)/apply/_type/formPropsType";

const MultipleChoice = ({
  subQuestions,
  questionId,
  onDeleteSubQuestion,
  admin = false,
}: ChoiceFormPropsType) => {
  const { addSubQuestion, updateSubField, deleteSubQuestion } =
    useQuestionFormStore();
  const { setAnswer, questionAnswerList } = useQuestionAnswerStore();
  const answer = questionAnswerList.find((q) => q.questionId === questionId);

  return (
    <div className="flex flex-wrap justify-between gap-3">
      {subQuestions?.map((i, subIdx) => (
        <Input
          key={subIdx}
          img={admin ? "/icon/form/minus.png" : undefined}
          multiImg="/icon/form/uncheck.png"
          alt="삭제"
          width="270px"
          imgClick={
            admin && onDeleteSubQuestion
              ? () => deleteSubQuestion(questionId, i.subQuestionId)
              : undefined
          }
          btn={!admin ? answer?.contents.includes(i.subContent) : false}
          placeholder="내용을 입력하세요."
          onClick={
            !admin
              ? () => setAnswer(questionId, i.subContent, "multi")
              : undefined
          }
          onChange={(e) =>
            updateSubField(questionId, i.subQuestionId, e.target.value)
          }
          value={i.subContent}
          readOnly={!admin}
        />
      ))}
      {admin && (
        <Input
          width="270px"
          btn={true}
          multiImg="/icon/form/uncheck.png"
          img="/icon/form/plus.png"
          alt="추가"
          onClick={() => addSubQuestion(questionId)}
          placeholder="선택지 추가"
        />
      )}
    </div>
  );
};

export default MultipleChoice;

import { useQuestionAnswerStore } from "@/app/(route)/apply/_store/questionAnswer";
import Input from "../../ApplyInput";
import { useQuestionFormStore } from "@/app/(route)/apply/_store/questionForm";
import { ChoiceFormPropsType } from "@/app/(route)/apply/_type/formPropsType";
import { getValueFromLabel } from "@/app/(route)/apply/utils/korToEngMap";

const SingleChoice = ({
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
    <div className="flex flex-wrap justify-between gap-4">
      {subQuestions?.map((i, subIdx) => (
        <Input
          key={subIdx}
          width="270px"
          img={admin ? "/icon/form/minus.png" : undefined}
          alt="삭제"
          imgClick={
            admin && onDeleteSubQuestion
              ? () => deleteSubQuestion(questionId, i.subQuestionId)
              : undefined
          }
          btn={
            !admin
              ? answer?.contents.includes(
                  getValueFromLabel(answer?.question ?? "", i.subContent)
                )
              : false
          }
          placeholder="내용을 입력하세요."
          onClick={
            !admin
              ? () => {
                  const translated = getValueFromLabel(
                    answer?.question ?? "",
                    i.subContent
                  );
                  setAnswer(questionId, translated, "single");
                }
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
          img="/icon/form/plus.png"
          alt="추가"
          onClick={() => addSubQuestion(questionId)}
          placeholder="선택지 추가"
        />
      )}
    </div>
  );
};

export default SingleChoice;

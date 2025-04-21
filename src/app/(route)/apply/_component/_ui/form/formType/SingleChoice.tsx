import { useQuestionAnswerStore } from "@/app/(route)/apply/_store/questionAnswer";
import Input from "../../ApplyInput";
import { useQuestionFormStore } from "@/app/(route)/apply/_store/questionForm";
import { ChoiceFormPropsType } from "@/app/(route)/apply/_type/formPropsType";
import { getValueFromLabel } from "@/app/(route)/apply/utils/korToEngMap";

const SingleChoice = ({
  subQuestions,
  questionId,
  deleteSubQuestion,
  admin = false,
  idx,
}: ChoiceFormPropsType) => {
  const { addSubQuestion, updateSubField } = useQuestionFormStore();
  const { setAnswer, questionAnswerList } = useQuestionAnswerStore();

  return (
    <div className="flex flex-wrap justify-between gap-4">
      {subQuestions.map((i, subIdx) => (
        <Input
          key={subIdx}
          width="270px"
          img={admin ? "/icon/form/minus.png" : undefined}
          alt="삭제"
          imgClick={
            !admin && deleteSubQuestion
              ? () => deleteSubQuestion(questionId, i.subQuestionId)
              : undefined
          }
          btn={
            !admin && idx !== undefined
              ? questionAnswerList[idx].contents.includes(
                  getValueFromLabel(
                    questionAnswerList[idx].question,
                    i.subContent
                  )
                )
              : false
          }
          placeholder="내용을 입력하세요."
          onClick={
            !admin && idx !== undefined
              ? () => {
                  const question = questionAnswerList[idx].question;
                  const translated = getValueFromLabel(question, i.subContent);
                  setAnswer(idx, translated, "single");
                }
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

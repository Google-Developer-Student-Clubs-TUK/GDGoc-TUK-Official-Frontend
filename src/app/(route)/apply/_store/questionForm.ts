import { create } from "zustand";
import {  QuestionItemType} from "../_type/formType";

interface QuestionFormStoreType{
  prevQuestionList : QuestionItemType[], // 이전 질문 리스트 (수정 감지용)
  questionList : QuestionItemType[],  // 현재 질문 리스트
  nextQuestionId: number; // 다음 질문의 임시 ID (음수)
  nextSubQuestionId: number;  // 다음 서브질문의 임시 ID (음수)
  
  lastPage : number; 
  currentPage : number;


  // setQuestion  // 질문 리스트 초기화
  setQuestion: (question :  QuestionItemType[]) => void
 
  
  // newQuestion handler
  addNewQuestion : () => void;
  deleteNewQuestion : (idx : number) => void;
  updateField: <T extends keyof  QuestionItemType>(questionId: number, field: T, value:  QuestionItemType[T]) => void;


  // subQuestion handler
  addSubQuestion : (questionId: number) => void
  deleteSubQuestion : (questionId: number , subQuestionId : number )=> void
  updateSubField : (questionId: number , subQuestionId : number , value :string) => void
  
  // order // 드래그로 순서 변경
  updateOrder : (newOrder :  QuestionItemType[]) => void


  // lastPage  // 마지막 페이지 설정
  setLastPage : (lastPage : number) => void

  goToNextPage: () => void; // 다음 페이지로 이동
  goToPrevPage: () => void; // 이전 페이지로 이동

}





// 🔥 질문 리스트를 정렬해서 페이지 번호를 0,1,2... 연속되게 재배열하는 함수
const reassignPageNumbers = (questions: QuestionItemType[]) => {
  const sortedQuestions = [...questions].sort((a, b) => a.page - b.page || a.order - b.order);

   // 페이지별로 그룹 나누기
  const pageGroups: Record<number, QuestionItemType[]> = {};
  sortedQuestions.forEach((q) => {
    if (!pageGroups[q.page]) pageGroups[q.page] = [];
    pageGroups[q.page].push(q);
  });

  // 페이지 번호를 0부터 다시 순서대로 부여
  const pages = Object.keys(pageGroups).sort((a, b) => +a - +b);
  const newPageMap = new Map<number, number>();
  pages.forEach((oldPage, index) => {
    newPageMap.set(+oldPage, index);
  });

  return sortedQuestions.map((q) => ({
    ...q,
    page: newPageMap.get(q.page)!,
  }));
};





export const useQuestionFormStore = create<QuestionFormStoreType>((set,get) => ({
  prevQuestionList : [],
  questionList : [],
  nextQuestionId : -1,
  nextSubQuestionId :-1,

  updatedQuestionOrders  : [],


  lastPage :0,
  currentPage : 0,


// 질문 리스트를 세팅 (초기화)
setQuestion: (question: QuestionItemType[]) => {
  const sortedSubQuestions = question.map((q) => ({
    ...q,
    subQuestions: [...q.subQuestions].sort(
      (a, b) => a.subQuestionId - b.subQuestionId
    ),
  }));


  set(() => ({
    questionList: sortedSubQuestions,
    prevQuestionList: sortedSubQuestions,

  }));
},


// 새 질문 추가
  addNewQuestion: () => {

    // 상태를 여러 번 읽고 사용  -> get() 사용
    const prev = get();
    const prevQuestions = prev.questionList;
    const prevNextQuestionId = prev.nextQuestionId;
    
  
  
    set({
      questionList : [
        ...prevQuestions,
        {
          page : get().currentPage,
          questionId: prevNextQuestionId,
          content: "",
          questionType: "SHORT_TEXT",
          isRequired: false,
          isDeletable: true,
          subQuestions: [],
          order: prevQuestions.length + 1
        },
      ],
      nextQuestionId : prevNextQuestionId -1

     
  
    });
  },
  


    // 질문 삭제 (삭제 후 페이지 정렬까지)
  deleteNewQuestion: (questionId) => {
    const state = get();
    const targetQuestion = state.questionList.find((q) => q.questionId === questionId);
    if (!targetQuestion) return; // 삭제할 질문 없으면 무시
  
    const pageOfTarget = targetQuestion.page;
    const remainingQuestions = state.questionList.filter((q) => q.questionId !== questionId);
  
    const isPageEmpty = remainingQuestions.every((q) => q.page !== pageOfTarget); // 삭제 후 해당 페이지가 비었는지 확인
  
    const reassignedQuestions = reassignPageNumbers(remainingQuestions); // 페이지 재정렬
    
    let newCurrentPage = state.currentPage;

    if (isPageEmpty) {
      newCurrentPage = Math.max(pageOfTarget - 1, 0); // 비었으면 이전 페이지로 이동
    }

    const newLastPage = reassignedQuestions.length > 0 ? Math.max(...reassignedQuestions.map((q) => q.page)) : 0;

    set({
      questionList: reassignedQuestions,
      currentPage: newCurrentPage,
      lastPage: newLastPage,
    });
  },

  


  
    updateField: (questionId, field, value) =>
      set((prev) => ({
        questionList : prev.questionList.map((q) =>
          q.questionId === questionId ? { ...q, [field]: value } : q
        ),
    })),

    addSubQuestion: (questionId: number) =>
      set((prev) => ({
        questionList : prev.questionList.map((q) =>
          q.questionId === questionId
            ? {
                ...q,
                subQuestions: [...q.subQuestions, {   subQuestionId: prev.nextSubQuestionId  ,  subContent: "" }],
              }
            : q
        ),
        nextSubQuestionId : prev.nextSubQuestionId -1
      }),
    ),

    deleteSubQuestion: (questionId: number, subQuestionId: number) =>
      set((prev) => ({
        questionList: prev.questionList.map((q) =>
          q.questionId === questionId
            ? {
                ...q,
                subQuestions: q.subQuestions.filter(
                  (item) => item.subQuestionId !== subQuestionId
                ),
              }
            : q
        ),
      })),
    
    

      updateSubField: (questionId: number, subQuestionId: number, value: string) =>
        set((prev) => ({
          questionList: prev.questionList.map((q) =>
            q.questionId === questionId
              ? {
                  ...q,
                  subQuestions: q.subQuestions.map((item) =>
                    item.subQuestionId === subQuestionId
                      ? { ...item, subContent: value }
                      : item
                  ),
                }
              : q
          ),
        })),
      

    // order
    updateOrder : (newOrder :  QuestionItemType[]) => set(() => ({
      questionList: newOrder,
    })),


    // 마지막 페이지
    setLastPage  : (lastPage:number) => set(() => ({
      lastPage
    })),



    goToNextPage: () => {
      const state = get();
      const nextPage = state.currentPage + 1;
      const questionsInNextPage = state.questionList.filter((q) => q.page === nextPage);
  
      if (questionsInNextPage.length === 0) {
        // 새 페이지에 질문이 없으면 자동 추가
        set({
          currentPage: nextPage,
          lastPage: Math.max(state.lastPage, nextPage),
        });
        // 질문 추가 따로
        get().addNewQuestion();
      } else {
        set({ currentPage: nextPage });
      }
  
      window.scrollTo({ top: 500, behavior: "smooth" });
    },
  
    
    goToPrevPage: () => {
      const prevPage = Math.max(get().currentPage - 1, 0);
      set({ currentPage: prevPage });
    // 스크롤 상단 이동
  window.scrollTo({ top:  500, behavior: "smooth" });
     
    },
 

}));


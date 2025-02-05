export interface ChapterForm {
    title: string;
    content: string;
    questions: QuestionForm[];
    score?: number;
  }
  
export interface QuestionForm {
    question: string;
    answer: string;
  }
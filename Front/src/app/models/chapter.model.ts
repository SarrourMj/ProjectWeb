export interface Question {
    question: string;
    answer: string;
  }
  
  export interface Chapter {
    id: number;
    title: string;
    content: string;
    questions: Question[] | null;
    score: number;
    completed?: boolean; // Add this property

  }
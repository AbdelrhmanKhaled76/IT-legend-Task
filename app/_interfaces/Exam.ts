export interface Exam {
  selectedAnswer?: number; // Add this to your Exam type
  questionTitle: string;
  answer_1: Answer;
  answer_2: Answer;
  answer_3: Answer;
  answer_4: Answer;
}

interface Answer {
    answerTitle : string;
    isCorrect : boolean;
}
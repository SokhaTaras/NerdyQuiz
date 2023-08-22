export interface Question {
  title: string;
  correctAnswer: string;
  correctBooleanAnswer?: boolean;
  wrongAnswers: wrongAnswers;
  type: string;
  difficulty: string;
  id: string;
}

export interface wrongAnswers {
  variant1: string | boolean;
  variant2?: string | boolean;
  variant3?: string;
}

export interface Answer {
  isCorrect: boolean;
}

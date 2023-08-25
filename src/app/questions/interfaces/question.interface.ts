export interface Question {
  title: string;
  type: string;
  difficulty: string;
  id: string;
  answers: Answer[] | string;
}

export interface Answer {
  text: string;
  isCorrect: boolean;
}

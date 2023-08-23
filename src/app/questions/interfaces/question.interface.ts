export interface Question {
  title: string;
  type: string;
  difficulty: string;
  id: string;
}

export interface Answer {
  text: string;
  isCorrect: boolean;
}

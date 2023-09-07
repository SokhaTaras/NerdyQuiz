export interface Question {
  title?: string;
  type?: string;
  difficulty?: string;
  id?: string;
  answers?: Answer[];
}

export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface AnswerList {
  value: string;
  translations: { lang: string; text: string }[];
}

export interface test {
  value: string;
  text: string;
}

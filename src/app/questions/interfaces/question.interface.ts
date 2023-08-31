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

export interface QuestionEntry {
  lang: string;
  text: string;
}

export interface QuestionTypeObject {
  multiple: QuestionEntry[];
  boolean: QuestionEntry[];
}

export interface QuestionDifficultyObject {
  easy: QuestionEntry[];
  medium: QuestionEntry[];
  hard: QuestionEntry[];
}

export interface QuestionBooleanObject {
  true: QuestionEntry[];
  false: QuestionEntry[];
}

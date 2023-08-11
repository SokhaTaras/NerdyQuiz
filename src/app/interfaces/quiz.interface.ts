import { IQuestion } from "./question.interface";

export interface IQuiz {
  title: string;
  theme: string;
  type: string;
  id: number;
  questions: IQuestion[];
}

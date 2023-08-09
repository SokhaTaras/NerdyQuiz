import {IQuestion} from "./question";

export interface IQuiz {
  title: string;
  theme: string;
  type: string;
  id: number;
  questions: IQuestion[];
}

import {IQuestion} from "./question";

export interface IQuiz {
  title: string;
  theme: string;
  type: string;
  questions: IQuestion[];
}

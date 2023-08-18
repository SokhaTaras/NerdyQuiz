import { Question } from '../../questions/interfaces/question.interface';

export interface Quiz {
  title: string;
  theme: string;
  type: string;
  id: string;
  questions: Question[];
}

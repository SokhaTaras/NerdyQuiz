import { Question } from './question.interface';
export interface Quiz {
  title: string;
  theme: string;
  type?: string;
  id: string;
  questions?: Question[];
}

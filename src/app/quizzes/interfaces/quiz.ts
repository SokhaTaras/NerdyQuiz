import { Question } from '../../questions/interfaces/question';

export interface Quiz {
  title?: string;
  theme?: string;
  type?: string;
  id?: string;
  questions?: Question[];
}

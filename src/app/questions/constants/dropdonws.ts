import { AnswerList } from '../interfaces/question.interface';
import {
  QUESTION_BOOLEAN,
  QUESTION_DIFFICULTY,
  QUESTION_TYPE
} from '../../shared/enums/question-info';

export const AnswerBooleanList: AnswerList[] = [
  {
    value: QUESTION_BOOLEAN.TRUE,
    text: 'DROPDOWNS.BOOLEAN.TRUE'
  },
  {
    value: QUESTION_BOOLEAN.FALSE,
    text: 'DROPDOWNS.BOOLEAN.FALSE'
  }
];

export const AnswerTypeList: AnswerList[] = [
  {
    value: QUESTION_TYPE.MULTIPLE,
    text: 'DROPDOWNS.TYPE.MULTIPLE'
  },
  {
    value: QUESTION_TYPE.BOOLEAN,
    text: 'DROPDOWNS.TYPE.BOOLEAN'
  }
];

export const AnswerDifficultyList: AnswerList[] = [
  {
    value: QUESTION_DIFFICULTY.EASY,
    text: 'DROPDOWNS.DIFFICULTY.EASY'
  },
  {
    value: QUESTION_DIFFICULTY.MEDIUM,
    text: 'DROPDOWNS.DIFFICULTY.MEDIUM'
  },
  {
    value: QUESTION_DIFFICULTY.HARD,
    text: 'DROPDOWNS.DIFFICULTY.HARD'
  }
];

import { AnswerList } from '../interfaces/question';
import {
  QUESTION_BOOLEAN,
  QUESTION_DIFFICULTY,
  QUESTION_TYPE
} from '../../shared/enums/question-info';

export const AnswerBooleanList: AnswerList[] = [
  {
    value: QUESTION_BOOLEAN.TRUE,
    text: 'DROPDOWN.BOOLEAN.TRUE'
  },
  {
    value: QUESTION_BOOLEAN.FALSE,
    text: 'DROPDOWN.BOOLEAN.FALSE'
  }
];

export const AnswerTypeList: AnswerList[] = [
  {
    value: QUESTION_TYPE.MULTIPLE,
    text: 'DROPDOWN.TYPE.MULTIPLE'
  },
  {
    value: QUESTION_TYPE.BOOLEAN,
    text: 'DROPDOWN.TYPE.BOOLEAN'
  }
];

export const AnswerDifficultyList: AnswerList[] = [
  {
    value: QUESTION_DIFFICULTY.EASY,
    text: 'DROPDOWN.DIFFICULTY.EASY'
  },
  {
    value: QUESTION_DIFFICULTY.MEDIUM,
    text: 'DROPDOWN.DIFFICULTY.MEDIUM'
  },
  {
    value: QUESTION_DIFFICULTY.HARD,
    text: 'DROPDOWN.DIFFICULTY.HARD'
  }
];

import { DropDownItem } from '@a-questions/interfaces/question';
import {
  QUESTION_BOOLEAN,
  QUESTION_DIFFICULTY,
  QUESTION_TYPE
} from '@a-shared/enums/question-info';

export const AnswerBooleanList: DropDownItem[] = [
  {
    value: QUESTION_BOOLEAN.TRUE,
    text: 'DROPDOWN.BOOLEAN.TRUE'
  },
  {
    value: QUESTION_BOOLEAN.FALSE,
    text: 'DROPDOWN.BOOLEAN.FALSE'
  }
];

export const AnswerTypeList: DropDownItem[] = [
  {
    value: QUESTION_TYPE.MULTIPLE,
    text: 'DROPDOWN.TYPE.MULTIPLE'
  },
  {
    value: QUESTION_TYPE.BOOLEAN,
    text: 'DROPDOWN.TYPE.BOOLEAN'
  }
];

export const AnswerDifficultyList: DropDownItem[] = [
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

import { RadioButtonItem } from '@a-questions/interfaces/question';
import { DifficultiesEnum } from '@a-shared/enums/question-info';
import { AnswerDifficultyList } from '@a-questions/constants/dropdowns';

export enum BUTTON_TYPE {
  PRIMARY,
  SECONDARY,
  DEFAULT,
  ERROR
}

export enum POPOVER_ITEM_TYPE {
  PRIMARY,
  SECONDARY,
  ERROR
}

export enum LABELS {
  GREEN,
  YELLOW,
  RED
}

export enum DIVIDER {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

export enum CORRECTNESS {
  CORRECT,
  WRONG
}

export const defaultDifficulty: RadioButtonItem = {
  value: DifficultiesEnum.Easy,
  text: AnswerDifficultyList[0].text
};

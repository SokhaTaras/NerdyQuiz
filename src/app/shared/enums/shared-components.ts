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

export enum SVG_TYPE {
  CHECK = 'assets/icons/check.svg',
  CHEVRON_DOWN = 'assets/icons/chevron-down.svg',
  EDIT = 'assets/icons/edit.svg',
  FILE_PLUS = 'assets/icons/file-plus.svg',
  LOG_OUT = 'assets/icons/log-out.svg',
  MORE_HORIZONTAL = 'assets/icons/more-horizontal.svg',
  REFRESH = 'assets/icons/refresh-ccw.svg',
  TRASH = 'assets/icons/trash-2.svg',
  TRASH_RED = 'assets/icons/trash-red.svg',
  X = 'assets/icons/x.svg'
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

export const defaultDifficulty: RadioButtonItem = {
  value: DifficultiesEnum.Easy,
  text: AnswerDifficultyList[0].text,
  isChecked: true
};

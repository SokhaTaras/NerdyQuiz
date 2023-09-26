import { DropDownItem } from '@a-questions/interfaces/question';
import { DifficultiesEnum } from '@a-shared/enums/question-info';
import { AnswerDifficultyList } from '@a-questions/constants/dropdonws';

export enum BUTTON_TYPE {
  PRIMARY,
  SECONDARY,
  ERROR
}

export enum POPOVER_TYPE {
  CARD
}

export const defaultDifficulty: DropDownItem = {
  value: DifficultiesEnum.Easy,
  text: AnswerDifficultyList[0].text
};

export const defaultCategory: DropDownItem = {
  value: 'category',
  text: 'Category'
};

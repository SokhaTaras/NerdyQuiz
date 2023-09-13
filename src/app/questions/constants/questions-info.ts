import { Difficulties } from '../../shared/types/formsType';
import { DifficultyRange } from '../interfaces/question';

export const maxQuestionsAmount = 4;
export const minQuestionsAmount = 2;

export const DifficultyPoints: Difficulties = {
  easy: 10,
  medium: 20,
  hard: 30
};

export const DifficultyRanges: DifficultyRange = {
  Easy: { min: 10, max: 15 },
  Medium: { min: 16, max: 20 },
  Hard: { min: 21, max: 30 }
};

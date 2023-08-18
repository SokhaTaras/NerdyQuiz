import {
  QuestionDifficulty,
  QuestionType
} from '../interfaces/drowdown.interface';

export const TypeList: QuestionType[] = [
  { nameEn: 'Boolean', nameUa: 'Істинний' },
  { nameEn: 'Multiple', nameUa: 'Кілька запитань' }
];

export const DifficultyList: QuestionDifficulty[] = [
  { nameEn: 'Easy', nameUa: 'Просто' },
  { nameEn: 'Medium', nameUa: 'Середньо' },
  { nameEn: 'Hard', nameUa: 'Важко' }
];

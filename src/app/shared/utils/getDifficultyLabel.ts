import { QUIZ_DIFFICULTY } from '@a-quizzes/interfaces/quiz';
import { LABELS } from '@a-shared/enums/shared-components';

export function getDifficultyLabel(difficulty: string): LABELS {
  if (difficulty === QUIZ_DIFFICULTY.EASY) {
    return LABELS.GREEN;
  } else if (difficulty === QUIZ_DIFFICULTY.MEDIUM) {
    return LABELS.YELLOW;
  } else {
    return LABELS.RED;
  }
}

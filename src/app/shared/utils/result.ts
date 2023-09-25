import { Result } from '../enums/result';

export function getResultText(rating: number): string {
  if (rating === Result.EXCELLENT) {
    return 'RESULT_QUOTES.EXCELLENT';
  } else if (rating >= Result.TRY_HARDER) {
    return 'RESULT_QUOTES.PASSED_QUIZ';
  } else if (rating < Result.TRY_HARDER && rating > Result.LEARN_MORE) {
    return 'RESULT_QUOTES.TRY_HARDER';
  } else {
    return 'RESULT_QUOTES.LEARN_MORE';
  }
}

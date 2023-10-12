import { Result } from '../enums/result';
import { ResultSetup } from '@a-shared/types/result-setup';
import { LABELS } from '@a-shared/enums/shared-components';

export function getResultSetup(rating: number): ResultSetup {
  if (rating === Result.EXCELLENT) {
    return {
      text: 'RESULT_QUOTES.EXCELLENT',
      labelType: LABELS.PURPLE
    };
  } else if (rating >= Result.TRY_HARDER) {
    return {
      text: 'RESULT_QUOTES.PASSED_QUIZ',
      labelType: LABELS.GREEN
    };
  } else if (rating < Result.TRY_HARDER && rating > Result.LEARN_MORE) {
    return {
      text: 'RESULT_QUOTES.TRY_HARDER',
      labelType: LABELS.YELLOW
    };
  } else {
    return {
      text: 'RESULT_QUOTES.LEARN_MORE',
      labelType: LABELS.RED
    };
  }
}

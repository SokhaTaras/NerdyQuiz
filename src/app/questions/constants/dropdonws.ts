import { Translations } from '../../shared/types/translations';
import { AnswerList } from '../interfaces/question.interface';
import {
  QUESTION_BOOLEAN,
  QUESTION_DIFFICULTY,
  QUESTION_TYPE
} from '../../shared/enums/question-info';

export const TypeList: Translations[] = [
  [
    { lang: 'en', text: 'Multiple' },
    { lang: 'ua', text: 'Кілька запитань' }
  ],
  [
    { lang: 'en', text: 'Boolean' },
    { lang: 'ua', text: 'Істинний' }
  ]
];

export const DifficultyList: Translations[] = [
  [
    { lang: 'en', text: 'Easy' },
    { lang: 'ua', text: 'Просто' }
  ],
  [
    { lang: 'en', text: 'Medium' },
    { lang: 'ua', text: 'Середньо' }
  ],
  [
    { lang: 'en', text: 'Hard' },
    { lang: 'ua', text: 'Важко' }
  ]
];

export const BooleanList: Translations[] = [
  [
    { lang: 'en', text: 'True' },
    { lang: 'ua', text: 'Істина' }
  ],
  [
    { lang: 'en', text: 'False' },
    { lang: 'ua', text: 'Хибно' }
  ]
];

export const AnswerBooleanList: AnswerList[] = [
  {
    value: QUESTION_BOOLEAN.TRUE,
    translations: [
      { lang: 'en', text: 'True' },
      { lang: 'ua', text: 'Істина' }
    ]
  },
  {
    value: QUESTION_BOOLEAN.FALSE,
    translations: [
      { lang: 'en', text: 'False' },
      { lang: 'ua', text: 'Хибно' }
    ]
  }
];

export const AnswerTypeList: AnswerList[] = [
  {
    value: QUESTION_TYPE.MULTIPLE,
    translations: [
      { lang: 'en', text: 'Multiple' },
      { lang: 'ua', text: 'Кілька запитань' }
    ]
  },
  {
    value: QUESTION_TYPE.BOOLEAN,
    translations: [
      { lang: 'en', text: 'Boolean' },
      { lang: 'ua', text: 'Істинний' }
    ]
  }
];

export const AnswerDifficultyList: AnswerList[] = [
  {
    value: QUESTION_DIFFICULTY.EASY,
    translations: [
      { lang: 'en', text: 'Easy' },
      { lang: 'ua', text: 'Просто' }
    ]
  },
  {
    value: QUESTION_DIFFICULTY.MEDIUM,
    translations: [
      { lang: 'en', text: 'Medium' },
      { lang: 'ua', text: 'Середньо' }
    ]
  },
  {
    value: QUESTION_DIFFICULTY.HARD,
    translations: [
      { lang: 'en', text: 'Hard' },
      { lang: 'ua', text: 'Важко' }
    ]
  }
];

import { Translations } from '../../shared/types/translations';
import {
  QuestionBooleanObject,
  QuestionDifficultyObject,
  QuestionTypeObject
} from '../interfaces/question.interface';

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

export const questionTypeObj: QuestionTypeObject = {
  multiple: [
    { lang: 'en', text: 'Multiple' },
    { lang: 'ua', text: 'Кілька запитань' }
  ],
  boolean: [
    { lang: 'en', text: 'Boolean' },
    { lang: 'ua', text: 'Істинний' }
  ]
};

export const questionDifficultyObj: QuestionDifficultyObject = {
  easy: [
    { lang: 'en', text: 'Easy' },
    { lang: 'ua', text: 'Просто' }
  ],
  medium: [
    { lang: 'en', text: 'Medium' },
    { lang: 'ua', text: 'Середньо' }
  ],
  hard: [
    { lang: 'en', text: 'Hard' },
    { lang: 'ua', text: 'Важко' }
  ]
};

export const questionBooleanObj: QuestionBooleanObject = {
  true: [
    { lang: 'en', text: 'True' },
    { lang: 'ua', text: 'Істина' }
  ],
  false: [
    { lang: 'en', text: 'False' },
    { lang: 'ua', text: 'Хибно' }
  ]
};

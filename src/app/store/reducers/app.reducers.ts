import { ActionReducerMap } from '@ngrx/store';

import { AppState } from '../state/app.state';
import { quizReducers } from './quizz.reducers';

export const appReducers: ActionReducerMap<AppState, any> = {
  quizzes: quizReducers
};

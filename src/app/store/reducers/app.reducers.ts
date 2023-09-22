import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { routerReducer } from '@ngrx/router-store';
import { quizReducers } from './quizz.reducers';

export const appReducers: ActionReducerMap<AppState, any> = {
  router: routerReducer,
  quizzes: quizReducers
};

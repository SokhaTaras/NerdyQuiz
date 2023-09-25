import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { Quiz, QUIZ_DIFFICULTY } from '@a-quizzes/interfaces/quiz';
import { StorageKey } from '@a-shared/enums/storageKey';
import {
  GetQuizSuccess,
  GetQuizzesSuccess,
  QuizActions
} from '@a-store/actions/quizz.actions';

@Injectable()
export class QuizEffects {
  constructor(
    private actions$: Actions,
    private quizService: QuizService
  ) {}

  getQuizzes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActions.GetQuizzes),
      switchMap(
        (action: {
          title: string;
          questionsAmount: number;
          difficulty: QUIZ_DIFFICULTY;
        }) =>
          this.quizService.initAllQuizzes(StorageKey.QUIZZES).pipe(
            map((quizzes) =>
              GetQuizzesSuccess({
                title: action.title,
                questionsAmount: action.questionsAmount,
                difficulty: action.difficulty
              })
            ),
            catchError((error) => of(error))
          )
      )
    )
  );

  getQuiz$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActions.GetQuiz),
      switchMap((action: { quizId: string }) =>
        this.quizService.getQuizById(action.quizId).pipe(
          map((quiz: Quiz) => GetQuizSuccess({ quiz })),
          catchError((error) => of(error))
        )
      )
    )
  );
}

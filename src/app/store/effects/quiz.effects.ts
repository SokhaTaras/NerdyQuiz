import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { Quiz, QuizCard } from '@a-quizzes/interfaces/quiz';
import { StorageKey } from '@a-shared/enums/storageKey';
import {
  DeleteQuizSuccess,
  GetQuizSuccess,
  GetCardQuizzesSuccess,
  QuizActions,
  GetQuizzesSuccess,
  AddQuizSuccess,
  EditQuizSuccess
} from '@a-store/actions/quizz.actions';
import { mapQuizToQuizCard } from '@a-shared/utils/quizzMapper';

@Injectable()
export class QuizEffects {
  constructor(
    private actions$: Actions,
    private quizService: QuizService
  ) {}

  getCardQuizzes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActions.GetCardQuizzes),
      switchMap(() =>
        this.quizService.initAllQuizzes(StorageKey.QUIZZES).pipe(
          map((quizzes) => {
            const quizCards: QuizCard[] = quizzes.map((quiz) =>
              mapQuizToQuizCard(quiz)
            );
            return GetCardQuizzesSuccess({ cardQuizzes: quizCards });
          }),
          catchError((error) => of(error))
        )
      )
    )
  );

  getCardQuiz$ = createEffect(() =>
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

  deleteQuiz$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActions.DeleteQuiz),
      switchMap((action: { quizToDelete: Quiz }) =>
        this.quizService.deleteQuiz(action.quizToDelete).pipe(
          map((quiz: Quiz) => DeleteQuizSuccess({ quizToDelete: quiz })),
          catchError((error) => of(error))
        )
      )
    )
  );

  addQuiz$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActions.AddQuiz),
      switchMap((action: { quiz: Quiz }) => {
        return this.quizService.addQuiz(action.quiz).pipe(
          map((quiz: Quiz) => AddQuizSuccess({ quiz })),
          catchError((error) => of(error))
        );
      })
    )
  );

  getQuizzes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActions.GetQuizzes),
      switchMap(() =>
        this.quizService.initAllQuizzes(StorageKey.QUIZZES).pipe(
          map((quizzes) => {
            return GetQuizzesSuccess({ quizzes: quizzes });
          }),
          catchError((error) => of(error))
        )
      )
    )
  );

  EditQuiz$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActions.EditQuiz),
      switchMap((action: { quiz: Quiz }) =>
        this.quizService.editQuiz(action.quiz.id, action.quiz).pipe(
          map((quiz) => {
            return EditQuizSuccess({ quizId: quiz.id, quiz: quiz });
          }),
          catchError((error) => of(error))
        )
      )
    )
  );
}

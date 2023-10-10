import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { Quiz } from '@a-quizzes/interfaces/quiz';
import { StorageKey } from '@a-shared/enums/storageKey';
import {
  DeleteQuizSuccess,
  QuizActions,
  GetQuizzesSuccess,
  AddQuizSuccess,
  EditQuizSuccess,
  AddQuestionSuccess,
  GetQuizSuccess,
  DeleteQuestionSuccess
} from '@a-store/actions/quizz.actions';
import { Question } from '@a-questions/interfaces/question';

@Injectable()
export class QuizEffects {
  constructor(
    private actions$: Actions,
    private quizService: QuizService
  ) {}

  deleteQuiz$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActions.DeleteQuiz),
      switchMap((action: { quizToDelete: Quiz }) =>
        this.quizService.deleteQuiz(action.quizToDelete).pipe(
          map(() => {
            return DeleteQuizSuccess({ quizToDelete: action.quizToDelete });
          }),
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

  addQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActions.AddQuestion),
      switchMap((action: { quizId: string; question: Question }) =>
        this.quizService.addQuestion(action.quizId, action.question).pipe(
          map((question) => AddQuestionSuccess({ question })),
          catchError((error) => of(error))
        )
      )
    )
  );

  deleteQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActions.DeleteQuestion),
      switchMap((action: { quizId: string; questionIndex: number }) =>
        this.quizService
          .deleteQuestion(action.quizId, action.questionIndex)
          .pipe(
            map((question) => DeleteQuestionSuccess({ question })),
            catchError((error) => of(error))
          )
      )
    )
  );
}

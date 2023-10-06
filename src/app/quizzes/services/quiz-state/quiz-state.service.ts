import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Quiz } from '@a-quizzes/interfaces/quiz';
import {
  selectQuizzesList,
  selectSelectedQuiz
} from '@a-store/selectors/quiz.selectors';
import { Observable } from 'rxjs';
import { AppState } from '@a-store/state/app.state';
import {
  AddQuiz,
  DeleteQuiz,
  EditQuiz,
  GetQuiz,
  GetQuizzes
} from '@a-store/actions/quizz.actions';

@Injectable({
  providedIn: 'root'
})
export class QuizStateService {
  constructor(private store: Store<AppState>) {}

  getQuizzesList(): Observable<Quiz[]> {
    return this.store.select(selectQuizzesList);
  }

  dispatchQuizzes(): void {
    this.store.dispatch(GetQuizzes());
  }

  getSelectedQuiz(): Observable<Quiz> {
    return this.store.select(selectSelectedQuiz);
  }

  dispatchSelectedQuiz(quizId: string): void {
    this.store.dispatch(GetQuiz({ quizId }));
  }

  deleteQuiz(quizToDelete: Quiz): void {
    this.store.dispatch(DeleteQuiz({ quizToDelete }));
  }

  editQuiz(quizId: string, quiz: Quiz): void {
    this.store.dispatch(EditQuiz({ quizId, quiz }));
  }

  addQuiz(quiz: Quiz): void {
    this.store.dispatch(AddQuiz({ quiz }));
  }
}

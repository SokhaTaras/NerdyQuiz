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
  selectedQuiz$: Observable<Quiz> = this.store.select(selectSelectedQuiz);
  quizzesList$: Observable<Quiz[]> = this.store.select(selectQuizzesList);

  constructor(private store: Store<AppState>) {}

  getQuizzesList(): void {
    this.store.dispatch(GetQuizzes());
  }

  getQuiz(quizId: string): void {
    this.store.dispatch(GetQuiz({ quizId }));
  }

  deleteQuiz(quiz: Quiz): void {
    this.store.dispatch(DeleteQuiz({ quiz }));
  }

  editQuiz(quizId: string, quiz: Quiz): void {
    this.store.dispatch(EditQuiz({ quizId, quiz }));
  }

  addQuiz(quiz: Quiz): void {
    this.store.dispatch(AddQuiz({ quiz }));
  }
}

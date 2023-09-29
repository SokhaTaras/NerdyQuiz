import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { NavigateToService } from '@a-shared/services/navigate-to/navigate-to.service';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { Quiz } from '@a-quizzes/interfaces/quiz';
import { ModalQuizService } from '@a-quizzes/services/modal-quiz/modal-quiz.service';
import { BUTTON_TYPE } from '@a-shared/enums/shared-components';
import { AppState } from '@a-store/state/app.state';
import { selectQuizzesList } from '@a-store/selectors/quiz.selectors';
import { GetQuizzes } from '@a-store/actions/quizz.actions';
import { QuizService } from '@a-quizzes/services/quiz/quiz.service';

@Component({
  selector: 'quiz-app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
  providers: [SubscriptionsService]
})
export class QuizListComponent implements OnInit {
  readonly BUTTON_TYPE = BUTTON_TYPE;

  quizzes$ = new BehaviorSubject<Quiz[]>([]);

  isLoading: boolean;

  constructor(
    private modalQuizService: ModalQuizService,
    private quizService: QuizService,
    private navigateTo: NavigateToService,
    private subscriptionsService: SubscriptionsService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.initQuizzes();
  }

  openInitPopUp(): void {
    const data: any = {
      label: 'BUTTON.CREATE_QUIZ',
      buttonText: 'BUTTON.SAVE'
    };
    this.subscriptionsService.addSubscription(
      this.modalQuizService
        .showInitQuizModal(data)
        .onClose.subscribe((quiz) => {
          if (quiz) {
            this.navigateTo.navigateToQuizDetailsPage(quiz.id);
          }
        })
    );
  }

  //todo we need single source app
  private initQuizzes(): void {
    this.isLoading = true;
    this.store.dispatch(GetQuizzes());

    this.subscriptionsService.addSubscription(
      this.store
        .pipe(
          select(selectQuizzesList),
          filter((quizzes) => quizzes !== null && quizzes.length > 0)
        )
        .subscribe(() => (this.isLoading = false))
    );
    this.quizzes$ = this.quizService.quizzes$;
  }
}

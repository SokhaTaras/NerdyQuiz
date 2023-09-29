import { Component, OnInit } from '@angular/core';
import { filter, Observable } from 'rxjs';

import { NavigateToService } from '@a-shared/services/navigate-to/navigate-to.service';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { QuizCard } from '@a-quizzes/interfaces/quiz';
import { ModalQuizService } from '@a-quizzes/services/modal-quiz/modal-quiz.service';
import { BUTTON_TYPE } from '@a-shared/enums/shared-components';
import { AppState } from '@a-store/state/app.state';
import { selectQuizzesList } from '@a-store/selectors/quiz.selectors';
import { GetQuizzes } from '@a-store/actions/quizz.actions';
import { StoreService } from '@a-store/services/store.service';

@Component({
  selector: 'quiz-app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
  providers: [SubscriptionsService]
})
export class QuizListComponent implements OnInit {
  readonly BUTTON_TYPE = BUTTON_TYPE;

  quizzes$ = new Observable<QuizCard[]>();

  isLoading: boolean;

  constructor(
    private modalQuizService: ModalQuizService,
    private navigateTo: NavigateToService,
    private subscriptionsService: SubscriptionsService,
    private storeService: StoreService<AppState>
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

  //todo we need single source of data
  private initQuizzes(): void {
    this.isLoading = true;
    this.storeService.dispatcher(GetQuizzes());

    this.quizzes$ = this.storeService
      .selection(selectQuizzesList)
      .pipe(filter((quizzes) => quizzes !== null && quizzes.length > 0));

    this.subscriptionsService.addSubscription(
      this.quizzes$.subscribe(() => (this.isLoading = false))
    );
  }
}

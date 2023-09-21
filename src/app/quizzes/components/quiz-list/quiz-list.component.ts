import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { NavigateToService } from '@a-shared/services/navigate-to/navigate-to.service';
import { StorageKey } from '@a-shared/enums/storageKey';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { Quiz } from '@a-quizzes/interfaces/quiz';
import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { ModalQuizService } from '@a-quizzes/services/modal-quiz/modal-quiz.service';
import { BUTTON_TYPE } from '@a-shared/enums/shared-components';

@Component({
  selector: 'quiz-app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
  providers: [SubscriptionsService]
})
export class QuizListComponent implements OnInit {
  allQuizzes$ = new BehaviorSubject<Quiz[]>([]);
  isLoading: boolean;

  readonly BUTTON_TYPE = BUTTON_TYPE;

  constructor(
    private quizService: QuizService,
    private modalQuizService: ModalQuizService,
    private navigateTo: NavigateToService,
    private subscriptionsService: SubscriptionsService
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

  private initQuizzes(): void {
    this.isLoading = true;

    this.subscriptionsService.addSubscription(
      this.quizService
        .initAllQuizzes(StorageKey.QUIZZES)
        .subscribe(() => (this.isLoading = false))
    );
    this.allQuizzes$ = this.quizService.quizzes$;
  }
}

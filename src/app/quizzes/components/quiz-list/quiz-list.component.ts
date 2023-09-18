import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { QuizService } from '../../services/quiz/quiz.service';
import { ModalQuizService } from '../../services/modal-quiz/modal-quiz.service';
import { NavigateToService } from '../../../shared/services/navigate-to/navigate-to.service';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';
import { SubscriptionsService } from '../../../shared/services/subscription/subscriptions.service';
import { StorageKey } from '../../../shared/enums/storageKey';
import { Quiz } from '../../interfaces/quiz';

@Component({
  selector: 'quiz-app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
  providers: [SubscriptionsService]
})
export class QuizListComponent implements OnInit {
  allQuizzes: Quiz[];
  isLoading: Boolean;

  readonly BUTTON_TYPE = BUTTON_TYPE;

  ngOnInit(): void {
    this.initQuizzes();
  }

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
        .subscribe((quizzes): Quiz[] => {
          this.isLoading = false;
          return (this.allQuizzes = quizzes);
        })
    );
  }
}

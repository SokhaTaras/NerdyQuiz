import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { QuizService } from '../../services/quiz/quiz.service';
import { ModalQuizService } from '../../services/modal-quiz/modal-quiz.service';
import { NavigateToService } from '../../../shared/services/navigate-to/navigate-to.service';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';

@Component({
  selector: 'quiz-app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnDestroy {
  allQuizzes$ = this.quizService.quizzes$;
  modalSubscription: Subscription;

  protected readonly BUTTON_TYPE = BUTTON_TYPE;

  constructor(
    private quizService: QuizService,
    private modalQuizService: ModalQuizService,
    private navigateTo: NavigateToService
  ) {}

  openInitPopUp(): void {
    const data: any = {
      label: 'BUTTON.CREATE_QUIZ',
      buttonText: 'BUTTON.SAVE'
    };
    this.modalSubscription = this.modalQuizService
      .showInitQuizModal(data)
      .onClose.subscribe((quiz) => {
        if (quiz) {
          this.navigateTo.navigateToQuizDetailsPage(quiz.id);
        }
      });
  }

  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
  }
}

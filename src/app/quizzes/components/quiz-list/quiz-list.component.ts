import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { QuizService } from '../../services/quiz/quiz.service';
import { ModalQuizService } from '../../services/modal-quiz/modal-quiz.service';
import { NavigateToService } from '../../../shared/services/navigate-to/navigate-to.service';

@Component({
  selector: 'quiz-app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnDestroy {
  allQuizzes$ = this.quizService.quizzes$;
  modalSubscription: Subscription;

  constructor(
    private quizService: QuizService,
    private modalQuizService: ModalQuizService,
    private navigateTo: NavigateToService
  ) {}

  openInitPopUp(): void {
    const data: any = {
      label: 'buttons.create-quiz',
      buttonText: 'buttons.save'
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

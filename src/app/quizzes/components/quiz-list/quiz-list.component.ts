import { Component } from '@angular/core';

import { QuizService } from '../../services/quiz/quiz.service';
import { ModalQuizService } from '../../services/modal-quiz/modal-quiz.service';
import { NavigateToService } from '../../../shared/services/navigate-to.service';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';

@Component({
  selector: 'quiz-app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent {
  allQuizzes$ = this.quizService.quizzes$;

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
    this.modalQuizService.showInitQuizModal(data).onClose.subscribe((quiz) => {
      if (quiz) {
        this.navigateTo.navigateToQuizDetailsPage(quiz.id);
      }
    });
  }

  protected readonly BUTTON_TYPE = BUTTON_TYPE;
}

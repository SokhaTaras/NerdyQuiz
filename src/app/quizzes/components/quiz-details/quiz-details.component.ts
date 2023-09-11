import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService } from '../../services/quiz/quiz.service';
import { ModalQuizService } from '../../services/modal-quiz/modal-quiz.service';
import { NavigateToService } from '../../../shared/services/navigate-to/navigate-to.service';
import { BaseQuizComponent } from '../../../shared/components/base-quiz/base-quiz.component';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';

@Component({
  selector: 'quiz-app-quiz-details',
  templateUrl: 'quiz-details.component.html'
})
export class QuizDetailsComponent
  extends BaseQuizComponent
  implements OnInit, OnDestroy
{
  constructor(
    private modalQuizService: ModalQuizService,
    quizService: QuizService,
    route: ActivatedRoute,
    navigateTo: NavigateToService
  ) {
    super(quizService, route, navigateTo);
  }

  protected readonly BUTTON_TYPE = BUTTON_TYPE;

  openEditPopUp(): void {
    const data: any = {
      label: 'BUTTON.EDIT_QUIZ',
      buttonText: 'BUTTON.EDIT',
      quiz: this.currentQuiz
    };
    this.modalQuizService.showInitQuizModal(data);
  }
}

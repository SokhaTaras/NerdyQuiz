import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz-state/quiz.service';
import { ModalFacadeService } from '../../services/modal-facade/modal-facade.service';

@Component({
  selector: 'quiz-app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent {
  allQuizzes$ = this.quizService.quizzes$;

  constructor(
    private quizService: QuizService,
    private modalFacadeService: ModalFacadeService,
  ) {}

  openInitPopUp(): void {
    this.modalFacadeService.showInitQuizModal();
  }
}

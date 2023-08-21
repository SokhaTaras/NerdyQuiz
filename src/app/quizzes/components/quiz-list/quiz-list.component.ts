import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz/quiz.service';
import { ModalQuizService } from '../../services/modal-quiz/modal-quiz.service';
import { ModalInputDataInterface } from '../../../shared/interfaces/modalInputData.interface';

@Component({
  selector: 'quiz-app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent {
  allQuizzes$ = this.quizService.quizzes$;

  constructor(
    private quizService: QuizService,
    private modalQuizService: ModalQuizService
  ) {}

  //TODO change hardcode when json with text will be ready
  openInitPopUp(): void {
    const data: ModalInputDataInterface = {
      title: 'Create quiz',
      buttonText: 'Save',
      isSave: true
    };
    this.modalQuizService.showInitQuizModal(data);
  }
}

import { Component, Input } from '@angular/core';

import { confirmModalInterface } from '../../interfaces/modalData.interface';
import { ModalQuizService } from '../../../quizzes/services/modal-quiz/modal-quiz.service';
import { QuestionsService } from '../../../questions/services/questions/questions.service';

@Component({
  selector: 'quiz-app-confirm-modal',
  templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent {
  @Input() inputData: confirmModalInterface;

  constructor(
    private modalQuiz: ModalQuizService,
    private questionService: QuestionsService
  ) {}

  deleteQuiz(): void {
    const quizId = this.inputData?.quizId;
    const questionIndex = this.inputData?.questionIndex;
    this.questionService.deleteQuestion(quizId, questionIndex);
    this.modalQuiz.closeModal();
  }
}

import { Component, Input } from '@angular/core';

import { ModalQuizService } from '../../../quizzes/services/modal-quiz/modal-quiz.service';
import { QuizService } from '../../../quizzes/services/quiz/quiz.service';

@Component({
  selector: 'quiz-app-confirm-modal',
  templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent {
  @Input() text: string;
  @Input() buttonText: string;
  @Input() questionIndex: number;
  @Input() quizId: string;

  constructor(
    private modalQuiz: ModalQuizService,
    private quizService: QuizService
  ) {}

  deleteQuiz(): void {
    this.quizService.deleteQuestion(this.quizId, this.questionIndex);
    this.modalQuiz.closeModal();
  }
}

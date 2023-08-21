import { Component, Input } from '@angular/core';
import { confirmModalInterface } from '../../interfaces/modalData.interface';
import { ModalQuizService } from '../../../quizzes/services/modal-quiz/modal-quiz.service';
import { QuizService } from '../../../quizzes/services/quiz/quiz.service';
import { QuestionsService } from '../../../questions/services/questions/questions.service';

@Component({
  selector: 'quiz-app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  @Input() inputData: confirmModalInterface | undefined;

  constructor(
    private modalQuiz: ModalQuizService,
    private questionService: QuestionsService
  ) {}

  deleteQuiz() {
    const quizId = this.inputData?.quizId;
    const questionIndex = this.inputData?.questionIndex;
    this.questionService.deleteQuestion(quizId, questionIndex);
    this.modalQuiz.closeModal();
  }
}

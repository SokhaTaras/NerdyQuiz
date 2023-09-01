import { Component, Input } from '@angular/core';

import { ModalQuizService } from '../../../quizzes/services/modal-quiz/modal-quiz.service';
import { Question } from '../../interfaces/question';
import { QuizService } from '../../../quizzes/services/quiz/quiz.service';

@Component({
  selector: 'quiz-app-question-card',
  templateUrl: './question-card.component.html'
})
export class QuestionCardComponent {
  @Input() question: Question;
  @Input() questionIndex: number;
  @Input() quizId: string | null;

  constructor(
    private modalQuizService: ModalQuizService,
    private quizService: QuizService
  ) {}

  deleteQuestionConfirm(): void {
    const data: any = {
      text: 'Are you sure you want delete question?',
      buttonText: 'Confirm',
      questionIndex: this.questionIndex,
      quizId: this.quizId
    };
    this.modalQuizService
      .confirmDeletionModal(data)
      .onClose.subscribe((isConfirm) => {
        if (isConfirm) {
          this.deleteQuiz();
        }
      });
  }

  private deleteQuiz(): void {
    this.quizService.deleteQuestion(this.quizId, this.questionIndex);
  }
}

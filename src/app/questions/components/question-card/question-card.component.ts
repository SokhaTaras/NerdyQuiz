import { Component, Input } from '@angular/core';

import { ModalQuizService } from '../../../quizzes/services/modal-quiz/modal-quiz.service';

import { Question } from '../../interfaces/question.interface';

@Component({
  selector: 'quiz-app-question-card',
  templateUrl: './question-card.component.html'
})
export class QuestionCardComponent {
  @Input() question: Question;
  @Input() questionIndex: number;
  @Input() quizId: string | null;

  constructor(private modalQuizService: ModalQuizService) {}

  deleteQuestionConfirm(): void {
    const data: any = {
      text: 'Are you sure you want delete question?',
      buttonText: 'Confirm',
      questionIndex: this.questionIndex as number,
      quizId: this.quizId as string
    };
    this.modalQuizService.showConfirmModal(data);
  }
}

import { Component, Input } from '@angular/core';
import { Question } from '../../interfaces/question.interface';
import { QuestionsService } from '../../services/questions/questions.service';

@Component({
  selector: 'quiz-app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent {
  @Input() question: Question | undefined;
  @Input() questionIndex: number | undefined;
  @Input() quizId: string | undefined;

  constructor(private questionService: QuestionsService) {}

  deleteQuestionConfirm(): void {
    this.questionService.deleteQuestion(this.quizId, this.questionIndex);
  }
}

import { Component, Input } from '@angular/core';
import { QuestionsService } from '../../services/questions/questions.service';

@Component({
  selector: 'quiz-app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent {
  @Input() quizId: string | undefined;
  displayCreateQuestion: boolean = false;
  allQuestions$ = this.questionService.questions$;

  constructor(private questionService: QuestionsService) {}

  addQuestion() {
    this.displayCreateQuestion = true;
  }
}

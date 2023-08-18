import { Component, Input } from '@angular/core';

@Component({
  selector: 'quiz-app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent {
  @Input() quizId: string | undefined;

  constructor() {}
}

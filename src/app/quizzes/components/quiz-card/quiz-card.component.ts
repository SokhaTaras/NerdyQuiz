import { Component, Input } from '@angular/core';

import { Quiz } from '../../interfaces/quiz.interface';

@Component({
  selector: 'quiz-app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent {
  @Input() quiz: Quiz;
}

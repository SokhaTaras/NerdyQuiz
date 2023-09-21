import { Component, Input } from '@angular/core';

import { Quiz } from '@a-quizzes/interfaces/quiz';
import { BUTTON_TYPE, POPOVER_TYPE } from '@a-shared/enums/shared-components';
import { NavigateToService } from '@a-shared/services/navigate-to/navigate-to.service';

@Component({
  selector: 'quiz-app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent {
  @Input() quiz: Quiz;

  readonly BUTTON_TYPE = BUTTON_TYPE;
  readonly POPOVER_TYPE = POPOVER_TYPE;

  constructor(private navigateTo: NavigateToService) {}

  goPlay(): void {
    this.navigateTo.navigatePlay(this.quiz);
  }
}

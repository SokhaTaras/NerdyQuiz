import { Component, Input } from '@angular/core';

import { Quiz } from '../../interfaces/quiz';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';
import { NavigateToService } from '../../../shared/services/navigate-to/navigate-to.service';

@Component({
  selector: 'quiz-app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent {
  @Input() quiz: Quiz;
  protected readonly BUTTON_TYPE = BUTTON_TYPE;

  constructor(private navigateTo: NavigateToService) {}

  goPlay(): void {
    this.navigateTo.navigatePlay(this.quiz);
  }
}

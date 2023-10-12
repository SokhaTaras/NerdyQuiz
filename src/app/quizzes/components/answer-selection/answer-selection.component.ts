import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Answer, Question } from '@a-questions/interfaces/question';
import { BUTTON_TYPE } from '@a-shared/enums/shared-components';
import { SVG_COLOR, SVG_TYPE } from '@a-shared/enums/svg';

@Component({
  selector: 'quiz-app-answer-selection',
  templateUrl: './answer-selection.component.html'
})
export class AnswerSelectionComponent {
  @Input() currentQuestion: Question;
  @Input() selectedAnswer: Answer;
  @Output() whenSelectAnswer = new EventEmitter<Answer>();

  readonly BUTTON_TYPE = BUTTON_TYPE;
  readonly SVG_COLOR = SVG_COLOR;
  readonly SVG_TYPE = SVG_TYPE;

  selectAnswer(answer: Answer): void {
    this.whenSelectAnswer.emit(answer);
  }
}

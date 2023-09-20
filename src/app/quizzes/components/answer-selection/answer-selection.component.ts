import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BUTTON_TYPE } from '../../../shared/enums/buttonType';
import { Answer, Question } from '../../../questions/interfaces/question';

@Component({
  selector: 'quiz-app-answer-selection',
  templateUrl: './answer-selection.component.html'
})
export class AnswerSelectionComponent {
  @Input() currentQuestion: Question;
  @Input() selectedAnswer: Answer;
  @Output() whenSelectAnswer = new EventEmitter<Answer>();

  readonly BUTTON_TYPE = BUTTON_TYPE;

  selectAnswer(answer: Answer): void {
    this.whenSelectAnswer.emit(answer);
  }
}

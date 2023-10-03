import { Component, EventEmitter, Output } from '@angular/core';
import { BUTTON_TYPE } from '@a-shared/enums/shared-components';

@Component({
  selector: 'quiz-app-add-quiz',
  templateUrl: './add-quiz.component.html'
})
export class AddQuizComponent {
  @Output() whenClicked: EventEmitter<void> = new EventEmitter();

  readonly BUTTON_TYPE = BUTTON_TYPE;

  emitClick(): void {
    this.whenClicked.emit();
  }
}

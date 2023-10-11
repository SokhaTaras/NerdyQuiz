import { Component, EventEmitter, Input, Output } from '@angular/core';

import { RadioButtonItem } from '@a-questions/interfaces/question';

@Component({
  selector: 'quiz-app-radio-button',
  templateUrl: './radio-button.component.html'
})
export class RadioButtonComponent {
  @Input() isChecked: boolean;
  @Output() whenChecked = new EventEmitter<RadioButtonItem>();

  onRadioClick(): void {
    this.whenChecked.emit();
  }
}

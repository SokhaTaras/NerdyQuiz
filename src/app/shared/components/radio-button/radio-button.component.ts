import { Component, EventEmitter, Input, Output } from '@angular/core';

import { RadioButtonItem } from '@a-questions/interfaces/question';

@Component({
  selector: 'quiz-app-radio-button',
  templateUrl: './radio-button.component.html'
})
export class RadioButtonComponent {
  @Input() isChecked: boolean;
  @Input() currentItem: any;
  @Output() whenChecked = new EventEmitter<RadioButtonItem>();

  onRadioClick(item: RadioButtonItem): void {
    this.whenChecked.emit(item);
  }
}

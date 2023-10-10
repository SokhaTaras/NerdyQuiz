import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'quiz-app-radio-button',
  templateUrl: './radio-button.component.html'
})
export class RadioButtonComponent {
  @Input() isChecked: boolean;
  @Output() whenChecked = new EventEmitter<void>();

  onRadioClick(): void {
    this.whenChecked.emit();
  }
}

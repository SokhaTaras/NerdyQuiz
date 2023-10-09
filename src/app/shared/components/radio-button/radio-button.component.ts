import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'quiz-app-radio-button',
  templateUrl: './radio-button.component.html'
})
export class RadioButtonComponent {
  @Input() isChecked: boolean;
  @Input() currentItem: any;
  @Output() whenChecked = new EventEmitter<any>();

  onRadioClick(item: any): void {
    this.whenChecked.emit(item);
  }
}

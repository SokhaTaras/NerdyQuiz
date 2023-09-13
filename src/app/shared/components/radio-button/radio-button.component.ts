import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'quiz-app-radio-button',
  templateUrl: './radio-button.component.html'
})
export class RadioButtonComponent implements OnInit {
  @Input() id: number;
  @Input() control: FormControl;

  isSelected: boolean;

  ngOnInit(): void {
    this.isSelected = this.control.value;
  }

  selectItem(item: boolean): void {
    this.control.setValue(item);
  }
}

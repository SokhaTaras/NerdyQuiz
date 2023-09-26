import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DropDownItem } from '@a-questions/interfaces/question';

@Component({
  selector: 'quiz-app-select',
  templateUrl: './select.component.html'
})
export class SelectComponent {
  @Input() list: DropDownItem[];
  @Input() label: string;
  @Input() control: FormControl = new FormControl();
  @Input() placeHolder: string = '';

  selectedValue: string;

  selectItem(item: string): void {
    console.log(item);
    this.selectedValue = item;
    this.control.setValue(item);
  }
}

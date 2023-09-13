import { Component, Input } from '@angular/core';
import { DropDownItem } from '../../../questions/interfaces/question';
import { FormControl } from '@angular/forms';

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
    this.selectedValue = item;
    this.control.setValue(item);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DropDownItem } from '@a-questions/interfaces/question';

@Component({
  selector: 'quiz-app-select',
  templateUrl: './select.component.html'
})
export class SelectComponent {
  @Input() list: DropDownItem[];
  @Input() label: string;
  @Input() selectedValue: DropDownItem;
  @Output() whenSelected: EventEmitter<DropDownItem> = new EventEmitter();

  selectItem(item: DropDownItem): void {
    this.selectedValue = item;
    this.whenSelected.emit(this.selectedValue);
  }
}

import { Component, Input } from '@angular/core';
import { LABELS } from '@a-shared/enums/shared-components';
import { FormControl } from '@angular/forms';
import { RadioButtonItem } from '@a-questions/interfaces/question';

@Component({
  selector: 'quiz-app-labels-list',
  templateUrl: './labels-list.component.html'
})
export class LabelsListComponent {
  @Input() label: string;
  @Input() labelsList: RadioButtonItem[];
  @Input() control: FormControl<RadioButtonItem>;

  readonly LABELS = LABELS;

  radioSelectedIndex: number = 0;

  onRadioChecked(selectedIndex: number): void {
    this.control.setValue(this.labelsList[selectedIndex]);
    this.radioSelectedIndex = selectedIndex;
  }
}

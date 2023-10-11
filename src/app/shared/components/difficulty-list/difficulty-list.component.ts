import { Component, Input } from '@angular/core';
import { LABELS } from '@a-shared/enums/shared-components';
import { FormControl } from '@angular/forms';
import { RadioButtonItem } from '@a-questions/interfaces/question';

@Component({
  selector: 'quiz-app-difficulty-list',
  templateUrl: './difficulty-list.component.html'
})
export class DifficultyListComponent {
  @Input() label: string;
  @Input() labelsList: RadioButtonItem[];
  @Input() control: FormControl<RadioButtonItem>;

  readonly LABELS = LABELS;

  get controlValue(): string {
    return this.control.value.value;
  }

  onRadioChecked(item: RadioButtonItem): void {
    this.control.setValue(item);
  }
}

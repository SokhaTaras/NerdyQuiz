import { Component, Input, OnInit } from '@angular/core';
import { LABELS } from '@a-shared/enums/shared-components';
import { Label } from '@a-shared/types/label';
import { FormControl } from '@angular/forms';
import { RadioButtonItem } from '@a-questions/interfaces/question';

@Component({
  selector: 'quiz-app-labels-list',
  templateUrl: './labels-list.component.html'
})
export class LabelsListComponent implements OnInit {
  @Input() labelsList: Label[];
  @Input() control: FormControl<RadioButtonItem>;

  readonly LABELS = LABELS;

  ngOnInit() {
    console.log(this.control);
    console.log(this.labelsList);
  }
}

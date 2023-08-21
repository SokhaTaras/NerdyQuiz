import { Component, Input } from '@angular/core';
import {
  QuestionDifficulty,
  QuestionType
} from '../../../questions/interfaces/drowdown.interface';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'quiz-app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DropdownComponent,
      multi: true
    }
  ]
})
export class DropdownComponent implements ControlValueAccessor {
  @Input() list: QuestionDifficulty[] | QuestionType[] | undefined;
  @Input() title: string | null | undefined | boolean;
  @Input() control: FormControl = new FormControl();

  onChange: any = (): void => {};
  onTouched: any = (): void => {};

  writeValue(input: any): void {
    this.control.setValue(input);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  selectItem(item: QuestionDifficulty | QuestionType | string) {
    this.control.setValue(item);
    this.onChange(item);
    this.onTouched();
  }
}

import { Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'quiz-app-input',
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() placeHolder: string = '';

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
}

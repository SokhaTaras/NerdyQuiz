import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'quiz-app-modal-input',
  templateUrl: './modal-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ModalInputComponent,
      multi: true,
    },
  ],
})
export class ModalInputComponent implements ControlValueAccessor {
  @Input() control: AbstractControl = new FormControl();
  @Input() title: string = '';
  @Input() placeHolder: string = '';
  input!: string;

  onChange: any = (): void => {};
  onTouched: any = (): void => {};

  writeValue(input: any): void {
    this.input = input;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}

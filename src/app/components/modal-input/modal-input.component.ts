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
export class ModalInputComponent implements OnInit, ControlValueAccessor {
  @Input() control: AbstractControl = new FormControl();
  @Input() title: string = '';
  input!: string;
  placeHolder: string = '';
  disabled: boolean = false;

  onChange: any = (): void => {};
  onTouched: any = (): void => {};

  ngOnInit() {
    this.getPlaceHolder();
  }

  writeValue(input: any): void {
    this.input = input;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  getPlaceHolder() {
    if (this.title === 'Title') {
      this.placeHolder = 'Enter title';
    }
    if (this.title === 'Theme') {
      this.placeHolder = 'Enter theme';
    }
  }
}

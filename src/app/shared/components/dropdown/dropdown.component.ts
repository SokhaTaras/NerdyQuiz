import { Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import { Translations } from '../../types/translations.type';

@Component({
  selector: 'quiz-app-dropdown',
  templateUrl: './dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DropdownComponent,
      multi: true
    }
  ]
})
export class DropdownComponent implements ControlValueAccessor {
  @Input() list: Translations = {};
  @Input() label: string | boolean;
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

  selectItem(item: string): void {
    this.control.setValue(item);
    this.onChange(item);
    this.onTouched();
  }
}

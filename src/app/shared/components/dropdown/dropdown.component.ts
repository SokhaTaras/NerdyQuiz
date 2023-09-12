import { Component, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import { DropDownItem } from '../../../questions/interfaces/question';

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
export class DropdownComponent implements ControlValueAccessor, OnInit {
  @Input() list: DropDownItem[];
  @Input() label: string;
  @Input() control: FormControl = new FormControl();

  selectedItemText: string;

  ngOnInit(): void {
    this.selectedItemText = this.list[0].text;
  }

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

  selectItem(item: DropDownItem): void {
    this.control.setValue(item.value);
    this.selectedItemText = item.text;
    this.onChange(item);
    this.onTouched();
  }
}

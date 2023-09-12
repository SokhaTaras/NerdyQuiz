import { Component, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import { DropDownItem } from '../../../questions/interfaces/question';
import {
  mapArrayToDropDownItems,
  mapArrayToDropDownItems2
} from '../../utils/drop-down-mapper';

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
  test: DropDownItem[];

  nestedArray = [
    {
      topLevelProperty1: 'Some Value',
      topLevelProperty2: 'Another Value',
      nestedObject: {
        innerProperty1: 'Nested Value 1',
        innerProperty2: 'Nested Value 2',
        dropdownItems: [
          {
            text: 'DROPDOWN.DIFFICULTY.EASY',
            value: 'easy'
          },
          {
            text: 'DROPDOWN.DIFFICULTY.MEDIUM',
            value: 'medium'
          },
          {
            text: 'DROPDOWN.DIFFICULTY.HARD',
            value: 'hard'
          }
        ]
      }
    }
  ];

  yourArray = [
    { value: '1', text: 'Option A', x: 'lol1' },
    { value: '2', text: 'Option B', x: 'lol2' },
    { value: '3', text: 'Option C', x: 'lol3' }
  ];

  ngOnInit(): void {
    this.test = mapArrayToDropDownItems(
      this.nestedArray[0].nestedObject.dropdownItems
    );
    const x = mapArrayToDropDownItems2(
      this.nestedArray[0].nestedObject.dropdownItems,
      'value',
      'text'
    );
    console.log(this.test);
    console.log(x);
    this.selectedItemText = this.test[0].text;
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

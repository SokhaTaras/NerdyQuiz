import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'quiz-app-modal-input',
  templateUrl: './input.component.html',
})
export class InputComponent implements OnInit {
  @Input() control: AbstractControl = new FormControl();
  @Input() title: string = '';
  placeHolder: string = '';
  get formControl(): FormControl {
    return this.control as FormControl;
  }
  ngOnInit() {
    this.getPlaceHolder();
  }

  //Todo encapsulate this method
  getPlaceHolder() {
    if (this.title === 'Title') {
      this.placeHolder = 'Enter title';
    }
    if (this.title === 'Theme') {
      this.placeHolder = 'Enter theme';
    }
  }
}

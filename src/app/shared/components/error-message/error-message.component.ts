import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'quiz-app-error-message',
  templateUrl: './error-message.component.html'
})
export class ErrorMessageComponent implements OnInit {
  @Input() control: AbstractControl = new FormControl();
  errorMessage: string;

  ngOnInit(): void {
    this.subscribeToControlStatusChanges();
  }

  subscribeToControlStatusChanges() {
    this.control.statusChanges.subscribe((status) => {
      if (status === 'INVALID' && this.control.errors) {
        const errorNames = Object.keys(this.control.errors);
        this.setErrorMessage(errorNames);
      }
    });
  }

  // TODO remake it when translations will be ready
  setErrorMessage(errorNames: string[]): void {
    if (errorNames.includes('required')) {
      this.errorMessage = 'This field is required.';
    } else if (errorNames.includes('minlength')) {
      this.errorMessage = 'This field must have at least 2 characters.';
    } else {
      this.errorMessage = '';
    }
  }
}

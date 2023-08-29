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

  setErrorMessage(errorNames: string[]): void {
    if (errorNames.includes('required')) {
      this.errorMessage = 'errors.required';
    } else if (errorNames.includes('minlength')) {
      this.errorMessage = 'errors.min-length-2';
    } else {
      this.errorMessage = 'errors.error';
    }
  }

  private subscribeToControlStatusChanges(): void {
    this.control.statusChanges.subscribe((status) => {
      if (status === 'INVALID' && this.control.errors) {
        const errorNames = Object.keys(this.control.errors);
        this.setErrorMessage(errorNames);
      }
    });
  }
}

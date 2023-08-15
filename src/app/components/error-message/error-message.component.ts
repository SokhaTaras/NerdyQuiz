import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'quiz-app-error-message',
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent {
  @Input() control: AbstractControl = new FormControl();

  // TODO remake it when translations will be ready
  getErrorMessage(): string | undefined {
    if (this.control.errors?.['required']) {
      return 'This field is required.';
    }

    if (this.control.errors?.['minlength']) {
      return 'This field must have at least 2 characters.';
    }
    return undefined;
  }
}

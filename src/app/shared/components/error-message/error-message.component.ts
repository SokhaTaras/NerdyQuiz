import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FORM_STATUS } from '../../enums/formStatus';

@Component({
  selector: 'quiz-app-error-message',
  templateUrl: './error-message.component.html'
})
export class ErrorMessageComponent implements OnInit, OnDestroy {
  @Input() control: AbstractControl = new FormControl();

  errorMessage: string;
  controlSubscription: Subscription;

  ngOnInit(): void {
    this.subscribeToControlStatusChanges();
  }

  setErrorMessage(errorNames: string[]): void {
    if (errorNames.includes('required')) {
      this.errorMessage = 'ERRORS.REQUIRED';
    } else if (errorNames.includes('minlength')) {
      this.errorMessage = 'ERRORS.MIN_LENGTH_2';
    } else {
      this.errorMessage = 'ERRORS.ERROR';
    }
  }

  private subscribeToControlStatusChanges(): void {
    this.controlSubscription = this.control.statusChanges.subscribe(
      (status) => {
        if (status === FORM_STATUS.INVALID && this.control.errors) {
          const errorNames = Object.keys(this.control.errors);
          this.setErrorMessage(errorNames);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.controlSubscription.unsubscribe();
  }
}

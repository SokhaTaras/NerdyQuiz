import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

import { FORM_STATUS } from '../../enums/formStatus';
import { SubscriptionsService } from '../../services/subscription/subscriptions.service';

@Component({
  selector: 'quiz-app-error-message',
  templateUrl: './error-message.component.html',
  providers: [SubscriptionsService]
})
export class ErrorMessageComponent implements OnInit {
  @Input() control: AbstractControl = new FormControl();

  errorMessage: string;

  constructor(private subscriptionsService: SubscriptionsService) {}

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
    this.subscriptionsService.addSubscription(
      this.control.statusChanges.subscribe((status) => {
        if (status === FORM_STATUS.INVALID && this.control.errors) {
          const errorNames = Object.keys(this.control.errors);
          this.setErrorMessage(errorNames);
        }
      })
    );
  }
}

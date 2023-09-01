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

import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class SubscriptionsService implements OnDestroy {
  private subscription: Subscription = new Subscription();

  addSubscription(sub: Subscription): void {
    this.subscription.add(sub);
  }

  private removeSubscription(): void {
    this.subscription.unsubscribe();
  }

  ngOnDestroy(): void {
    this.removeSubscription();
  }
}

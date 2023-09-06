import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
  isLoading = new BehaviorSubject(false);

  setLoading(loading: boolean): void {
    this.isLoading.next(loading);
  }

  getLoading(): boolean {
    let isLoading: boolean;
    this.isLoading.subscribe((val) => {
      isLoading = val;
    });
    return isLoading;
  }
}

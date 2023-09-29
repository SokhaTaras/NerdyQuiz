import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService<State> {
  constructor(private store: Store<State>) {}

  selection<T>(selector: (state: State) => T): Observable<T> {
    return this.store.select(selector);
  }

  dispatcher(action: any): void {
    this.store.dispatch(action);
  }
}

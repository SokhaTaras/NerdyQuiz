import { Component, OnInit } from '@angular/core';

import { AppState } from '@a-store/state/app.state';
import { GetQuizzes } from '@a-store/actions/quizz.actions';
import { StoreService } from '@a-store/services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nerdyQuiz-app';

  constructor(private store: StoreService<AppState>) {}

  ngOnInit(): void {
    this.getQuizzes();
  }

  private getQuizzes(): void {
    this.store.dispatch(GetQuizzes());
  }
}

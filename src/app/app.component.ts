import { Component, OnInit } from '@angular/core';

import { AppState } from '@a-store/state/app.state';
import { GetQuizzes } from '@a-store/actions/quizz.actions';
import { StoreService } from '@a-store/services/store.service';
import { selectState } from '@a-store/selectors/quiz.selectors';

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
    this.store.dispatcher(GetQuizzes());
    this.store.selection(selectState).subscribe((val) => {
      console.log(val);
    });
  }
}

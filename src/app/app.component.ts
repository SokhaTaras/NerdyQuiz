import { Component, OnInit } from '@angular/core';

import { QuizStateService } from '@a-quizzes/services/quiz-state/quiz-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nerdyQuiz-app';

  constructor(private quizState: QuizStateService) {}

  ngOnInit(): void {
    this.setQuizzes();
  }

  private setQuizzes(): void {
    this.quizState.dispatchQuizzes();
  }
}

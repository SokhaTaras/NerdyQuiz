import { Component } from '@angular/core';

import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { StorageKey } from '@a-shared/enums/storageKey';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nerdyQuiz-app';

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.initQuizzes();
  }

  private initQuizzes(): void {
    this.quizService.initAllQuizzes(StorageKey.QUIZZES);
  }
}

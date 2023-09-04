import { Component, OnInit } from '@angular/core';

import { QuizService } from './quizzes/services/quiz/quiz.service';
import { StorageKey } from './shared/enums/storageKey';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nerdyQuiz-app';

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.quizService.initAllQuizzes(StorageKey.QUIZZES);
    this.quizService.getAverageQuizDifficulty();
  }
}

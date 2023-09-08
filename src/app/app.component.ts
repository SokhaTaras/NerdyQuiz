import { Component, OnInit } from '@angular/core';

import { StorageKey } from './shared/enums/storageKey';
import { QuizService } from './quizzes/services/quiz/quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nerdyQuiz-app';

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.initAllQuizzes(StorageKey.QUIZZES);
  }
}

import { Component, OnInit } from '@angular/core';

import { QuizService } from './quizzes/services/quiz/quiz.service';
import { StorageKey } from './shared/enums/storageKey';
import { LoaderService } from './shared/services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoaderService]
})
export class AppComponent implements OnInit {
  public title = 'nerdyQuiz-app';
  public isLoading: boolean;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.initAllQuizzes(StorageKey.QUIZZES);
  }
}

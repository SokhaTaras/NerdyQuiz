import { Component, OnInit } from '@angular/core';
import { IInitialQuiz } from '../../interfaces/initial-quiz.interface';
import { QuizStateService } from '../../services/quiz-state/quiz-state.service';
import { StorageKey } from '../../enums/StorageKey';

@Component({
  selector: 'quiz-app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss'],
})
export class QuizDetailsComponent implements OnInit {
  initialQuiz: IInitialQuiz | undefined;
  constructor(private quizService: QuizStateService) {}
  ngOnInit() {
    this.initialQuiz = this.quizService.getInitialQuiz(StorageKey.INIT_QUIZ);
    console.log(this.initialQuiz);
  }
}

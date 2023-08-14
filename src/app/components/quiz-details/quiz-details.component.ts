import { Component, OnInit } from '@angular/core';
import { InitialQuiz } from '../../interfaces/initial-quiz.interface';
import { QuizService } from '../../services/quiz-state/quiz.service';
import { StorageKey } from '../../enums/storageKey';

@Component({
  selector: 'quiz-app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss'],
})
export class QuizDetailsComponent implements OnInit {
  initialQuiz: InitialQuiz | undefined;
  constructor(private quizService: QuizService) {}
  ngOnInit() {
    this.initialQuiz = this.quizService.getInitialQuiz(StorageKey.INIT_QUIZ);
    console.log(this.initialQuiz);
  }
}

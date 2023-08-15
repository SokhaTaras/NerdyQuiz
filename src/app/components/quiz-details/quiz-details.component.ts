import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz/quiz.service';
import { Quiz } from '../../interfaces/quiz.interface';

@Component({
  selector: 'quiz-app-quiz-details',
  templateUrl: './quiz-details.component.html',
})
export class QuizDetailsComponent implements OnInit {
  initialQuiz: Quiz | undefined;
  lastQuizIndex: number | undefined;

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.lastQuizIndex = this.quizService.quizzes$.value.length - 1;
    this.initialQuiz = this.quizService.quizzes$.value[this.lastQuizIndex];
  }
}

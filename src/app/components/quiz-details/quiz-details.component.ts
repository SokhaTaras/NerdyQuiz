import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz-state/quiz.service';
import { Quiz } from '../../interfaces/quiz.interface';

@Component({
  selector: 'quiz-app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss'],
})
export class QuizDetailsComponent implements OnInit {
  initialQuiz: Quiz | undefined;
  lastQuizIndex: number = this.quizService.quizzes$.value.length - 1;
  constructor(private quizService: QuizService) {}
  ngOnInit() {
    this.initialQuiz = this.quizService.quizzes$.value[this.lastQuizIndex];
  }
}

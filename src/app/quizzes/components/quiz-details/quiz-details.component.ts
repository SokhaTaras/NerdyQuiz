import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz/quiz.service';
import { Quiz } from '../../interfaces/quiz.interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'quiz-app-quiz-details',
  templateUrl: './quiz-details.component.html'
})
export class QuizDetailsComponent implements OnInit, OnDestroy {
  initialQuiz: Quiz | undefined;
  id: string | undefined;

  private routeSub: Subscription = new Subscription();

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCurrentQuizId();
    this.initialQuiz = this.getCurrentQuiz();
  }

  getCurrentQuizId(): void {
    this.routeSub = this.route.params.subscribe(
      (params) => (this.id = params['id'])
    );
  }

  getCurrentQuiz(): Quiz | undefined {
    return this.quizService.quizzes$.value.find((q) => q.id === this.id);
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}

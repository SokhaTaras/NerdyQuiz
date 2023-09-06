import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

import { QuizService } from '../../services/quiz/quiz.service';
import { ModalQuizService } from '../../services/modal-quiz/modal-quiz.service';
import { Quiz } from '../../interfaces/quiz';
import { NavigateToService } from '../../../shared/services/navigate-to/navigate-to.service';
import { SubscriptionsService } from '../../../shared/services/subscription/subscriptions.service';

@Component({
  selector: 'quiz-app-quiz-details',
  templateUrl: './quiz-details.component.html',
  providers: [SubscriptionsService]
})
export class QuizDetailsComponent implements OnInit {
  initialQuiz: Quiz;
  id: string | null;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private modalQuiz: ModalQuizService,
    private subscriptionsService: SubscriptionsService,
    private navigateTo: NavigateToService
  ) {}

  ngOnInit(): void {
    this.getCurrentQuizId();
    this.currentQuizSubscribe();
  }

  openEditPopUp(): void {
    const data: any = {
      label: 'BUTTON.EDIT_QUIZ',
      buttonText: 'BUTTON.EDIT',
      quiz: this.initialQuiz
    };
    this.modalQuiz.showInitQuizModal(data);
  }

  goHome(): void {
    this.navigateTo.navigateHome();
  }

  private getCurrentQuizId(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  private currentQuizSubscribe(): void {
    this.subscriptionsService.addSubscription(
      this.getCurrentQuiz().subscribe((currentQuiz) => {
        this.initialQuiz = currentQuiz;
      })
    );
  }

  private getCurrentQuiz(): Observable<Quiz> {
    return this.quizService.quizzes$.pipe(
      map((val) => val.find((q) => q.id === this.id))
    );
  }
}

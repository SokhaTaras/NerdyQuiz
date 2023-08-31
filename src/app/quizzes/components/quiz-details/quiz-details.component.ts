import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';

import { QuizService } from '../../services/quiz/quiz.service';
import { ModalQuizService } from '../../services/modal-quiz/modal-quiz.service';
import { Quiz } from '../../interfaces/quiz';

@Component({
  selector: 'quiz-app-quiz-details',
  templateUrl: './quiz-details.component.html'
})
export class QuizDetailsComponent implements OnInit, OnDestroy {
  initialQuiz: Quiz;
  id: string | null;
  quizSubscription: Subscription;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private modalQuiz: ModalQuizService
  ) {}

  ngOnInit(): void {
    this.getCurrentQuizId();
    this.currentQuizSubscribe();
  }

  openEditPopUp(): void {
    const data: any = {
      label: 'buttons.edit-quiz',
      buttonText: 'buttons.edit',
      quiz: this.initialQuiz
    };
    this.modalQuiz.showInitQuizModal(data);
  }

  private getCurrentQuizId(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  private currentQuizSubscribe(): void {
    this.quizSubscription = this.getCurrentQuiz().subscribe((currentQuiz) => {
      this.initialQuiz = currentQuiz;
    });
  }

  private getCurrentQuiz(): Observable<Quiz> {
    return this.quizService.quizzes$.pipe(
      map((val) => val.find((q) => q.id === this.id))
    );
  }

  ngOnDestroy(): void {
    this.quizSubscription.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { QuizService } from '../../services/quiz/quiz.service';
import { ModalQuizService } from '../../services/modal-quiz/modal-quiz.service';

import { Quiz } from '../../interfaces/quiz.interface';
import { ModalDataInterface } from '../../../shared/interfaces/modalData.interface';

@Component({
  selector: 'quiz-app-quiz-details',
  templateUrl: './quiz-details.component.html'
})
export class QuizDetailsComponent implements OnInit, OnDestroy {
  initialQuiz: Quiz | undefined;
  id: string;

  private routeSub: Subscription = new Subscription();

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private modalQuiz: ModalQuizService
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

  //TODO change hardcode when json with text will be ready
  openEditPopUp(): void {
    const data: ModalDataInterface = {
      title: 'Edit quiz',
      buttonText: 'Edit',
      currentQuizId: this.id as string,
      isSave: false
    };
    this.modalQuiz.showInitQuizModal(data);
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}

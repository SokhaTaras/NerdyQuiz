import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService } from '../../services/quiz/quiz.service';
import { ModalQuizService } from '../../services/modal-quiz/modal-quiz.service';
import { Quiz } from '../../interfaces/quiz.interface';
import { NavigateToService } from '../../../shared/services/navigate-to.service';

@Component({
  selector: 'quiz-app-quiz-details',
  templateUrl: './quiz-details.component.html'
})
export class QuizDetailsComponent implements OnInit {
  initialQuiz: Quiz | undefined;
  id: string | null;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private modalQuiz: ModalQuizService,
    private navigateTo: NavigateToService
  ) {}

  ngOnInit(): void {
    this.getCurrentQuizId();
    this.initialQuiz = this.getCurrentQuiz();
  }

  openEditPopUp(): void {
    const data: any = {
      label: 'buttons.edit-quiz',
      buttonText: 'buttons.edit',
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

  private getCurrentQuiz(): Quiz | undefined {
    return this.quizService.quizzes$.value.find((q) => q.id === this.id);
  }
}

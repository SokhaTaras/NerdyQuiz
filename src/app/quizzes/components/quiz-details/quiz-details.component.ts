import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService } from '../../services/quiz/quiz.service';
import { ModalQuizService } from '../../services/modal-quiz/modal-quiz.service';
import { Quiz } from '../../interfaces/quiz.interface';

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
    private modalQuiz: ModalQuizService
  ) {}

  ngOnInit(): void {
    this.getCurrentQuizId();
    this.initialQuiz = this.getCurrentQuiz();
  }

  getCurrentQuizId(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  getCurrentQuiz(): Quiz | undefined {
    return this.quizService.quizzes$.value.find((q) => q.id === this.id);
  }

  //TODO change hardcode when json with text will be ready
  openEditPopUp(): void {
    const data: any = {
      label: 'Edit quiz',
      buttonText: 'Edit',
      isSave: false,
      quizId: this.id as string
    };
    this.modalQuiz.showInitQuizModal(data);
  }
}

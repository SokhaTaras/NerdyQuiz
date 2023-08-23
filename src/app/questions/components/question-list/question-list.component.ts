import { Component, Input, OnInit } from '@angular/core';

import { QuizService } from '../../../quizzes/services/quiz/quiz.service';
import { Question } from '../../interfaces/question.interface';

@Component({
  selector: 'quiz-app-question-list',
  templateUrl: './question-list.component.html'
})
export class QuestionListComponent implements OnInit {
  @Input() quizId: string | null;

  displayCreateQuestion = false;
  isBoolean: boolean;
  allQuestions: Question[] | undefined;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.initQuestions();
  }

  initQuestions(): void {
    this.allQuestions = this.quizService.getQuizQuestions(this.quizId);
  }

  toggleQuestionCreation() {
    this.displayCreateQuestion = !this.displayCreateQuestion;
  }

  showBooleanCreation(): void {
    this.isBoolean = true;
    this.displayCreateQuestion = true;
  }

  showMultipleCreation(): void {
    this.isBoolean = false;
    this.displayCreateQuestion = true;
  }
}

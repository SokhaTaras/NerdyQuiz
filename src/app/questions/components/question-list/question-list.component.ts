import { Component, Input, OnInit } from '@angular/core';

import { QuizService } from '../../../quizzes/services/quiz/quiz.service';
import { Question } from '../../interfaces/question';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';

@Component({
  selector: 'quiz-app-question-list',
  templateUrl: './question-list.component.html'
})
export class QuestionListComponent implements OnInit {
  @Input() quizId: string | null;

  displayCreateQuestion = false;
  isBoolean: boolean;
  allQuestions: Question[];

  protected readonly BUTTON_TYPE = BUTTON_TYPE;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.initQuestions();
  }

  toggleQuestionCreation() {
    this.displayCreateQuestion = !this.displayCreateQuestion;
  }

  showQuestionCreation(isMultiple: boolean): void {
    this.isBoolean = !isMultiple;
    this.displayCreateQuestion = true;
  }

  private initQuestions(): void {
    this.quizService.quizzes$.subscribe((): Question[] => {
      return (this.allQuestions = this.quizService.getQuizQuestions(
        this.quizId
      ));
    });
  }
}

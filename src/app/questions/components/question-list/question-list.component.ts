import { Component, Input, OnInit } from '@angular/core';

import { QuestionsService } from '../../services/questions/questions.service';

import { Question } from '../../interfaces/question.interface';

@Component({
  selector: 'quiz-app-question-list',
  templateUrl: './question-list.component.html'
})
export class QuestionListComponent implements OnInit {
  @Input() quizId: string;

  displayCreateQuestion: boolean = false;
  allQuestions: Question[] | undefined;

  constructor(private questionService: QuestionsService) {}

  ngOnInit(): void {
    this.initQuestions();
  }

  initQuestions(): void {
    this.allQuestions = this.questionService.getQuizQuestions(this.quizId);
  }

  toggleQuestionCreation() {
    this.displayCreateQuestion = !this.displayCreateQuestion;
  }
}

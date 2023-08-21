import { Component, Input, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions/questions.service';
import { Question } from '../../interfaces/question.interface';

@Component({
  selector: 'quiz-app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  @Input() quizId: string | undefined;
  displayCreateQuestion: boolean = false;
  allQuestions: Question[] | undefined;

  constructor(private questionService: QuestionsService) {}

  ngOnInit() {
    this.allQuestions = this.questionService.getQuizQuestions(this.quizId);
  }

  displayCreateQuestionForm() {
    this.displayCreateQuestion = true;
  }

  hideCreateQuestion() {
    this.displayCreateQuestion = false;
  }
}

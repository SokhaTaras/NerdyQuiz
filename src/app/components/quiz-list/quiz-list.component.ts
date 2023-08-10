import { Component, OnInit } from '@angular/core';
import { QuizStateService } from "../../services/quiz-state/quiz-state.service";
import { IQuiz } from "../../interfaces/quiz.interface";
import { StorageKey } from "../../enums/StorageKey";

@Component({
  selector: 'quiz-app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  constructor(private quizService: QuizStateService) {}

  ngOnInit() {
    this.allQuizzes = this.quizService.getAllQuizzes(this.keyForQuizzes);
  }

   keyForQuizzes: string = StorageKey.quizzes;
   allQuizzes: IQuiz[] | undefined = [];


}
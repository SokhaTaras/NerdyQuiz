import {Component, Input, OnInit} from '@angular/core';
import {IQuiz} from "../../interfaces/quiz.interface";
import {Router} from "@angular/router";


@Component({
  selector: 'quiz-app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent implements OnInit{
  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  @Input() quiz: IQuiz | undefined;

  selectQuiz() {
  }
  goToPage(){
    this.router.navigate(['login']);
  }
}

import {Component, OnInit} from '@angular/core';
import {QuizStateService} from "../../services/quiz-state/quiz-state.service";
import {carQuiz} from "../../db/quiz-db";

@Component({
  selector: 'quiz-app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  constructor(private quizService: QuizStateService) {}

  ngOnInit() {
    this.setQuiz();
    this.getQuiz('test');
  }



  setQuiz(){
    localStorage.setItem('test', JSON.stringify(carQuiz));
  }
  getQuiz(quizName:string): void{
     let item = localStorage.getItem(quizName);
     if (item !== null){
     console.log(JSON.parse(item))
     }
  }
}

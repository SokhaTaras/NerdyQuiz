import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IQuiz} from "../../interfaces/quiz.interface";

@Injectable({
  providedIn: 'root'
})
export class QuizStateService {

  constructor(private http: HttpClient) { }


}

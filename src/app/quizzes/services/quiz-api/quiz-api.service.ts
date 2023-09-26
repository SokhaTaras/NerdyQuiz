import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TRIVIA_API } from '@a-shared/enums/urls';
import { CategoriesResponse } from '@a-quizzes/interfaces/quiz';
import { QuestionResponse } from '@a-questions/interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class QuizApiService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(`${TRIVIA_API}/api_category.php`);
  }

  getQuestions(amount: number, category: string): Observable<QuestionResponse> {
    const params = new HttpParams()
      .set('amount', amount)
      .set('category', category);

    return this.http.get<QuestionResponse>(`${TRIVIA_API}/api.php`, {
      params
    });
  }
}

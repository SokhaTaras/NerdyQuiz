import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TRIVIA_API } from '@a-shared/enums/urls';
import { CategoriesResponse } from '@a-quizzes/interfaces/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizApiService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(`${TRIVIA_API}/api_category.php`);
  }
}

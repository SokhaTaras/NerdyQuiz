import { Component, OnInit } from '@angular/core';

import { QuizStateService } from '@a-quizzes/services/quiz-state/quiz-state.service';
import { QuizApiService } from '@a-quizzes/services/quiz-api/quiz-api.service';
import { CategoriesResponse } from '@a-quizzes/interfaces/quiz';
import { mapArrayToDropDownItems } from '@a-shared/utils/drop-down-mapper';
import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SubscriptionsService]
})
export class AppComponent implements OnInit {
  title = 'nerdyQuiz-app';

  constructor(
    private quizState: QuizStateService,
    private quizApi: QuizApiService,
    private quizService: QuizService,
    private subscriptionsService: SubscriptionsService
  ) {}

  ngOnInit(): void {
    this.setQuizzes();
    this.getCategories();
  }

  private setQuizzes(): void {
    this.quizState.getQuizzesList();
  }

  private getCategories(): void {
    this.subscriptionsService.addSubscription(
      this.quizApi.getCategories().subscribe((categoriesRes) => {
        this.mapToDropDownItem(categoriesRes);
      })
    );
  }

  private mapToDropDownItem(fetchedCategories: CategoriesResponse): void {
    const categories = mapArrayToDropDownItems(
      fetchedCategories.trivia_categories,
      'id',
      'name'
    );

    this.quizService.categories = categories;
  }
}

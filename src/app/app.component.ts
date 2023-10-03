import { Component, OnInit } from '@angular/core';

import { AppState } from '@a-store/state/app.state';
import { GetQuizzes } from '@a-store/actions/quizz.actions';
import { StoreService } from '@a-store/services/store.service';
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
    private store: StoreService<AppState>,
    private quizApi: QuizApiService,
    private quizService: QuizService,
    private subscriptionsService: SubscriptionsService
  ) {}

  ngOnInit(): void {
    this.getQuizzes();
    this.getCategories();
  }

  private getQuizzes(): void {
    this.store.dispatch(GetQuizzes());
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

    this.quizService.categories$.next(categories);
  }
}

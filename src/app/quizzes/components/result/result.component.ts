import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StatisticsService } from '@a-shared/services/statistics/statistics.service';
import { Result } from '@a-shared/enums/result';
import { BUTTON_TYPE } from '@a-shared/enums/shared-components';
import { QuestionResult } from '@a-questions/interfaces/question';
import { NavigateToService } from '@a-shared/services/navigate-to/navigate-to.service';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { Quiz } from '@a-quizzes/interfaces/quiz';

@Component({
  selector: 'quiz-app-result',
  templateUrl: './result.component.html',
  providers: [SubscriptionsService]
})
export class ResultComponent implements OnInit {
  rating: number;
  spentTime: number;
  correctAnswersCount: number;
  resultText: string;

  currentQuiz: Quiz;
  questionResult: QuestionResult[];

  readonly BUTTON_TYPE = BUTTON_TYPE;

  constructor(
    private quizService: QuizService,
    private statisticsService: StatisticsService,
    private navigateTo: NavigateToService,
    private route: ActivatedRoute,
    private subscriptionsService: SubscriptionsService
  ) {}

  ngOnInit(): void {
    this.currentQuizSubscribe();
    this.questionResult = this.getQuestionResult();
    this.rating = this.getRating();
    this.setSpentTime();
    this.setResultText();
    this.correctAnswersCount = this.calculateCorrectAnswersCount();
  }

  playAgain(): void {
    this.navigateTo.navigatePlay(this.currentQuiz);
  }

  goHome(): void {
    this.navigateTo.navigateHome();
  }

  private getRating(): number {
    if (this.quizService.questionsResults) {
      return this.statisticsService.getRating();
    }
    return 0;
  }

  private getQuestionResult(): QuestionResult[] {
    return this.statisticsService.getQuestionResults();
  }

  private setSpentTime(): void {
    const lastQuestion = this?.questionResult?.length - 1;

    if (this.quizService.questionsResults) {
      this.spentTime = this.questionResult[lastQuestion]?.timeSpent;
    }
  }

  private calculateCorrectAnswersCount(): number {
    const correctnessArray = this.statisticsService.extractCorrectnessArray(
      this.questionResult
    );
    return this.statisticsService.countCorrectAnswers(correctnessArray);
  }

  private setResultText(): void {
    if (this.rating === Result.EXCELLENT) {
      this.resultText = 'RESULT_QUOTES.EXCELLENT';
    } else if (this.rating >= Result.TRY_HARDER) {
      this.resultText = 'RESULT_QUOTES.PASSED_QUIZ';
    } else if (
      this.rating < Result.TRY_HARDER &&
      this.rating > Result.LEARN_MORE
    ) {
      this.resultText = 'RESULT_QUOTES.TRY_HARDER';
    } else {
      this.resultText = 'RESULT_QUOTES.LEARN_MORE';
    }
  }

  private getCurrentQuizId(): string {
    return this.route.snapshot.paramMap.get('id');
  }

  private currentQuizSubscribe(): void {
    const id = this.getCurrentQuizId();
    this.subscriptionsService.addSubscription(
      this.quizService.getQuizById(id).subscribe((currentQuiz) => {
        this.currentQuiz = currentQuiz;
      })
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService } from '../../services/quiz/quiz.service';
import { StatisticsService } from '../../../shared/services/statistics/statistics.service';
import { Result } from '../../../shared/enums/result';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';
import { QuestionResult } from '../../../questions/interfaces/question';
import { NavigateToService } from '../../../shared/services/navigate-to/navigate-to.service';
import { Quiz } from '../../interfaces/quiz';
import { SubscriptionsService } from '../../../shared/services/subscription/subscriptions.service';

@Component({
  selector: 'quiz-app-result',
  templateUrl: './result.component.html',
  providers: [SubscriptionsService]
})
export class ResultComponent implements OnInit {
  readonly BUTTON_TYPE = BUTTON_TYPE;

  rating: number;
  spentTime: number;
  correctAnswersCount: number;
  resultText: string;

  currentQuiz: Quiz;
  questionResult: QuestionResult[];

  constructor(
    private quizService: QuizService,
    private statisticsService: StatisticsService,
    private navigateTo: NavigateToService,
    private route: ActivatedRoute,
    private subscriptionsService: SubscriptionsService
  ) {}

  ngOnInit(): void {
    this.currentQuizSubscribe();
    this.setQuestionResult();
    this.setCorrectAnswersCount();
    this.setRating();
    this.setSpentTime();
    this.setResultText();
  }

  playAgain(): void {
    this.navigateTo.navigatePlay(this.currentQuiz?.id);
  }

  goHome(): void {
    this.navigateTo.navigateHome();
  }

  private currentQuizSubscribe(): void {
    const id = this.getCurrentQuizId();
    this.subscriptionsService.addSubscription(
      this.quizService.getQuizById(id).subscribe((currentQuiz) => {
        this.currentQuiz = currentQuiz;
      })
    );
  }

  private getCurrentQuizId(): string {
    return this.route.snapshot.paramMap.get('id');
  }

  private setQuestionResult(): void {
    this.questionResult = this.statisticsService.getQuestionResults();
  }

  private setCorrectAnswersCount(): void {
    if (this.questionResult) {
      const correctnessArray = this.statisticsService.extractCorrectnessArray(
        this.questionResult
      );
      this.correctAnswersCount = correctnessArray?.length;
    }
  }

  private setRating(): void {
    if (this.questionResult) {
      const totalQuestions = this.questionResult?.length;
      const percentage = (this.correctAnswersCount / totalQuestions) * 100;
      const rating = Math.round(percentage);
      this.rating = rating;
    }
  }

  private setSpentTime(): void {
    if (this.questionResult) {
      const lastQuestion = this?.questionResult?.length - 1;
      this.spentTime = this.questionResult[lastQuestion]?.timeSpent;
    }
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
}

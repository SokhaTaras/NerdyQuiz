import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StatisticsService } from '@a-shared/services/statistics/statistics.service';
import { BUTTON_TYPE, LABELS } from '@a-shared/enums/shared-components';
import { QuestionResult, QuizResult } from '@a-questions/interfaces/question';
import { NavigateToService } from '@a-shared/services/navigate-to/navigate-to.service';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { Quiz } from '@a-quizzes/interfaces/quiz';
import { getResultSetup } from '@a-shared/utils/result';
import { ResultSetup } from '@a-shared/types/result-setup';
import { SVG_COLOR, SVG_TYPE } from '@a-shared/enums/svg';

@Component({
  selector: 'quiz-app-result',
  templateUrl: './result.component.html',
  providers: [SubscriptionsService]
})
export class ResultComponent implements OnInit {
  readonly BUTTON_TYPE = BUTTON_TYPE;
  readonly LABELS = LABELS;
  readonly SVG_TYPE = SVG_TYPE;
  readonly SVG_COLOR = SVG_COLOR;

  resultSetup: ResultSetup;
  currentQuiz: Quiz;
  quizResult: QuizResult;

  rating: number;
  correctAnswersCount: number;

  get quizQuestionResults(): QuestionResult[] {
    return this.quizResult?.questionResults;
  }

  get quizTime(): number {
    return this.quizResult?.quizTime;
  }

  get resultText(): string {
    return this.resultSetup?.text;
  }

  get resultLabelType(): LABELS {
    return this.resultSetup?.labelType;
  }

  constructor(
    private quizService: QuizService,
    private statisticsService: StatisticsService,
    private navigateTo: NavigateToService,
    private route: ActivatedRoute,
    private subscriptionsService: SubscriptionsService
  ) {}

  ngOnInit(): void {
    this.currentQuizSubscribe();
    this.setQuizResults();
    this.setCorrectAnswersCount();
    this.setRating();
    this.setResultSetup();
  }

  playAgain(): void {
    this.navigateTo.navigatePlay(this.currentQuiz?.id);
  }

  goHome(): void {
    this.navigateTo.navigateHome();
  }

  private currentQuizSubscribe(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.subscriptionsService.addSubscription(
      this.quizService.getQuizById(id).subscribe((currentQuiz) => {
        this.currentQuiz = currentQuiz;
      })
    );
  }

  private setQuizResults(): void {
    this.quizResult = this.statisticsService.getQuizResults();
  }

  private setCorrectAnswersCount(): void {
    if (this.quizResult) {
      const correctnessArray = this.statisticsService.extractCorrectnessArray(
        this.quizResult
      );

      this.correctAnswersCount = correctnessArray?.length;
    }
  }

  private setRating(): void {
    if (this.quizResult) {
      const totalQuestions = this.quizQuestionResults.length;
      const percentage = (this.correctAnswersCount / totalQuestions) * 100;
      const rating = Math.round(percentage);
      this.rating = rating;
    }
  }

  private setResultSetup(): void {
    console.log(this.resultSetup);
    this.resultSetup = getResultSetup(this.rating);
    console.log(this.resultSetup);
  }
}

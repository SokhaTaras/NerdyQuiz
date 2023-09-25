import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService } from '../../services/quiz/quiz.service';
import { StatisticsService } from '../../../shared/services/statistics/statistics.service';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';
import {
  QuestionResult,
  QuizResult
} from '../../../questions/interfaces/question';
import { NavigateToService } from '../../../shared/services/navigate-to/navigate-to.service';
import { Quiz } from '../../interfaces/quiz';
import { SubscriptionsService } from '../../../shared/services/subscription/subscriptions.service';
import { setResultText } from '../../../shared/utils/result';

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
  quizResult: QuizResult;

  get quizQuestionResults(): QuestionResult[] {
    return this?.quizResult?.questionResults;
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
    this.setSpentTime();
    this.getResultText();
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

  private setSpentTime(): void {
    if (this.quizResult) {
      const lastQuestion = this.quizQuestionResults.length - 1;
      this.spentTime = this.quizQuestionResults[lastQuestion]?.questionTime;
    }
  }

  private getResultText(): void {
    this.resultText = setResultText(this.rating);
  }
}

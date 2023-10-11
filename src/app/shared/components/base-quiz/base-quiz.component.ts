import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { Quiz } from '@a-quizzes/interfaces/quiz';
import { NavigateToService } from '@a-shared/services/navigate-to/navigate-to.service';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { Question, RadioButtonItem } from '@a-questions/interfaces/question';
import { getDifficultyLabel } from '@a-shared/utils/getDifficultyLabel';
import { LABELS } from '@a-shared/enums/shared-components';

@Component({
  selector: 'quiz-app-quiz-details',
  template: ''
})
export class BaseQuizComponent implements OnInit {
  currentQuiz: Quiz;

  id: string | null;

  get quizTitle(): string {
    return this.currentQuiz?.title;
  }

  get quizCategory(): string {
    return this.currentQuiz?.category.text;
  }

  get quizDifficulty(): RadioButtonItem {
    return this.currentQuiz?.difficulty;
  }

  get quizQuestions(): Question[] {
    return this.currentQuiz?.questions;
  }

  get quizLabelType(): LABELS {
    const labelType = getDifficultyLabel(this.quizDifficulty.value);
    return labelType;
  }

  constructor(
    protected quizService: QuizService,
    private route: ActivatedRoute,
    protected navigateTo: NavigateToService,
    protected subscriptionsService: SubscriptionsService
  ) {}

  ngOnInit(): void {
    this.getCurrentQuizId();
    this.currentQuizSubscribe();
  }

  goHome(): void {
    this.navigateTo.navigateHome();
  }

  private getCurrentQuizId(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  private currentQuizSubscribe(): void {
    this.subscriptionsService.addSubscription(
      this.quizService.getQuizById(this.id).subscribe((currentQuiz) => {
        this.currentQuiz = currentQuiz;
      })
    );
  }
}

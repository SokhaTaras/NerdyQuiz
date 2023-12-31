import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, timer } from 'rxjs';

import { Answer, Question, QuizResult } from '@a-questions/interfaces/question';
import {
  BUTTON_TYPE,
  DIVIDER,
  LABELS
} from '@a-shared/enums/shared-components';
import { ModalQuizService } from '@a-quizzes/services/modal-quiz/modal-quiz.service';
import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { NavigateToService } from '@a-shared/services/navigate-to/navigate-to.service';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { Quiz } from '@a-quizzes/interfaces/quiz';
import { QuizHelperService } from '@a-shared/services/quiz-helper/quiz-helper.service';
import { ConfirmationModalData } from '@a-quizzes/interfaces/modal-data';
import { SVG_COLOR, SVG_TYPE } from '@a-shared/enums/svg';

@Component({
  selector: 'quiz-app-play',
  templateUrl: './play.component.html',
  providers: [SubscriptionsService]
})
export class PlayComponent implements OnInit {
  @Input() quiz: Quiz;
  @Output() whenCancel: EventEmitter<void> = new EventEmitter();

  readonly BUTTON_TYPE = BUTTON_TYPE;
  readonly LABELS = LABELS;
  readonly DIVIDER = DIVIDER;
  readonly SVG_COLOR = SVG_COLOR;
  readonly SVG_TYPE = SVG_TYPE;

  timer$: Observable<number>;

  currentQuestion: Question;
  selectedAnswer: Answer | null = null;

  currentPosition = 0;
  quizTime = 0;
  timePerQuestion = 0;

  get confirmHandler(): void {
    return this.currentPosition !== this.quiz.questions.length - 1
      ? this.nextQuestion(this.currentQuestion)
      : this.finishQuiz(this.currentQuestion);
  }

  get cancelText(): string {
    return this.currentPosition === 0 ? 'BUTTON.CANCEL' : 'BUTTON.PREVIOUS';
  }

  get isDisabled(): boolean {
    return this.selectedAnswer === null || this.selectedAnswer === undefined;
  }

  get confirmText(): string {
    const isNotLastQuestion =
      this.currentPosition !== this.quiz.questions.length - 1;
    return isNotLastQuestion ? 'BUTTON.NEXT' : 'BUTTON.FINISH';
  }

  get questions(): Question[] {
    return this.quiz.questions;
  }

  get title(): string {
    return this.currentQuestion?.title;
  }

  get showSecondaryButton(): boolean {
    return this.currentPosition !== 0;
  }

  constructor(
    private modalQuizService: ModalQuizService,
    private quizService: QuizService,
    private quizHelperService: QuizHelperService,
    private navigateTo: NavigateToService,
    private subscriptions: SubscriptionsService
  ) {}

  ngOnInit(): void {
    this.quizHelperService.questionsResults.next([]);
    this.initQuestions();
    this.startTimer();
  }

  selectAnswer(answer: Answer): void {
    this.selectedAnswer = answer;
  }

  cancelQuizConfirm(): void {
    const data: ConfirmationModalData = {
      text: 'CONFIRM_MODAL_TEXT.TEXT.CANCEL_QUIZ',
      label: 'CONFIRM_MODAL_TEXT.LABEL.QUIZ_CANCELLATION'
    };

    this.subscriptions.addSubscription(
      this.modalQuizService
        .confirmDeletionModal(data)
        .onClose.subscribe((isConfirm) => {
          if (isConfirm) {
            this.whenCancel.emit();
          }
        })
    );
  }

  nextQuestion(question: Question): void {
    const nextQuestionAnswer =
      this.quizHelperService.questionsResults.value[this.currentPosition + 1]
        ?.answer;

    this.currentPosition += 1;
    this.currentQuestion = this.quiz.questions[this.currentPosition];
    this.addQuestionResult(question);

    this.selectAnswer(nextQuestionAnswer);
  }

  previousQuestion(): void {
    const previouslySelectedAnswer =
      this.quizHelperService.questionsResults.value[this.currentPosition - 1]
        ?.answer;
    this.currentPosition -= 1;
    this.currentQuestion = this.quiz.questions[this.currentPosition];
    this.selectAnswer(previouslySelectedAnswer);
  }

  addQuestionResult(question: Question): void {
    const timePerTest = Math.floor((Date.now() - this.timePerQuestion) / 1000);

    const maxPosition = this.questions?.length;
    this.subscriptions.addSubscription(
      this.quizHelperService
        .addQuestionResult(question, this.selectedAnswer, timePerTest)
        .subscribe()
    );

    if (this.currentPosition < maxPosition) {
      this.timePerQuestion = Date.now();
      this.currentQuestion = this.questions[this.currentPosition];
      this.selectedAnswer = null;
    }
  }

  finishQuiz(lastQuestion: Question): void {
    const results: QuizResult = {
      questionResults: this.quizHelperService.questionsResults.value,
      quizTime: this.quizTime
    };
    this.addQuestionResult(lastQuestion);
    this.subscriptions.addSubscription(
      this.quizService.setQuizResult(results).subscribe()
    );
    this.navigateTo.navigateResult(this.quiz?.id);
  }

  private initQuestions(): void {
    this.currentQuestion = this.questions[this.currentPosition];
    this.quizService.questionsResults.next([]);
  }

  private startTimer(): void {
    this.timePerQuestion = Date.now();
    this.timer$ = timer(0, 1000);
    this.subscriptions.addSubscription(
      this.timer$.subscribe((time) => (this.quizTime = time))
    );
  }
}

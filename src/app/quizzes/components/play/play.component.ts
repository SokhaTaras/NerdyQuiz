import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, timer } from 'rxjs';

import { Answer, Question } from '@a-questions/interfaces/question';
import { BUTTON_TYPE } from '@a-shared/enums/buttonType';
import { ModalQuizService } from '@a-quizzes/services/modal-quiz/modal-quiz.service';
import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { NavigateToService } from '@a-shared/services/navigate-to/navigate-to.service';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { Quiz } from '@a-quizzes/interfaces/quiz';

@Component({
  selector: 'quiz-app-play',
  templateUrl: './play.component.html',
  providers: [SubscriptionsService]
})
export class PlayComponent implements OnInit {
  @Input() quiz: Quiz;
  @Output() whenCancel: EventEmitter<void> = new EventEmitter();

  timer$: Observable<number>;

  currentQuestion: Question;
  selectedAnswer: Answer | null = null;

  currentPosition = 0;
  secondsCounter = 0;

  readonly BUTTON_TYPE = BUTTON_TYPE;

  constructor(
    private modalQuizService: ModalQuizService,
    private quizService: QuizService,
    private navigateTo: NavigateToService,
    private subscriptions: SubscriptionsService
  ) {}

  ngOnInit(): void {
    this.initQuestions();
    this.startTimer();
  }

  cancelQuizConfirm(): void {
    const data: any = {
      text: 'CONFIRM_MODAL_TEXT.CANCEL_QUIZ',
      buttonText: 'BUTTON.CONFIRM'
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
    this.currentPosition += 1;
    this.addQuestionResult(question);
  }

  previousQuestion(): void {
    this.currentPosition -= 1;
    this.subscriptions.addSubscription(
      this.quizService
        .removeLastQuestionResult(this.currentPosition)
        .subscribe()
    );
    this.currentQuestion = this.quiz.questions[this.currentPosition];
  }

  selectAnswer(answer: Answer): void {
    this.selectedAnswer = answer;
  }

  addQuestionResult(question: Question): void {
    const maxPosition = this.quiz.questions?.length;
    this.subscriptions.addSubscription(
      this.quizService
        .addQuestionResult(question, this.selectedAnswer, this.secondsCounter)
        .subscribe()
    );

    if (this.currentPosition < maxPosition) {
      this.currentQuestion = this.quiz.questions[this.currentPosition];
      this.selectedAnswer = null;
    }
  }

  finishQuiz(lastQuestion: Question): void {
    this.addQuestionResult(lastQuestion);
    this.subscriptions.addSubscription(
      this.quizService.setQuizResult().subscribe()
    );
    this.navigateTo.navigateResult(this.quiz);
  }

  private initQuestions(): void {
    this.currentQuestion = this.quiz.questions[this.currentPosition];
    this.quizService.questionsResults.next([]);
  }

  private startTimer(): void {
    this.timer$ = timer(0, 1000);
    this.subscriptions.addSubscription(
      this.timer$.subscribe((time) => (this.secondsCounter = time))
    );
  }
}

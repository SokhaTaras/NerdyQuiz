import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, timer } from 'rxjs';

import { Answer, Question } from '../../../questions/interfaces/question';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';
import { ModalQuizService } from '../../services/modal-quiz/modal-quiz.service';
import { QuizService } from '../../services/quiz/quiz.service';
import { NavigateToService } from '../../../shared/services/navigate-to/navigate-to.service';
import { SubscriptionsService } from '../../../shared/services/subscription/subscriptions.service';

@Component({
  selector: 'quiz-app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
  providers: [SubscriptionsService]
})
export class PlayComponent implements OnInit {
  @Input() questions: Question[];
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
    this.currentQuestion = this.questions[this.currentPosition];
    this.quizService.questionsResults = [];
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
    this.addQuestionResult(question);
    this.currentPosition += 1;
  }

  previousQuestion(): void {
    this.subscriptions.addSubscription(
      this.quizService
        .removeLastQuestionResult(this.currentPosition)
        .subscribe()
    );
    this.currentPosition -= 1;
  }

  selectAnswer(answer: Answer): void {
    this.selectedAnswer = answer;
  }

  addQuestionResult(question: Question): void {
    const maxPosition = this.questions?.length;
    this.subscriptions.addSubscription(
      this.quizService
        .addQuestionResult(question, this.selectedAnswer, this.secondsCounter)
        .subscribe()
    );

    if (this.currentPosition < maxPosition) {
      this.currentQuestion = this.questions[this.currentPosition];
      this.selectedAnswer = null;
    }
  }

  //todo redirect to result page on finish, when that page will be ready
  finishQuiz(lastQuestion: Question): void {
    this.addQuestionResult(lastQuestion);
    this.subscriptions.addSubscription(
      this.quizService.setQuizResult().subscribe()
    );
    this.navigateTo.navigateHome();
  }

  private startTimer(): void {
    this.timer$ = timer(0, 1000);
    this.subscriptions.addSubscription(
      this.timer$.subscribe((time) => (this.secondsCounter = time))
    );
  }
}

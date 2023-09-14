import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Answer, Question } from '../../../questions/interfaces/question';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';
import { ModalQuizService } from '../../services/modal-quiz/modal-quiz.service';
import { QuizService } from '../../services/quiz/quiz.service';
import { NavigateToService } from '../../../shared/services/navigate-to/navigate-to.service';

@Component({
  selector: 'quiz-app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  @Input() questions: Question[];
  @Output() whenCancel: EventEmitter<void> = new EventEmitter();

  currentQuestion: Question;
  selectedAnswer: Answer | null = null;

  currentPosition = 0;
  timePerAnswer: number;

  readonly BUTTON_TYPE = BUTTON_TYPE;

  constructor(
    private modalQuizService: ModalQuizService,
    private quizService: QuizService,
    private navigateTo: NavigateToService
  ) {}

  ngOnInit(): void {
    this.currentQuestion = this.questions[this.currentPosition];
    this.quizService.questionsResults$.next([]);
    this.timePerAnswer = Date.now();
  }

  cancelQuizConfirm(): void {
    const data: any = {
      text: 'CONFIRM_MODAL_TEXT.CANCEL_QUIZ',
      buttonText: 'BUTTON.CONFIRM'
    };

    this.modalQuizService
      .confirmDeletionModal(data)
      .onClose.subscribe((isConfirm) => {
        if (isConfirm) {
          this.whenCancel.emit();
        }
      });
  }

  nextQuestion(): void {
    this.currentPosition += 1;
  }

  previousQuestion(): void {
    this.currentPosition -= 1;
    this.quizService.removeLastQuestionResult(this.currentPosition).subscribe();
  }

  selectAnswer(answer: Answer): void {
    this.selectedAnswer = answer;
  }

  //todo redirect to result page on finish, when that page will be ready
  addQuestionResult(question: Question): void {
    const maxPosition = this.questions?.length;
    const timePerAnswer = Date.now() - this.timePerAnswer;
    this.quizService
      .addQuestionResult(question, this.selectedAnswer, timePerAnswer)
      .subscribe();

    if (this.currentPosition < maxPosition) {
      this.currentQuestion = this.questions[this.currentPosition];
      this.selectedAnswer = null;
      this.nextQuestion();
    }
  }

  //todo change, when result page will be ready
  finishQuiz(lastQuestion: Question): void {
    this.addQuestionResult(lastQuestion);
    this.quizService.setQuizResult().subscribe();
    this.navigateTo.navigateHome();
  }
}

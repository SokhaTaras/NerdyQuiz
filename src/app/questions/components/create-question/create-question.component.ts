import { Component, EventEmitter, Input, Output } from '@angular/core';

import { PlaceHolder } from '@a-shared/enums/placeHolder';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AnswersFormType, QuestionForm } from '@a-shared/types/forms';
import { QuestionFormHelperService } from '@a-questions/services/questionFormHelper/question-form-helper.service';
import { Question } from '@a-questions/interfaces/question';
import { QUESTION_TYPE } from '@a-shared/enums/question-info';
import { BUTTON_TYPE } from '@a-shared/enums/shared-components';
import {
  maxQuestionsAmount,
  minQuestionsAmount
} from '@a-questions/constants/questions-info';
import { ModalRefFacadeService } from '@a-shared/services/modal-ref-facade/modal-ref-facade.service';
import { SVG_COLOR, SVG_TYPE } from '@a-shared/enums/svg';
import { QuizService } from '@a-quizzes/services/quiz/quiz.service';

@Component({
  selector: 'quiz-app-create-question',
  templateUrl: './create-question.component.html',
  providers: [
    SubscriptionsService,
    ModalRefFacadeService,
    QuestionFormHelperService
  ]
})
export class CreateQuestionComponent {
  @Input() label: string;
  @Input() quizId: string;
  @Input() isFetch: boolean;
  @Output() whenPreviousClicked = new EventEmitter<void>();

  readonly PlaceHolder = PlaceHolder;
  readonly minQuestionsAmount = minQuestionsAmount;
  readonly maxQuestionsAmount = maxQuestionsAmount;
  readonly BUTTON_TYPE = BUTTON_TYPE;
  readonly SVG_TYPE = SVG_TYPE;
  readonly SVG_COLOR = SVG_COLOR;

  get form(): FormGroup<QuestionForm> {
    return this.questionFormHelper?.currentForm;
  }

  get answerCount(): number {
    return this.questionFormHelper.answersCount;
  }

  get answersControl(): AnswersFormType[] {
    return this.questionFormHelper.answersControl;
  }

  get title(): FormControl<string> {
    return this.questionFormHelper.title;
  }

  constructor(
    private questionFormHelper: QuestionFormHelperService,
    private modalRefFacadeService: ModalRefFacadeService,
    private subscriptionsService: SubscriptionsService,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  close(data?: Question): void {
    this.modalRefFacadeService.close(data);
  }

  goPrevious(): void {
    this.whenPreviousClicked.emit();
  }

  saveQuestion(): void {
    const question: Question = this.mapQuestionToObject();
    this.subscriptionsService.addSubscription(
      this.quizService.addQuestion(this.quizId, question).subscribe()
    );

    this.close(question);
  }

  addAnswer(): void {
    if (maxQuestionsAmount > this.questionFormHelper.answersCount) {
      this.questionFormHelper.addAnswer();
    }
  }

  deleteAnswer(answerIndex: number): void {
    this.questionFormHelper.answersFormArray.controls.splice(answerIndex, 1);
  }

  onRadioChecked(answer: AnswersFormType): void {
    answer.controls.isCorrect.setValue(true);
  }

  private initForm(): void {
    const question: Question = {
      type: QUESTION_TYPE.MULTIPLE
    };

    this.questionFormHelper.initForm(question);
  }

  private mapQuestionToObject(): Question {
    const formData = this.form.value as Question;

    const question: Question = {
      title: formData.title,
      type: formData.type,
      answers: formData.answers
    };

    return question;
  }
}

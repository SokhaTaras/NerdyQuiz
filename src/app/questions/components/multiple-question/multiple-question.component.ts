import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { PlaceHolder } from '@a-shared/enums/placeHolder';
import {
  maxQuestionsAmount,
  minQuestionsAmount
} from '@a-questions/constants/questions-info';
import { BUTTON_TYPE } from '@a-shared/enums/buttonType';
import { AnswerDifficultyList } from '../../constants/dropdonws';
import { QUESTION_TYPE } from '@a-shared/enums/question-info';
import { Question } from '@a-questions/interfaces/question';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { AnswersFormType, QuestionForm } from '@a-shared/types/forms';
import { QuestionFormHelperService } from '@a-questions/services/questionFormHelper/question-form-helper.service';

@Component({
  selector: 'quiz-app-multiple-question',
  templateUrl: './multiple-question.component.html',
  providers: [QuestionFormHelperService, SubscriptionsService]
})
export class MultipleQuestionComponent implements OnInit {
  @Output() saveMultipleFormEvent: EventEmitter<FormGroup<QuestionForm>> =
    new EventEmitter<FormGroup<QuestionForm>>();

  readonly PlaceHolder = PlaceHolder;
  readonly minQuestionsAmount = minQuestionsAmount;
  readonly maxQuestionsAmount = maxQuestionsAmount;
  readonly AnswerDifficultyList = AnswerDifficultyList;
  readonly BUTTON_TYPE = BUTTON_TYPE;

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

  constructor(private questionFormHelper: QuestionFormHelperService) {}

  ngOnInit(): void {
    this.initForm();
  }

  addAnswer(): void {
    if (maxQuestionsAmount > this.questionFormHelper.answersCount) {
      this.questionFormHelper.addAnswer();
    }
  }

  deleteAnswer(answerIndex: number): void {
    this.questionFormHelper.answersFormArray.controls.splice(answerIndex, 1);
  }

  private initForm(): void {
    const question: Question = {
      type: QUESTION_TYPE.MULTIPLE
    };

    this.questionFormHelper.initForm(question);
    this.saveMultipleFormEvent.emit(this.form);
  }
}

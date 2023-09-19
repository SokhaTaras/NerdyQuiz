import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { PlaceHolder } from '@a-shared/enums/placeHolder';
import {
  AnswerBooleanList,
  AnswerDifficultyList
} from '@a-questions/constants/dropdonws';
import { QuestionForm } from '@a-shared/types/forms';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { QuestionFormHelperService } from '@a-questions/services/questionFormHelper/question-form-helper.service';
import { QUESTION_TYPE } from '@a-shared/enums/question-info';
import { Question } from '@a-questions/interfaces/question';
import { AnswersFormType } from '@a-shared/types/forms';

@Component({
  selector: 'quiz-app-boolean-question',
  templateUrl: './boolean-question.component.html',
  providers: [QuestionFormHelperService, SubscriptionsService]
})
export class BooleanQuestionComponent implements OnInit {
  @Output() saveBooleanFormEvent: EventEmitter<FormGroup<QuestionForm>> =
    new EventEmitter<FormGroup<QuestionForm>>();

  readonly PlaceHolder = PlaceHolder;
  readonly AnswerDifficultyList = AnswerDifficultyList;
  readonly AnswerBooleanList = AnswerBooleanList;

  get form(): FormGroup<QuestionForm> {
    return this.questionFormHelper?.currentForm;
  }

  get answersControl(): AnswersFormType[] {
    return this.questionFormHelper.answersControl;
  }

  get title(): FormControl<string> {
    return this.questionFormHelper.title;
  }

  get difficulty(): FormControl<string> {
    return this.questionFormHelper.difficulty;
  }

  constructor(private questionFormHelper: QuestionFormHelperService) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    const question: Question = {
      type: QUESTION_TYPE.BOOLEAN
    };

    this.questionFormHelper.initForm(question);
    this.saveBooleanFormEvent.emit(this.form);
  }
}

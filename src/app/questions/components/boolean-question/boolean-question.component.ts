import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { PlaceHolder } from '@a-shared/enums/placeHolder';
import { AnswerBooleanList } from '@a-questions/constants/dropdowns';
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
  readonly AnswerBooleanList = AnswerBooleanList;

  radioSelectedIndex = 0;

  get form(): FormGroup<QuestionForm> {
    return this.questionFormHelper?.currentForm;
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

  onRadioChecked(selectedIndex: number): void {
    this.radioSelectedIndex = selectedIndex;
    this.answersControl[selectedIndex].controls.isCorrect.setValue(true);
  }

  private initForm(): void {
    const question: Question = {
      type: QUESTION_TYPE.BOOLEAN
    };

    this.questionFormHelper.initForm(question);
    this.saveBooleanFormEvent.emit(this.form);
  }
}

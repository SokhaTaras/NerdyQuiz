import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { PlaceHolder } from '../../../shared/enums/placeHolder';
import {
  AnswerBooleanList,
  AnswerDifficultyList
} from '../../constants/dropdonws';
import { QuestionForm } from '../../../shared/interfaces/forms';
import { QuestionFormHelperService } from '../../../shared/services/questionFormHelper/question-form-helper.service';
import {
  ANSWER_PROPERTIES,
  QUESTION_TYPE
} from '../../../shared/enums/question-info';
import { Question } from '../../interfaces/question';
import { AnswersFormType } from '../../../shared/types/formsType';

@Component({
  selector: 'quiz-app-boolean-question',
  templateUrl: './boolean-question.component.html',
  providers: [QuestionFormHelperService]
})
export class BooleanQuestionComponent implements OnInit {
  @Output() saveBooleanFormEvent: EventEmitter<FormGroup<QuestionForm>> =
    new EventEmitter<FormGroup<QuestionForm>>();

  readonly PlaceHolder = PlaceHolder;
  readonly AnswerDifficultyList = AnswerDifficultyList;
  readonly AnswerBooleanList = AnswerBooleanList;
  readonly ANSWER_PROPERTIES = ANSWER_PROPERTIES;

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

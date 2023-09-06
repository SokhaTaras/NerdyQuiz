import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PlaceHolder } from '../../../shared/enums/placeHolder';
import { DifficultyList } from '../../constants/dropdonws';
import { QuestionForm } from '../../../shared/interfaces/forms';
import { QuestionFormHelperService } from '../../../shared/services/questionFormHelper/question-form-helper.service';
import { QUESTION_TYPE } from '../../../shared/enums/question-info';
import {
  CommonProperties,
  Question
} from '../../interfaces/question.interface';

@Component({
  selector: 'quiz-app-boolean-question',
  templateUrl: './boolean-question.component.html',
  providers: [QuestionFormHelperService]
})
export class BooleanQuestionComponent implements OnInit {
  @Output() saveBooleanFormEvent: EventEmitter<FormGroup<QuestionForm>> =
    new EventEmitter<FormGroup<QuestionForm>>();

  public booleanQuestionForm: FormGroup<QuestionForm>;
  public formData: CommonProperties;

  protected readonly PlaceHolder = PlaceHolder;
  protected readonly difficultyList = DifficultyList;

  constructor(private questionFormHelper: QuestionFormHelperService) {}

  ngOnInit(): void {
    this.initForm();
    this.initControls();
    this.questionFormHelper.initRadioButtons();
  }

  private initForm(): void {
    const question: Question = {
      type: QUESTION_TYPE.BOOLEAN
    };
    this.questionFormHelper.initForm(question);
    this.booleanQuestionForm = this.questionFormHelper.currentForm;
    this.saveBooleanFormEvent.emit(this.booleanQuestionForm);
  }

  private initControls(): void {
    this.formData = this.questionFormHelper.getControls();
  }
}

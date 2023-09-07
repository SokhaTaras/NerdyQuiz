import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { PlaceHolder } from '../../../shared/enums/placeHolder';
import { AnswerDifficultyList } from '../../constants/dropdonws';
import { QuestionForm } from '../../../shared/interfaces/forms';
import { QuestionFormHelperService } from '../../../shared/services/questionFormHelper/question-form-helper.service';
import { QUESTION_TYPE } from '../../../shared/enums/question-info';
import { Question } from '../../interfaces/question.interface';
import { AnswersFormType } from '../../../shared/types/formsType';

@Component({
  selector: 'quiz-app-boolean-question',
  templateUrl: './boolean-question.component.html',
  providers: [QuestionFormHelperService]
})
export class BooleanQuestionComponent implements OnInit {
  @Output() saveBooleanFormEvent: EventEmitter<FormGroup<QuestionForm>> =
    new EventEmitter<FormGroup<QuestionForm>>();

  public booleanQuestionForm: FormGroup<QuestionForm>;

  protected readonly PlaceHolder = PlaceHolder;
  protected readonly AnswerDifficultyList = AnswerDifficultyList;

  get form(): FormGroup<QuestionForm> {
    return this.questionFormHelper.currentForm;
  }

  get titleControl(): FormControl<string> {
    return this.form.controls.title;
  }

  get difficultyControl(): FormControl<string> {
    return this.form.controls.difficulty;
  }

  get answersControl(): AnswersFormType[] {
    return this.form.controls.answers.controls;
  }

  constructor(private questionFormHelper: QuestionFormHelperService) {}

  ngOnInit(): void {
    this.initForm();
    this.questionFormHelper.initRadioButtons();
  }

  private initForm(): void {
    const question: Question = {
      type: QUESTION_TYPE.BOOLEAN
    };
    this.questionFormHelper.initForm(question);
    this.booleanQuestionForm = this.form;
    this.saveBooleanFormEvent.emit(this.booleanQuestionForm);
  }
}

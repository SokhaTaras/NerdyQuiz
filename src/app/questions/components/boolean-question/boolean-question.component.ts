import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { PlaceHolder } from '../../../shared/enums/placeHolder';
import { DifficultyList } from '../../constants/dropdonws';
import { AnswersFormType } from '../../../shared/types/forms.type';
import { QuestionForm } from '../../../shared/interfaces/forms.interface';
import { QuestionFormHelperService } from '../../../shared/services/questionFormHelper/question-form-helper.service';
import { QUESTION_TYPE } from '../../../shared/enums/questionType';

@Component({
  selector: 'quiz-app-boolean-question',
  templateUrl: './boolean-question.component.html'
})
export class BooleanQuestionComponent implements OnInit, OnDestroy {
  @Output() saveBooleanFormEvent: EventEmitter<FormGroup<QuestionForm>> =
    new EventEmitter<FormGroup<QuestionForm>>();

  booleanQuestionForm: FormGroup<QuestionForm>;
  radioButtonsSubscription: Subscription;

  protected readonly PlaceHolder = PlaceHolder;
  protected readonly difficultyList = DifficultyList;

  get title(): FormControl {
    return this.booleanQuestionForm.controls.title;
  }

  get type(): FormControl {
    return this.booleanQuestionForm.controls.type;
  }
  get difficulty(): FormControl {
    return this.booleanQuestionForm.controls.difficulty;
  }

  get answersFormArray(): FormArray {
    return this.booleanQuestionForm.controls.answers;
  }

  get answersControl(): AnswersFormType[] {
    const formArray = this.booleanQuestionForm.controls.answers;
    return formArray.controls;
  }
  constructor(private questionFormHelper: QuestionFormHelperService) {}

  ngOnInit(): void {
    this.initForm();
    this.questionFormHelper.initRadioButtons(this.answersFormArray);
  }

  private initForm(): void {
    this.booleanQuestionForm = this.questionFormHelper.initForm(
      QUESTION_TYPE.BOOLEAN
    );
    this.saveBooleanFormEvent.emit(this.booleanQuestionForm);
  }

  ngOnDestroy(): void {
    this.radioButtonsSubscription.unsubscribe();
  }
}

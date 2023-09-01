import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { PlaceHolder } from '../../../shared/enums/placeHolder';
import { DifficultyList } from '../../constants/dropdonws';
import { AnswersFormType } from '../../../shared/types/formsType';
import { QuestionForm } from '../../../shared/interfaces/forms';
import { QuestionFormHelperService } from '../../services/questionFormHelper/question-form-helper.service';
import { QUESTION_TYPE } from '../../../shared/enums/questionType';
import { Question } from '../../interfaces/question.interface';
import { SubscriptionsService } from '../../../shared/services/subscription/subscriptions.service';

@Component({
  selector: 'quiz-app-boolean-question',
  templateUrl: './boolean-question.component.html',
  providers: [QuestionFormHelperService, SubscriptionsService]
})
export class BooleanQuestionComponent implements OnInit {
  @Output() saveBooleanFormEvent: EventEmitter<FormGroup<QuestionForm>> =
    new EventEmitter<FormGroup<QuestionForm>>();

  booleanQuestionForm: FormGroup<QuestionForm>;

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
    const question: Question = {
      type: QUESTION_TYPE.BOOLEAN
    };
    this.booleanQuestionForm = this.questionFormHelper.initForm(question);
    this.saveBooleanFormEvent.emit(this.booleanQuestionForm);
  }
}

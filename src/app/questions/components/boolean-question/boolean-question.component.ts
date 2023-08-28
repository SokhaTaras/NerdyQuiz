import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { PlaceHolder } from '../../../shared/enums/placeHolder';
import {
  BooleanList,
  DifficultyList,
  TypeList
} from '../../constants/dropdonws';
import { BooleanQuestionForm } from '../../../shared/interfaces/forms.interface';

@Component({
  selector: 'quiz-app-boolean-question',
  templateUrl: './boolean-question.component.html'
})
export class BooleanQuestionComponent implements OnInit {
  @Output() saveBooleanFormEvent: EventEmitter<FormGroup<BooleanQuestionForm>> =
    new EventEmitter<FormGroup<BooleanQuestionForm>>();

  booleanQuestionForm: FormGroup<BooleanQuestionForm>;

  protected readonly PlaceHolder = PlaceHolder;
  protected readonly difficultyList = DifficultyList;
  protected readonly typeList = TypeList;
  protected readonly booleanList = BooleanList;

  get title(): FormControl {
    return this.booleanQuestionForm.controls.title;
  }

  get type(): FormControl {
    return this.booleanQuestionForm.controls.type;
  }
  get difficulty(): FormControl {
    return this.booleanQuestionForm.controls.difficulty;
  }

  get correctBooleanAnswer(): FormControl {
    return this.booleanQuestionForm.controls.correctAnswer;
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.subscribeToBooleanQuestionFormChanges();
  }

  private subscribeToBooleanQuestionFormChanges(): void {
    this.booleanQuestionForm.valueChanges.subscribe(() =>
      this.saveBooleanFormEvent.emit(this.booleanQuestionForm)
    );
  }

  private initForm(): void {
    this.booleanQuestionForm = this.fb.group<BooleanQuestionForm>({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      type: new FormControl(this.typeList[1][0].text, [Validators.required]),
      difficulty: new FormControl(this.difficultyList[0][0].text, [
        Validators.required
      ]),
      correctAnswer: new FormControl('True', [Validators.required])
    });
  }
}

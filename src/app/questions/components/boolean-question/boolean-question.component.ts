import { Component, OnInit } from '@angular/core';
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
  booleanQuizForm: FormGroup<BooleanQuestionForm>;

  protected readonly PlaceHolder = PlaceHolder;
  protected readonly difficultyList = DifficultyList;
  protected readonly typeList = TypeList;
  protected readonly booleanList = BooleanList;

  get title() {
    return this.booleanQuizForm.controls.title;
  }

  get type() {
    return this.booleanQuizForm.controls.type;
  }
  get difficulty() {
    return this.booleanQuizForm.controls.difficulty;
  }

  get correctBooleanAnswer() {
    return this.booleanQuizForm.controls.correctBooleanAnswer;
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.booleanQuizForm = this.fb.nonNullable.group<BooleanQuestionForm>({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      type: new FormControl(this.typeList['boolean'][0].text, [
        Validators.required
      ]),
      difficulty: new FormControl(this.difficultyList['easy'][0].text, [
        Validators.required
      ]),
      correctBooleanAnswer: new FormControl('True', [Validators.required])
    });
  }
}

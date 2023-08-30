import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';

import { PlaceHolder } from '../../../shared/enums/placeHolder';
import {
  BooleanList,
  DifficultyList,
  TypeList
} from '../../constants/dropdonws';
import { BooleanQuestionForm } from '../../../shared/interfaces/forms.interface';
import { AnswersFormType } from '../../../shared/types/forms.type ts';

@Component({
  selector: 'quiz-app-boolean-question',
  templateUrl: './boolean-question.component.html'
})
export class BooleanQuestionComponent implements OnInit, OnDestroy {
  @Output() saveBooleanFormEvent: EventEmitter<FormGroup<BooleanQuestionForm>> =
    new EventEmitter<FormGroup<BooleanQuestionForm>>();

  booleanQuestionForm: FormGroup<BooleanQuestionForm>;
  formSubscription: Subscription;

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

  get correctAnswer() {
    return this.booleanQuestionForm.controls.answers.controls;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.subscribeToBooleanQuestionFormChanges();
  }

  private subscribeToBooleanQuestionFormChanges(): void {
    this.formSubscription = this.booleanQuestionForm.valueChanges.subscribe(
      () => this.saveBooleanFormEvent.emit(this.booleanQuestionForm)
    );
  }

  private initForm(): void {
    this.booleanQuestionForm = this.fb.group<BooleanQuestionForm>({
      title: this.fb.control('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      type: this.fb.control(this.typeList[1][0].text, [Validators.required]),
      difficulty: this.fb.control(this.difficultyList[0][0].text, [
        Validators.required
      ]),
      answers: this.fb.array(
        [
          this.generateNewAnswer('True', true),
          this.generateNewAnswer('False', false)
        ],
        [Validators.required]
      )
    });
  }

  private generateNewAnswer(text: string, isCorrect: boolean): AnswersFormType {
    return this.fb.group({
      text: this.fb.control(text, [Validators.required]),
      isCorrect: this.fb.control(isCorrect)
    });
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}

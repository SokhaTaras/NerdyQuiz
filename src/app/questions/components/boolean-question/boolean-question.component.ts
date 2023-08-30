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
import { DifficultyList, TypeList } from '../../constants/dropdonws';
import { AnswersFormType } from '../../../shared/types/forms.type ts';
import { QuestionForm } from '../../../shared/interfaces/forms.interface';

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
  protected readonly typeList = TypeList;

  get title(): FormControl {
    return this.booleanQuestionForm.controls.title;
  }

  get type(): FormControl {
    return this.booleanQuestionForm.controls.type;
  }
  get difficulty(): FormControl {
    return this.booleanQuestionForm.controls.difficulty;
  }

  get answersControl(): AnswersFormType[] {
    const formArray = this.booleanQuestionForm.controls.answers;
    return formArray.controls;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.initRadioButtons();
  }

  private initRadioButtons(): void {
    this.answersControl.forEach((control, index) => {
      this.radioButtonsSubscription = control.valueChanges.subscribe(
        (checked) => {
          if (checked.isCorrect) {
            this.answersControl.forEach((otherControl, otherIndex) => {
              if (otherIndex !== index) {
                otherControl.get('isCorrect')?.setValue(false);
              }
            });
          }
        }
      );
    });
  }

  private initForm(): void {
    this.booleanQuestionForm = this.fb.group<QuestionForm>({
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
    this.saveBooleanFormEvent.emit(this.booleanQuestionForm);
  }

  private generateNewAnswer(text: string, isCorrect: boolean): AnswersFormType {
    return this.fb.group({
      text: this.fb.control(text, [Validators.required]),
      isCorrect: this.fb.control(isCorrect)
    });
  }

  ngOnDestroy(): void {
    this.radioButtonsSubscription.unsubscribe();
  }
}

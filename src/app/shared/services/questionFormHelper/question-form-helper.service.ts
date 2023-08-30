import { Injectable, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { QuestionForm } from '../../interfaces/forms.interface';
import { AnswersFormType } from '../../types/forms.type';
import {
  DifficultyList,
  TypeList
} from '../../../questions/constants/dropdonws';

@Injectable({
  providedIn: 'root'
})
export class QuestionFormHelperService implements OnDestroy {
  radioButtonsSubscription: Subscription;

  protected readonly typeList = TypeList;
  protected readonly difficultyList = DifficultyList;
  constructor(private fb: FormBuilder) {}

  initForm(questionType: string): FormGroup<QuestionForm> {
    const questionFormConfig = this.getConfig();

    if (questionType === 'multiple') {
      questionFormConfig.type.setValue(this.typeList[0][0].text);
      questionFormConfig.answers = this.fb.array(
        [this.generateNewAnswer('', true), this.generateNewAnswer('', false)],
        [Validators.required]
      );
    } else if (questionType === 'boolean') {
      questionFormConfig.type.setValue(this.typeList[1][0].text);
      questionFormConfig.answers = this.fb.array(
        [
          this.generateNewAnswer('True', true),
          this.generateNewAnswer('False', false)
        ],
        [Validators.required]
      );
    }

    return this.fb.group<QuestionForm>(questionFormConfig);
  }

  generateNewAnswer(text: string, isCorrect: boolean): AnswersFormType {
    return this.fb.group({
      text: this.fb.control(text, [Validators.required]),
      isCorrect: this.fb.control(isCorrect)
    });
  }

  initRadioButtons(answersFormArray: FormArray): void {
    answersFormArray.controls.forEach((control, index) => {
      this.radioButtonsSubscription = control.valueChanges.subscribe(
        (checked) => {
          if (checked.isCorrect) {
            answersFormArray.controls.forEach((otherControl, otherIndex) => {
              if (otherIndex !== index) {
                otherControl.get('isCorrect')?.setValue(false);
              }
            });
          }
        }
      );
    });
  }

  private getConfig(): QuestionForm {
    return {
      title: this.fb.control('', [Validators.required]),
      type: this.fb.control('', [Validators.required]),
      difficulty: this.fb.control(this.difficultyList[0][0].text, [
        Validators.required
      ]),
      answers: this.fb.array(
        [this.generateNewAnswer('', true), this.generateNewAnswer('', false)],
        [Validators.required]
      )
    };
  }

  ngOnDestroy(): void {
    this.radioButtonsSubscription.unsubscribe();
  }
}

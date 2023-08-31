import { Injectable, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { QuestionForm } from '../../interfaces/forms.interface';
import { AnswersFormType } from '../../types/forms.type';
import {
  questionBooleanObj,
  questionDifficultyObj,
  questionTypeObj
} from '../../../questions/constants/dropdonws';
import { Question } from '../../../questions/interfaces/question.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionFormHelperService implements OnDestroy {
  radioButtonsSubscription: Subscription;

  protected readonly typeObj = questionTypeObj;
  protected readonly difficultyObj = questionDifficultyObj;
  protected readonly booleanObj = questionBooleanObj;
  constructor(private fb: FormBuilder) {}

  initForm(question: Question): FormGroup<QuestionForm> {
    const questionFormConfig = this.getFormConfig();

    if (question.type === 'multiple') {
      questionFormConfig.type.setValue(this.typeObj.multiple[0].text);
      questionFormConfig.answers = this.fb.array(
        this.generateDefaultAnswers(question.type),
        [Validators.required]
      );
    } else if (question.type === 'boolean') {
      questionFormConfig.type.setValue(this.typeObj.boolean[0].text);
      questionFormConfig.answers = this.fb.array(
        this.generateDefaultAnswers(question.type),
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

  private generateDefaultAnswers(answerType: string): AnswersFormType[] {
    if (answerType === 'multiple') {
      const answers = [
        this.generateNewAnswer('', true),
        this.generateNewAnswer('', false)
      ];
      return answers;
    } else if (answerType === 'boolean') {
      const answers = [
        this.generateNewAnswer(this.booleanObj.true[0].text || 'True', true),
        this.generateNewAnswer(this.booleanObj.false[0].text || 'False', false)
      ];
      return answers;
    } else {
      return [];
    }
  }

  private getFormConfig(): QuestionForm {
    return {
      title: this.fb.control('', [Validators.required]),
      type: this.fb.control('', [Validators.required]),
      difficulty: this.fb.control(this.difficultyObj.easy[0].text, [
        Validators.required
      ]),
      answers: this.fb.array(
        [this.generateNewAnswer('', true)],
        [Validators.required]
      )
    };
  }

  ngOnDestroy(): void {
    this.radioButtonsSubscription.unsubscribe();
  }
}

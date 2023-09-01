import { Injectable, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { QuestionForm } from '../../interfaces/forms';
import { AnswersFormType } from '../../types/formsType';
import {
  questionBooleanObj,
  questionDifficultyObj,
  questionTypeObj
} from '../../../questions/constants/dropdonws';
import { Question } from '../../../questions/interfaces/question.interface';
import { QUESTION_TYPE } from '../../enums/questionType';

@Injectable({
  providedIn: 'root'
})
export class QuestionFormHelperService implements OnDestroy {
  radioButtonsSubscription: Subscription[] = [];

  private readonly typeObj = questionTypeObj;
  private readonly difficultyObj = questionDifficultyObj;
  private readonly booleanObj = questionBooleanObj;

  constructor(private fb: FormBuilder) {}

  initForm(question: Question): FormGroup<QuestionForm> {
    const questionFormConfig = this.getFormConfig();
    const defaultAnswers = this.generateDefaultAnswers(question.type);
    const questionType =
      question.type === QUESTION_TYPE.MULTIPLE
        ? this.typeObj.multiple[0].text
        : this.typeObj.boolean[0].text;

    if (question.type === QUESTION_TYPE.MULTIPLE) {
      questionFormConfig.type.setValue(questionType);
      questionFormConfig.answers = this.fb.array(defaultAnswers, [
        Validators.required
      ]);
    } else if (question.type === QUESTION_TYPE.BOOLEAN) {
      questionFormConfig.type.setValue(questionType);
      questionFormConfig.answers = this.fb.array(defaultAnswers, [
        Validators.required
      ]);
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
      this.radioButtonsSubscription.push(
        control.valueChanges.subscribe((checked) => {
          if (checked.isCorrect) {
            answersFormArray.controls.forEach((otherControl, otherIndex) => {
              if (otherIndex !== index) {
                otherControl.get('isCorrect')?.setValue(false);
              }
            });
          }
        })
      );
    });
  }

  private generateDefaultAnswers(answerType: string): AnswersFormType[] {
    if (answerType === QUESTION_TYPE.MULTIPLE) {
      const answers = [
        this.generateNewAnswer('', true),
        this.generateNewAnswer('', false)
      ];
      return answers;
    } else if (answerType === QUESTION_TYPE.MULTIPLE) {
      const answers = [
        this.generateNewAnswer(this.booleanObj.true[0].text, true),
        this.generateNewAnswer(this.booleanObj.false[0].text, false)
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
    this.radioButtonsSubscription.forEach((sub) => sub.unsubscribe());
  }
}

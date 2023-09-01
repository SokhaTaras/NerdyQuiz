import { Injectable, SkipSelf } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { QuestionForm } from '../../../shared/interfaces/forms';
import { AnswersFormType } from '../../../shared/types/formsType';
import {
  questionBooleanObj,
  questionDifficultyObj,
  questionTypeObj
} from '../../constants/dropdonws';
import { Question } from '../../interfaces/question.interface';
import { QUESTION_TYPE } from '../../../shared/enums/questionType';
import { SubscriptionsService } from '../../../shared/services/subscription/subscriptions.service';

@Injectable()
export class QuestionFormHelperService {
  private readonly typeObj = questionTypeObj;
  private readonly difficultyObj = questionDifficultyObj;
  private readonly booleanObj = questionBooleanObj;

  constructor(
    private fb: FormBuilder,
    @SkipSelf() private subscriptionsService: SubscriptionsService
  ) {}

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

  //todo radio buttons group onChange
  initRadioButtons(answersFormArray: FormArray): void {
    answersFormArray.controls.forEach((control, index) => {
      this.subscriptionsService.addSubscription(
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
}
